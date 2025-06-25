
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.core.cache import cache
import logging
import json
from .models import Profile, Skill, Experience, Project, Education, ContactMessage
from .serializers import (
    ProfileSerializer, SkillSerializer, ExperienceSerializer,
    ProjectSerializer, EducationSerializer, ContactMessageSerializer
)

logger = logging.getLogger(__name__)

@method_decorator(cache_page(60 * 15), name='list')  # Cache for 15 minutes
class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

@method_decorator(cache_page(60 * 15), name='list')
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all().order_by('category', '-proficiency_level')
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(category__icontains=category)
        if featured:
            queryset = queryset.filter(is_featured=True)
            
        return queryset.order_by('category', '-proficiency_level')

@method_decorator(cache_page(60 * 15), name='list')
class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]

@method_decorator(cache_page(60 * 15), name='list')
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = Project.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        status_filter = self.request.query_params.get('status', None)
        
        if category:
            queryset = queryset.filter(category__icontains=category)
        if featured:
            queryset = queryset.filter(is_featured=True)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
            
        return queryset.order_by('-is_featured', '-created_at')

@method_decorator(cache_page(60 * 15), name='list')
class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all().order_by('-graduation_year')
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def contact_view(request):
    """
    Enhanced contact form submission with validation and email sending
    """
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return Response({
                    'error': f'{field.title()} is required',
                    'success': False
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create contact message
        contact_message = ContactMessage.objects.create(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )
        
        # Send email notification
        try:
            if settings.EMAIL_HOST_USER:
                send_mail(
                    subject=f"Portfolio Contact: {data['subject']}",
                    message=f"""
                    New contact message from your portfolio:
                    
                    Name: {data['name']}
                    Email: {data['email']}
                    Subject: {data['subject']}
                    
                    Message:
                    {data['message']}
                    
                    ---
                    Sent from Portfolio Contact Form
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                logger.info(f"Contact email sent successfully for {data['email']}")
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            # Don't fail the request if email fails
        
        return Response({
            'message': 'Thank you for your message! I will get back to you soon.',
            'success': True,
            'id': contact_message.id
        }, status=status.HTTP_201_CREATED)
        
    except json.JSONDecodeError:
        return Response({
            'error': 'Invalid JSON data',
            'success': False
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return Response({
            'error': 'An error occurred while processing your message. Please try again.',
            'success': False
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def api_stats(request):
    """
    API endpoint for portfolio statistics
    """
    try:
        # Use cache for stats
        stats = cache.get('portfolio_stats')
        if not stats:
            stats = {
                'profile_count': Profile.objects.count(),
                'skills_count': Skill.objects.count(),
                'experience_count': Experience.objects.count(),
                'projects_count': Project.objects.count(),
                'education_count': Education.objects.count(),
                'messages_count': ContactMessage.objects.count(),
                'featured_skills': Skill.objects.filter(is_featured=True).count(),
                'featured_projects': Project.objects.filter(is_featured=True).count(),
                'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
            }
            cache.set('portfolio_stats', stats, 60 * 30)  # Cache for 30 minutes
        
        return Response(stats, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Stats API error: {str(e)}")
        return Response({
            'error': 'Failed to fetch statistics'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint for monitoring
    """
    try:
        # Check database connectivity
        Profile.objects.exists()
        
        return Response({
            'status': 'healthy',
            'timestamp': timezone.now().isoformat(),
            'version': '1.0.0'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return Response({
            'status': 'unhealthy',
            'error': str(e)
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

# Custom error handlers for production
def custom_404(request, exception=None):
    """Custom 404 error handler"""
    return JsonResponse({
        'error': 'The requested resource was not found.',
        'status_code': 404,
        'success': False
    }, status=404)

def custom_500(request):
    """Custom 500 error handler"""
    return JsonResponse({
        'error': 'An internal server error occurred. Please try again later.',
        'status_code': 500,
        'success': False
    }, status=500)
