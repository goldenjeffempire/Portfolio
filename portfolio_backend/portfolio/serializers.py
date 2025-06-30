
"""
Portfolio Serializers - Production Ready
"""

from rest_framework import serializers
from .models import Profile, Project, Skill, Experience, Contact

class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for Profile model"""
    
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'bio', 'email', 'phone', 'location',
            'website', 'github_url', 'linkedin_url', 'twitter_url',
            'instagram_url', 'profile_image', 'resume_file',
            'meta_description', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SkillSerializer(serializers.ModelSerializer):
    """Serializer for Skill model"""
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'category', 'proficiency', 'icon', 'color',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model"""
    tech_list = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'category', 'github_url', 'live_url', 'demo_url', 'image',
            'technologies', 'tech_list', 'is_featured', 'is_completed',
            'start_date', 'end_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'tech_list', 'created_at', 'updated_at']

class ExperienceSerializer(serializers.ModelSerializer):
    """Serializer for Experience model"""
    duration = serializers.ReadOnlyField()
    
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description', 'location',
            'company_url', 'employment_type', 'start_date', 'end_date',
            'is_current', 'skills_used', 'achievements', 'duration',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'duration', 'created_at', 'updated_at']

class ContactSerializer(serializers.ModelSerializer):
    """Serializer for Contact model"""
    
    class Meta:
        model = Contact
        fields = [
            'id', 'name', 'email', 'subject', 'message',
            'is_read', 'is_replied', 'created_at'
        ]
        read_only_fields = ['id', 'is_read', 'is_replied', 'created_at']
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'message': {'required': True},
        }
