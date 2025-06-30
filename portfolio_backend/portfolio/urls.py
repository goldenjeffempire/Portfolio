
from django.urls import path
from .views import (
    portfolio_overview, projects_list, project_detail,
    skills_list, experience_list, contact_form, health_check
)

urlpatterns = [
    path('', portfolio_overview, name='portfolio-overview'),
    path('projects/', projects_list, name='projects-list'),
    path('projects/<int:pk>/', project_detail, name='project-detail'),
    path('skills/', skills_list, name='skills-list'),
    path('experience/', experience_list, name='experience-list'),
    path('contact/', contact_form, name='contact-form'),
    path('health/', health_check, name='health-check'),
]
