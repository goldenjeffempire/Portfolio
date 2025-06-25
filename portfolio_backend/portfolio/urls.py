from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet, SkillViewSet, ExperienceViewSet,
    ProjectViewSet, EducationViewSet, contact_view,
    api_stats, health_check
)

router = DefaultRouter()
router.register('profiles', ProfileViewSet)
router.register('skills', SkillViewSet)
router.register('experiences', ExperienceViewSet)
router.register('projects', ProjectViewSet)
router.register('education', EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_view, name='contact'),
    path('stats/', api_stats, name='api-stats'),
    path('health/', health_check, name='health-check'),
]
