
from django.shortcuts import render
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status
from .models import Profile, Project, Skill, Experience, Education
from .serializers import (
    ProfileSerializer, ProjectSerializer, SkillSerializer, 
    ExperienceSerializer, EducationSerializer
)
import json
import logging

logger = logging.getLogger(__name__)

# Custom error handlers
def custom_404(request, exception=None):
    """Custom 404 error handler"""
    if request.path.startswith('/api/'):
        return JsonResponse({
            'error': 'Not Found',
            'message': 'The requested resource was not found.',
            'status_code': 404
        }, status=404)
    
    return render(request, '404.html', status=404)

def custom_500(request):
    """Custom 500 error handler"""
    if request.path.startswith('/api/'):
        return JsonResponse({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred. Please try again later.',
            'status_code': 500
        }, status=500)
    
    return render(request, '500.html', status=500)

# API Views
@api_view(['GET'])
@cache_page(60 * 15)  # Cache for 15 minutes
def portfolio_overview(request):
    """Get complete portfolio overview"""
    try:
        profile = Profile.objects.first()
        projects = Project.objects.filter(is_featured=True)[:6]  # Featured projects only
        skills = Skill.objects.all()
        experience = Experience.objects.all().order_by('-start_date')[:3]  # Recent experience
        
        data = {
            'profile': ProfileSerializer(profile).data if profile else None,
            'projects': ProjectSerializer(projects, many=True).data,
            'skills': SkillSerializer(skills, many=True).data,
            'experience': ExperienceSerializer(experience, many=True).data,
        }
        
        return Response(data)
    except Exception as e:
        logger.error(f"Error in portfolio_overview: {str(e)}")
        return Response(
            {'error': 'Failed to fetch portfolio data'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@cache_page(60 * 30)  # Cache for 30 minutes
def projects_list(request):
    """Get all projects"""
    try:
        projects = Project.objects.all().order_by('-created_at')
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error in projects_list: {str(e)}")
        return Response(
            {'error': 'Failed to fetch projects'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def project_detail(request, pk):
    """Get specific project details"""
    try:
        project = Project.objects.get(pk=pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    except Project.DoesNotExist:
        return Response(
            {'error': 'Project not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Error in project_detail: {str(e)}")
        return Response(
            {'error': 'Failed to fetch project details'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@cache_page(60 * 60)  # Cache for 1 hour
def skills_list(request):
    """Get all skills"""
    try:
        skills = Skill.objects.all().order_by('category', '-proficiency')
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error in skills_list: {str(e)}")
        return Response(
            {'error': 'Failed to fetch skills'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@cache_page(60 * 60)  # Cache for 1 hour
def experience_list(request):
    """Get all experience"""
    try:
        experience = Experience.objects.all().order_by('-start_date')
        serializer = ExperienceSerializer(experience, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error in experience_list: {str(e)}")
        return Response(
            {'error': 'Failed to fetch experience'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def contact_form(request):
    """Handle contact form submissions"""
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not data.get(field):
                return Response(
                    {'error': f'{field.capitalize()} is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject', 'Contact Form Submission')
        message = data.get('message')
        
        # Send email
        email_subject = f"Portfolio Contact: {subject}"
        email_message = f"""
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        """
        
        if settings.EMAIL_HOST_USER:
            try:
                send_mail(
                    email_subject,
                    email_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                
                logger.info(f"Contact form submitted by {name} ({email})")
                return Response({
                    'success': True,
                    'message': 'Thank you for your message! I will get back to you soon.'
                })
            except Exception as e:
                logger.error(f"Failed to send email: {str(e)}")
                return Response(
                    {'error': 'Failed to send message. Please try again later.'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            logger.warning("Email not configured - contact form submission logged only")
            return Response({
                'success': True,
                'message': 'Thank you for your message! I will get back to you soon.'
            })
            
    except json.JSONDecodeError:
        return Response(
            {'error': 'Invalid JSON data'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f"Error in contact_form: {str(e)}")
        return Response(
            {'error': 'An unexpected error occurred'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Health check endpoint
@api_view(['GET'])
def health_check(request):
    """Health check endpoint for monitoring"""
    return Response({
        'status': 'healthy',
        'timestamp': timezone.now().isoformat()
    })
