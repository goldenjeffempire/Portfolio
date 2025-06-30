
"""
Portfolio Views - Production Ready
"""

from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Profile, Project, Skill, Experience, Contact
from .serializers import (
    ProfileSerializer, ProjectSerializer, 
    SkillSerializer, ExperienceSerializer
)
import logging
import json

logger = logging.getLogger(__name__)

# Custom Error Handlers
def custom_404(request, exception=None):
    """Custom 404 error handler"""
    if request.path.startswith('/api/'):
        return JsonResponse({
            'error': 'API endpoint not found',
            'message': 'The requested resource does not exist.'
        }, status=404)
    
    return render(request, '404.html', status=404)

def custom_500(request):
    """Custom 500 error handler"""
    if request.path.startswith('/api/'):
        return JsonResponse({
            'error': 'Internal server error',
            'message': 'Something went wrong on our end.'
        }, status=500)
    
    return render(request, '500.html', status=500)

# API Health Check
@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Health check endpoint for monitoring"""
    return Response({
        'status': 'healthy',
        'message': 'Portfolio API is running'
    })

# Profile ViewSet
class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Profile model - Read only"""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    
    def get_object(self):
        """Get the first (and should be only) profile"""
        try:
            return Profile.objects.first()
        except Profile.DoesNotExist:
            raise Http404("Profile not found")

# Project ViewSet
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Project model - Read only"""
    queryset = Project.objects.filter(is_featured=True).order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

# Skill ViewSet
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Skill model - Read only"""
    queryset = Skill.objects.all().order_by('category', '-proficiency')
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]

# Experience ViewSet
class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Experience model - Read only"""
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]

# Contact Form Handler
@api_view(['POST'])
@permission_classes([AllowAny])
def contact_form(request):
    """Handle contact form submissions"""
    try:
        data = request.data
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return Response({
                    'error': f'{field.title()} is required'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create contact record
        contact = Contact.objects.create(
            name=data['name'],
            email=data['email'],
            subject=data.get('subject', 'Portfolio Contact'),
            message=data['message']
        )
        
        # Send email notification
        try:
            if settings.EMAIL_HOST_USER:
                send_mail(
                    subject=f"Portfolio Contact: {contact.subject}",
                    message=f"""
                    New contact form submission:
                    
                    Name: {contact.name}
                    Email: {contact.email}
                    Subject: {contact.subject}
                    
                    Message:
                    {contact.message}
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                logger.info(f"Contact form email sent for {contact.email}")
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
        
        return Response({
            'message': 'Thank you for your message! I will get back to you soon.',
            'success': True
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return Response({
            'error': 'Failed to send message. Please try again.',
            'success': False
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API Endpoints for specific data
@api_view(['GET'])
@permission_classes([AllowAny])
def get_profile(request):
    """Get profile data"""
    try:
        profile = Profile.objects.first()
        if not profile:
            return Response({
                'error': 'Profile not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Profile fetch error: {str(e)}")
        return Response({
            'error': 'Failed to fetch profile'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_projects(request):
    """Get featured projects"""
    try:
        projects = Project.objects.filter(is_featured=True).order_by('-created_at')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Projects fetch error: {str(e)}")
        return Response({
            'error': 'Failed to fetch projects'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_skills(request):
    """Get skills grouped by category"""
    try:
        skills = Skill.objects.all().order_by('category', '-proficiency')
        serializer = SkillSerializer(skills, many=True)
        
        # Group skills by category
        skills_by_category = {}
        for skill_data in serializer.data:
            category = skill_data['category']
            if category not in skills_by_category:
                skills_by_category[category] = []
            skills_by_category[category].append(skill_data)
        
        return Response(skills_by_category)
    except Exception as e:
        logger.error(f"Skills fetch error: {str(e)}")
        return Response({
            'error': 'Failed to fetch skills'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_experience(request):
    """Get work experience"""
    try:
        experiences = Experience.objects.all().order_by('-start_date')
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Experience fetch error: {str(e)}")
        return Response({
            'error': 'Failed to fetch experience'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
