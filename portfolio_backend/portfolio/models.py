
"""
Portfolio Models - Production Ready
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, URLValidator
from django.utils import timezone
import os

def profile_image_path(instance, filename):
    """Generate path for profile images"""
    return f'profile/{filename}'

def project_image_path(instance, filename):
    """Generate path for project images"""
    return f'projects/{instance.slug}/{filename}'

class Profile(models.Model):
    """User profile model"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100)
    website = models.URLField(blank=True)
    
    # Social links
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    
    # Profile image
    profile_image = models.ImageField(
        upload_to=profile_image_path,
        blank=True,
        null=True,
        help_text="Profile picture"
    )
    
    # Resume
    resume_file = models.FileField(
        upload_to='resume/',
        blank=True,
        null=True,
        help_text="Resume PDF file"
    )
    
    # SEO fields
    meta_description = models.TextField(
        max_length=160,
        blank=True,
        help_text="Meta description for SEO"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    """Skills model"""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('tools', 'Tools'),
        ('languages', 'Programming Languages'),
        ('frameworks', 'Frameworks'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Proficiency level (1-100)"
    )
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon name or class"
    )
    color = models.CharField(
        max_length=7,
        default='#3B82F6',
        help_text="Hex color code"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
        ordering = ['category', '-proficiency']
    
    def __str__(self):
        return f"{self.name} ({self.category})"

class Project(models.Model):
    """Projects model"""
    CATEGORY_CHOICES = [
        ('web', 'Web Application'),
        ('mobile', 'Mobile Application'),
        ('desktop', 'Desktop Application'),
        ('api', 'API'),
        ('library', 'Library/Package'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(
        max_length=300,
        help_text="Brief description for cards"
    )
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    # Project links
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    
    # Project image
    image = models.ImageField(
        upload_to=project_image_path,
        blank=True,
        null=True
    )
    
    # Technologies used
    technologies = models.TextField(
        help_text="Comma-separated list of technologies"
    )
    
    # Project status
    is_featured = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=True)
    
    # Dates
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def tech_list(self):
        """Return technologies as a list"""
        return [tech.strip() for tech in self.technologies.split(',') if tech.strip()]

class Experience(models.Model):
    """Work experience model"""
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100, blank=True)
    company_url = models.URLField(blank=True)
    
    # Employment type
    EMPLOYMENT_CHOICES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('freelance', 'Freelance'),
    ]
    employment_type = models.CharField(
        max_length=20,
        choices=EMPLOYMENT_CHOICES,
        default='full_time'
    )
    
    # Dates
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    
    # Skills used
    skills_used = models.TextField(
        blank=True,
        help_text="Comma-separated list of skills used"
    )
    
    # Achievements
    achievements = models.TextField(
        blank=True,
        help_text="Key achievements in this role"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
        ordering = ['-start_date']
    
    def __str__(self):
        return f"{self.position} at {self.company}"
    
    @property
    def duration(self):
        """Calculate duration of employment"""
        end = self.end_date or timezone.now().date()
        delta = end - self.start_date
        years = delta.days // 365
        months = (delta.days % 365) // 30
        
        if years > 0:
            return f"{years} year{'s' if years > 1 else ''}" + (f" {months} month{'s' if months > 1 else ''}" if months > 0 else "")
        else:
            return f"{months} month{'s' if months > 1 else ''}"

class Contact(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, default="Portfolio Contact")
    message = models.TextField()
    
    # Status
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    
    # IP tracking for spam prevention
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
