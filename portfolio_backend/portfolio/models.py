"""
portfolio/models.py  –  Production-ready Django models
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


# ---------------------------------------------------------------------
# Helper upload paths
# ---------------------------------------------------------------------
def profile_image_upload(instance, filename) -> str:
    """Return upload path for profile images."""
    return f"profile/{filename}"


def project_image_upload(instance, filename) -> str:
    """Return upload path for project images (per-slug folder)."""
    return f"projects/{instance.slug}/{filename}"


# ---------------------------------------------------------------------
# Abstract base for automatic timestamps
# ---------------------------------------------------------------------
class TimeStampedModel(models.Model):
    """Adds `created_at` and `updated_at` datetime fields."""

    created_at = models.DateTimeField(
        default=timezone.now, editable=False, db_index=True
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# ---------------------------------------------------------------------
# Profile
# ---------------------------------------------------------------------
class Profile(TimeStampedModel):
    """Site-owner profile."""

    # Core
    name = models.CharField(max_length=100, default="Your Name")
    title = models.CharField(max_length=200, default="Software Engineer")
    bio = models.TextField(blank=True)

    # Contact
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)

    # Social
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    # Assets
    profile_image = models.ImageField(upload_to=profile_image_upload, blank=True, null=True)
    resume_file = models.FileField(upload_to="resume/", blank=True, null=True)

    # SEO
    meta_description = models.TextField(max_length=160, blank=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self) -> str:
        return self.name


# ---------------------------------------------------------------------
# Skill
# ---------------------------------------------------------------------
class Skill(TimeStampedModel):
    """Skill with a numeric proficiency rating."""

    CATEGORY_CHOICES = [
        ("frontend", "Frontend"),
        ("backend", "Backend"),
        ("database", "Database"),
        ("devops", "DevOps"),
        ("tools", "Tools"),
        ("languages", "Programming Languages"),
        ("frameworks", "Frameworks"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(
        default=50,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="1 = beginner, 100 = master",
    )
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, default="#3B82F6")  # Tailwind blue-500

    class Meta:
        ordering = ["category", "-proficiency"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self) -> str:
        return f"{self.name} ({self.category})"


# ---------------------------------------------------------------------
# Project
# ---------------------------------------------------------------------
class Project(TimeStampedModel):
    """Portfolio project entry."""

    CATEGORY_CHOICES = [
        ("web", "Web Application"),
        ("mobile", "Mobile Application"),
        ("desktop", "Desktop Application"),
        ("api", "API"),
        ("library", "Library / Package"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)

    image = models.ImageField(upload_to=project_image_upload, blank=True, null=True)
    technologies = models.TextField(
        help_text="Comma-separated list, e.g. 'Django, React, Postgres'"
    )

    is_featured = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=True)

    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self) -> str:
        return self.title

    @property
    def tech_list(self):
        return [t.strip() for t in self.technologies.split(",") if t.strip()]


# ---------------------------------------------------------------------
# Experience
# ---------------------------------------------------------------------
class Experience(TimeStampedModel):
    """Work-experience entry."""

    EMPLOYMENT_CHOICES = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("contract", "Contract"),
        ("internship", "Internship"),
        ("freelance", "Freelance"),
    ]

    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    company_url = models.URLField(blank=True)

    employment_type = models.CharField(
        max_length=20, choices=EMPLOYMENT_CHOICES, default="full_time"
    )

    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)

    skills_used = models.TextField(blank=True, help_text="Comma-separated list")
    achievements = models.TextField(blank=True)

    class Meta:
        ordering = ["-start_date"]
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"

    def __str__(self) -> str:
        return f"{self.position} – {self.company}"

    @property
    def duration(self) -> str:
        """Return human-readable duration like '2 yrs 3 mos'."""
        end = self.end_date or timezone.now().date()
        delta = end - self.start_date
        years, days_left = divmod(delta.days, 365)
        months = days_left // 30
        y = f"{years} yr{'s' if years != 1 else ''}" if years else ""
        m = f"{months} mo{'s' if months != 1 else ''}" if months else ""
        return (y + " " + m).strip() or "Less than a month"


# ---------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------
class Contact(TimeStampedModel):
    """Contact-form submission."""

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, default="Portfolio Contact")
    message = models.TextField()

    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)

    ip_address = models.GenericIPAddressField(blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact"
        verbose_name_plural = "Contacts"

    def __str__(self) -> str:
        return f"{self.name} – {self.subject}"
