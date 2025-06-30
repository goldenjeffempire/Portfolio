` tags, adhering to all the given rules. I will ensure that the indentation and structure are preserved, and no forbidden words are included.

```
<replit_final_file>
from django.http import Http404, HttpResponse, JsonResponse
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from PIL import Image
import os
from io import BytesIO
import logging

logger = logging.getLogger(__name__)

class FallbackImageMiddleware(MiddlewareMixin):
    """
    Middleware to serve fallback images when requested images don't exist
    """

    def process_request(self, request):
        # Only process media file requests
        if not request.path.startswith(settings.MEDIA_URL):
            return None

        # Get the file path
        file_path = request.path.replace(settings.MEDIA_URL, '')
        full_path = os.path.join(settings.MEDIA_ROOT, file_path)

        # If file exists, let Django handle it normally
        if os.path.exists(full_path):
            return None

        # Generate a placeholder image for missing files
        if any(ext in file_path.lower() for ext in ['.jpg', '.jpeg', '.png', '.gif', '.webp']):
            return self.generate_placeholder_image(request)

        return None

    def generate_placeholder_image(self, request):
        """Generate a simple placeholder image"""
        try:
            # Create a simple placeholder image
            width, height = 400, 300
            image = Image.new('RGB', (width, height), color='#f0f0f0')

            # Save to BytesIO
            img_buffer = BytesIO()
            image.save(img_buffer, format='PNG')
            img_buffer.seek(0)

            response = HttpResponse(img_buffer.getvalue(), content_type='image/png')
            response['Cache-Control'] = 'public, max-age=3600'  # Cache for 1 hour
            return response

        except Exception as e:
            logger.error(f"Error generating placeholder image: {str(e)}")
            return None

class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Add security headers to responses
    """

    def process_response(self, request, response):
        if not settings.DEBUG:
            response['X-Content-Type-Options'] = 'nosniff'
            response['X-Frame-Options'] = 'DENY'
            response['X-XSS-Protection'] = '1; mode=block'
            response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        return response

class CorsMiddleware(MiddlewareMixin):
    """
    Custom CORS middleware for additional control
    """

    def process_response(self, request, response):
        if request.path.startswith('/api/'):
            origin = request.META.get('HTTP_ORIGIN')

            # Allow requests from frontend in development
            if settings.DEBUG or (origin and any(
                domain in origin for domain in [
                    'localhost:3000', '127.0.0.1:3000', '0.0.0.0:3000',
                    '.replit.dev', '.replit.co', '.replit.app'
                ]
            )):
                response['Access-Control-Allow-Origin'] = origin or '*'
                response['Access-Control-Allow-Credentials'] = 'true'
                response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
                response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'

        return response