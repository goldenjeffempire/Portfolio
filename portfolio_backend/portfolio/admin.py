
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from .models import Profile, Skill, Experience, Project, Education, ContactMessage
import json

class CustomAdminSite(AdminSite):
    site_header = "Jeffery Emuodafevware Portfolio"
    site_title = "Portfolio Admin"
    index_title = "Portfolio Management Dashboard"
    
    def index(self, request, extra_context=None):
        extra_context = extra_context or {}
        
        # Dashboard statistics
        extra_context.update({
            'profile_count': Profile.objects.count(),
            'skills_count': Skill.objects.count(),
            'experience_count': Experience.objects.count(),
            'projects_count': Project.objects.count(),
            'education_count': Education.objects.count(),
            'messages_count': ContactMessage.objects.count(),
            'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        })
        
        return super().index(request, extra_context)

# Create custom admin site
admin_site = CustomAdminSite(name='portfolio_admin')

class BaseModelAdmin(admin.ModelAdmin):
    """Base admin class with common styling and features"""
    
    class Media:
        css = {
            'all': ('admin/css/custom_admin.css',)
        }
        js = ('admin/js/custom_admin.js',)

@admin.register(Profile, site=admin_site)
class ProfileAdmin(BaseModelAdmin):
    list_display = ('name', 'title', 'location', 'email', 'phone', 'profile_image_preview', 'created_at')
    list_filter = ('location', 'created_at', 'updated_at')
    search_fields = ('name', 'title', 'email', 'location')
    readonly_fields = ('created_at', 'updated_at', 'profile_image_preview')
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'title', 'bio', 'profile_image', 'profile_image_preview'),
            'classes': ('wide',)
        }),
        ('Contact Details', {
            'fields': ('email', 'phone', 'location', 'website'),
            'classes': ('wide',)
        }),
        ('Social Media', {
            'fields': ('github_url', 'linkedin_url', 'twitter_url'),
            'classes': ('wide', 'collapse')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    def profile_image_preview(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 3px solid #007cba;" />',
                obj.profile_image.url
            )
        return "No image"
    profile_image_preview.short_description = "Profile Image Preview"

@admin.register(Skill, site=admin_site)
class SkillAdmin(BaseModelAdmin):
    list_display = ('name', 'category', 'proficiency_level', 'proficiency_bar', 'is_featured', 'created_at')
    list_filter = ('category', 'proficiency_level', 'is_featured', 'created_at')
    search_fields = ('name', 'description')
    list_editable = ('proficiency_level', 'is_featured')
    ordering = ('category', '-proficiency_level', 'name')
    
    fieldsets = (
        ('Skill Information', {
            'fields': ('name', 'category', 'description'),
            'classes': ('wide',)
        }),
        ('Proficiency', {
            'fields': ('proficiency_level', 'is_featured'),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def proficiency_bar(self, obj):
        percentage = obj.proficiency_level
        color = '#28a745' if percentage >= 80 else '#ffc107' if percentage >= 60 else '#dc3545'
        return format_html(
            '<div style="width: 100px; background-color: #e9ecef; border-radius: 4px; overflow: hidden;">'
            '<div style="width: {}%; height: 20px; background-color: {}; transition: width 0.3s;"></div>'
            '</div><span style="margin-left: 10px; font-weight: bold;">{}%</span>',
            percentage, color, percentage
        )
    proficiency_bar.short_description = "Proficiency"

@admin.register(Experience, site=admin_site)
class ExperienceAdmin(BaseModelAdmin):
    list_display = ('position', 'company', 'location', 'employment_type', 'duration', 'is_current', 'created_at')
    list_filter = ('employment_type', 'is_current', 'start_date', 'created_at')
    search_fields = ('position', 'company', 'location', 'description')
    list_editable = ('is_current',)
    date_hierarchy = 'start_date'
    ordering = ('-is_current', '-start_date')
    
    fieldsets = (
        ('Position Details', {
            'fields': ('position', 'company', 'location', 'employment_type'),
            'classes': ('wide',)
        }),
        ('Duration', {
            'fields': ('start_date', 'end_date', 'is_current'),
            'classes': ('wide',)
        }),
        ('Description', {
            'fields': ('description', 'key_achievements'),
            'classes': ('wide',)
        }),
        ('Skills & Technologies', {
            'fields': ('technologies_used',),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def duration(self, obj):
        if obj.is_current:
            return format_html(
                '<span style="color: #28a745; font-weight: bold;">Current Position</span>'
            )
        elif obj.end_date:
            duration = obj.end_date - obj.start_date
            years = duration.days // 365
            months = (duration.days % 365) // 30
            return f"{years}y {months}m"
        return "Ongoing"
    duration.short_description = "Duration"

@admin.register(Project, site=admin_site)
class ProjectAdmin(BaseModelAdmin):
    list_display = ('title', 'category', 'status', 'is_featured', 'project_image_preview', 'github_link', 'created_at')
    list_filter = ('category', 'status', 'is_featured', 'created_at')
    search_fields = ('title', 'description', 'technologies_used')
    list_editable = ('status', 'is_featured')
    ordering = ('-is_featured', '-created_at')
    
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'category', 'status'),
            'classes': ('wide',)
        }),
        ('Media', {
            'fields': ('image', 'project_image_preview'),
            'classes': ('wide',)
        }),
        ('Links & Demo', {
            'fields': ('github_url', 'live_url', 'demo_url'),
            'classes': ('wide',)
        }),
        ('Technical Details', {
            'fields': ('technologies_used', 'key_features'),
            'classes': ('wide',)
        }),
        ('Settings', {
            'fields': ('is_featured',),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    readonly_fields = ('created_at', 'updated_at', 'project_image_preview')
    
    def project_image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid #007cba;" />',
                obj.image.url
            )
        return "No image"
    project_image_preview.short_description = "Project Image"
    
    def github_link(self, obj):
        if obj.github_url:
            return format_html(
                '<a href="{}" target="_blank" style="color: #007cba; text-decoration: none;">'
                '<strong>View on GitHub</strong></a>',
                obj.github_url
            )
        return "No GitHub link"
    github_link.short_description = "GitHub"

@admin.register(Education, site=admin_site)
class EducationAdmin(BaseModelAdmin):
    list_display = ('degree', 'institution', 'field_of_study', 'graduation_year', 'gpa_display', 'created_at')
    list_filter = ('degree', 'graduation_year', 'created_at')
    search_fields = ('degree', 'institution', 'field_of_study', 'description')
    ordering = ('-graduation_year',)
    
    fieldsets = (
        ('Education Details', {
            'fields': ('degree', 'institution', 'field_of_study'),
            'classes': ('wide',)
        }),
        ('Academic Performance', {
            'fields': ('graduation_year', 'gpa'),
            'classes': ('wide',)
        }),
        ('Additional Information', {
            'fields': ('description', 'relevant_coursework'),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def gpa_display(self, obj):
        if obj.gpa:
            color = '#28a745' if obj.gpa >= 3.5 else '#ffc107' if obj.gpa >= 3.0 else '#dc3545'
            return format_html(
                '<span style="color: {}; font-weight: bold;">{}/4.0</span>',
                color, obj.gpa
            )
        return "N/A"
    gpa_display.short_description = "GPA"

@admin.register(ContactMessage, site=admin_site)
class ContactMessageAdmin(BaseModelAdmin):
    list_display = ('name', 'email', 'subject', 'message_preview', 'is_read', 'read_status', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_editable = ('is_read',)
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject'),
            'classes': ('wide',)
        }),
        ('Message', {
            'fields': ('message',),
            'classes': ('wide',)
        }),
        ('Status', {
            'fields': ('is_read',),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide', 'collapse')
        })
    )
    
    def message_preview(self, obj):
        return obj.message[:50] + "..." if len(obj.message) > 50 else obj.message
    message_preview.short_description = "Message Preview"
    
    def read_status(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="color: #28a745; font-weight: bold;">✓ Read</span>'
            )
        return format_html(
            '<span style="color: #dc3545; font-weight: bold;">✉ Unread</span>'
        )
    read_status.short_description = "Status"

# Register User and Group with custom admin site
admin_site.register(User, UserAdmin)
admin_site.register(Group, GroupAdmin)

# Set the default admin site
admin.site = admin_site
