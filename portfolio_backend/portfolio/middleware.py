from django.http import Http404, HttpResponse
from django.conf import settings
from PIL import Image
import os
from io import BytesIO
from django.utils.deprecation import MiddlewareMixin

class ImageOptimizationMiddleware:
    """
    Middleware to serve optimized images with proper caching headers
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if this is a media file request
        if request.path.startswith(settings.MEDIA_URL):
            return self.serve_optimized_image(request)
        
        response = self.get_response(request)
        return response

    def serve_optimized_image(self, request):
        # Extract the file path from the URL
        file_path = request.path[len(settings.MEDIA_URL):]
        full_path = os.path.join(settings.MEDIA_ROOT, file_path)
        
        if not os.path.exists(full_path):
            raise Http404("Image not found")
        
        # Get optimization parameters from query string
        width = request.GET.get('w')
        height = request.GET.get('h')
        quality = int(request.GET.get('q', 85))
        
        try:
            with Image.open(full_path) as img:
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Resize if dimensions provided
                if width or height:
                    w = int(width) if width else img.width
                    h = int(height) if height else img.height
                    img = img.resize((w, h), Image.LANCZOS)
                
                # Optimize and save to BytesIO
                output = BytesIO()
                img.save(output, format='JPEG', quality=quality, optimize=True)
                output.seek(0)
                
                response = HttpResponse(output.getvalue(), content_type='image/jpeg')
                
                # Add caching headers
                response['Cache-Control'] = 'public, max-age=31536000'  # 1 year
                response['ETag'] = f'"{file_path}-{width}-{height}-{quality}"'
                
                return response
                
        except Exception:
            # If optimization fails, serve original file
            with open(full_path, 'rb') as f:
                response = HttpResponse(f.read(), content_type='image/jpeg')
                response['Cache-Control'] = 'public, max-age=31536000'
                return response

class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Middleware to add security headers to responses
    """

    def process_response(self, request, response):
        # Content Security Policy
        if not settings.DEBUG:
            response['Content-Security-Policy'] = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "img-src 'self' data: https:; "
                "connect-src 'self' https:; "
                "frame-ancestors 'none';"
            )

        # X-Frame-Options
        response['X-Frame-Options'] = 'DENY'

        # Referrer Policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Feature Policy / Permissions Policy
        response['Permissions-Policy'] = (
            "geolocation=(), microphone=(), camera=(), "
            "payment=(), usb=(), magnetometer=(), gyroscope=()"
        )

        # X-Content-Type-Options
        response['X-Content-Type-Options'] = 'nosniff'

        return response
from django.utils.deprecation import MiddlewareMixin

class SecurityHeadersMiddleware(MiddlewareMixin):
    """Add security headers to all responses"""
    
    def process_response(self, request, response):
        # Security headers for production
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        
        # Content Security Policy
        if not request.path.startswith('/admin/'):
            response['Content-Security-Policy'] = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com; "
                "img-src 'self' data: https:; "
                "connect-src 'self' https:; "
                "frame-ancestors 'none';"
            )
        
        return response
