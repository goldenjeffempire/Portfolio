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
from django.utils import timezone
import logging
import json

from .models import Profile, Skill, Experience, Project, Education, ContactMessage
from .serializers import (
    ProfileSerializer, SkillSerializer, ExperienceSerializer,
    ProjectSerializer, EducationSerializer, ContactMessageSerializer
)

logger = logging.getLogger(__name__)

# Profile ViewSet
@method_decorator(cache_page(60 * 15), name='list')
class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

# Skill ViewSet
@method_decorator(cache_page(60 * 15), name='list')
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()  # ✅ Added for DRF router basename detection
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        if category:
            queryset = queryset.filter(category__icontains=category)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        return queryset.order_by('category', '-proficiency_level')

# Experience ViewSet
@method_decorator(cache_page(60 * 15), name='list')
class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]

# Project ViewSet
@method_decorator(cache_page(60 * 15), name='list')
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()  # ✅ Added for DRF router
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Project.objects.all()
        category = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        status_filter = self.request.query_params.get('status')
        if category:
            queryset = queryset.filter(category__icontains=category)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset.order_by('-is_featured', '-created_at')

# Education ViewSet
@method_decorator(cache_page(60 * 15), name='list')
class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all().order_by('-end_date', 'order')
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]

# Contact Message View
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def contact_view(request):
    try:
        data = json.loads(request.body)
        for field in ['name', 'email', 'subject', 'message']:
            if not data.get(field):
                return Response({
                    'error': f'{field.title()} is required', 'success': False
                }, status=status.HTTP_400_BAD_REQUEST)

        contact_message = ContactMessage.objects.create(**data)

        # Send email if configured
        try:
            if settings.EMAIL_HOST_USER:
                send_mail(
                    subject=f"Portfolio Contact: {data['subject']}",
                    message=f"Name: {data['name']}\nEmail: {data['email']}\n\nMessage:\n{data['message']}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                )
        except Exception as e:
            logger.warning(f"Email send failed: {e}")

        return Response({
            'message': 'Message received. I will get back to you.',
            'success': True,
            'id': contact_message.id
        }, status=status.HTTP_201_CREATED)

    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON', 'success': False}, status=400)
    except Exception as e:
        logger.error(f"Contact error: {e}")
        return Response({'error': 'Server error', 'success': False}, status=500)

# Portfolio Stats View
@api_view(['GET'])
@permission_classes([AllowAny])
def api_stats(request):
    try:
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
            cache.set('portfolio_stats', stats, 60 * 30)
        return Response(stats)
    except Exception as e:
        logger.error(f"Stats API error: {e}")
        return Response({'error': 'Failed to fetch statistics'}, status=500)

# Health Check View
@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    try:
        Profile.objects.exists()
        return Response({'status': 'healthy', 'timestamp': timezone.now().isoformat()})
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return Response({'status': 'unhealthy', 'error': str(e)}, status=503)

# Custom error handlers
def custom_404(request, exception=None):
    return JsonResponse({'error': 'Not Found', 'status_code': 404}, status=404)

def custom_500(request):
    return JsonResponse({'error': 'Server Error', 'status_code': 500}, status=500)
