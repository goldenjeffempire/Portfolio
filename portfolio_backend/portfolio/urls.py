from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet, basename='profile')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'skills', views.SkillViewSet, basename='skill')
router.register(r'experiences', views.ExperienceViewSet, basename='experience')

# ✅ Only this once
app_name = 'portfolio'

urlpatterns = [
    path('health/', views.health_check, name='health'),
    path('profile/', views.get_profile, name='profile'),
    path('projects/', views.get_projects, name='projects'),
    path('skills/', views.get_skills, name='skills'),
    path('experience/', views.get_experience, name='experience'),
    path('contact/', views.contact_form, name='contact'),
    path('', include(router.urls)),
]
