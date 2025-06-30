
"""
Portfolio Admin - Production Ready
"""

from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Profile, Project, Skill, Experience, Contact

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Admin for Profile model"""
    list_display = ['name', 'title', 'email', 'location', 'updated_at']
    search_fields = ['name', 'email', 'title']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'title', 'bio', 'profile_image')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'location', 'website')
        }),
        ('Social Links', {
            'fields': ('github_url', 'linkedin_url', 'twitter_url', 'instagram_url')
        }),
        ('Files', {
            'fields': ('resume_file',)
        }),
        ('SEO', {
            'fields': ('meta_description',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        """Only allow one profile"""
        return not Profile.objects.exists()

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Admin for Skill model"""
    list_display = ['name', 'category', 'proficiency', 'color_preview', 'updated_at']
    list_filter = ['category', 'proficiency']
    search_fields = ['name', 'category']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['proficiency']
    
    def color_preview(self, obj):
        """Show color preview"""
        return format_html(
            '<span style="background-color: {}; padding: 5px 10px; border-radius: 3px; color: white;">{}</span>',
            obj.color, obj.color
        )
    color_preview.short_description = 'Color'

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin for Project model"""
    list_display = ['title', 'category', 'is_featured', 'is_completed', 'created_at']
    list_filter = ['category', 'is_featured', 'is_completed', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    readonly_fields = ['created_at', 'updated_at', 'slug']
    list_editable = ['is_featured', 'is_completed']
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'short_description', 'description')
        }),
        ('Links', {
            'fields': ('github_url', 'live_url', 'demo_url')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Technical Details', {
            'fields': ('technologies',)
        }),
        ('Status', {
            'fields': ('is_featured', 'is_completed')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    """Admin for Experience model"""
    list_display = ['position', 'company', 'employment_type', 'start_date', 'end_date', 'is_current']
    list_filter = ['employment_type', 'is_current', 'start_date']
    search_fields = ['company', 'position', 'description']
    readonly_fields = ['created_at', 'updated_at', 'duration']
    list_editable = ['is_current']
    
    fieldsets = (
        ('Position Information', {
            'fields': ('company', 'position', 'employment_type', 'location', 'company_url')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date', 'is_current', 'duration')
        }),
        ('Details', {
            'fields': ('description', 'skills_used', 'achievements')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    """Admin for Contact model"""
    list_display = ['name', 'email', 'subject', 'is_read', 'is_replied', 'created_at']
    list_filter = ['is_read', 'is_replied', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at', 'updated_at', 'ip_address']
    list_editable = ['is_read', 'is_replied']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read', 'is_replied')
        }),
        ('Meta', {
            'fields': ('ip_address', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        """Don't allow adding contacts through admin"""
        return False

# Customize admin site
admin.site.site_header = "Portfolio Administration"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Portfolio Administration"
