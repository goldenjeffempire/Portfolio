from django.contrib import admin
from .models import Profile, Skill, Experience, Project, Education, ContactMessage

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title', 'location', 'email', 'created_at')
    search_fields = ('full_name', 'email')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency_level', 'is_featured')
    list_filter = ('category', 'is_featured')
    search_fields = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date', 'end_date', 'is_current')
    search_fields = ('position', 'company')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'created_at')
    search_fields = ('title', 'description')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree_title', 'institution', 'education_type', 'end_date', 'is_completed')
    search_fields = ('degree_title', 'institution')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read',)
    search_fields = ('email', 'subject')
