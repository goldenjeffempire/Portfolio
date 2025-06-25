
from django.http import Http404, HttpResponse
from django.conf import settings
from PIL import Image
import os
from io import BytesIO

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
