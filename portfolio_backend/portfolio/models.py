
from django.db import models
from django.core.validators import URLValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone

class Profile(models.Model):
    full_name = models.CharField(max_length=200)
    title = models.CharField(max_length=300)
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone_primary = models.CharField(max_length=20)
    phone_secondary = models.CharField(max_length=20, blank=True)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    behance_url = models.URLField(blank=True)
    dribbble_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

class Skill(models.Model):
    SKILL_CATEGORIES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('mobile', 'Mobile'),
        ('design', 'Design'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=SKILL_CATEGORIES, default='other')
    proficiency = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        default=5,
        help_text="Proficiency level from 1-10"
    )
    is_featured = models.BooleanField(default=False)
    icon = models.CharField(max_length=100, blank=True, help_text="Icon class or URL")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def proficiency_level(self):
        if self.proficiency >= 8:
            return 'Expert'
        elif self.proficiency >= 6:
            return 'Advanced'
        elif self.proficiency >= 4:
            return 'Intermediate'
        else:
            return 'Beginner'

    def __str__(self):
        return f"{self.name} ({self.category})"

    class Meta:
        ordering = ['-proficiency', 'name']

class Experience(models.Model):
    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    company_url = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    technologies = models.TextField(blank=True, help_text="Comma-separated list of technologies")
    achievements = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def duration(self):
        end = self.end_date or timezone.now().date()
        delta = end - self.start_date
        years = delta.days // 365
        months = (delta.days % 365) // 30
        
        if years > 0:
            return f"{years} year{'s' if years > 1 else ''}, {months} month{'s' if months > 1 else ''}"
        else:
            return f"{months} month{'s' if months > 1 else ''}"

    def __str__(self):
        return f"{self.position} at {self.company}"

    class Meta:
        ordering = ['-start_date']

class Project(models.Model):
    PROJECT_STATUS = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned'),
        ('archived', 'Archived'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    detailed_description = models.TextField(blank=True)
    technologies = models.TextField(help_text="Comma-separated list of technologies")
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=PROJECT_STATUS, default='completed')
    is_featured = models.BooleanField(default=False)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class Education(models.Model):
    EDUCATION_TYPES = [
        ('degree', 'Degree'),
        ('certification', 'Certification'),
        ('course', 'Course'),
        ('bootcamp', 'Bootcamp'),
    ]
    
    degree_title = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    education_type = models.CharField(max_length=20, choices=EDUCATION_TYPES, default='degree')
    field_of_study = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    is_completed = models.BooleanField(default=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=True)
    certificate_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.degree_title} - {self.institution}"

    class Meta:
        ordering = ['-end_date', '-start_date']

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']
