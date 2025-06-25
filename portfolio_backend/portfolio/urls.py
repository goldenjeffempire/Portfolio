
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet)
router.register(r'skills', views.SkillViewSet)
router.register(r'experience', views.ExperienceViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'education', views.EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_view, name='contact'),
    path('stats/', views.api_stats, name='api_stats'),
    path('health/', views.health_check, name='health_check'),
]
