
"""
Management command to seed the database with sample data
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import Profile, Project, Skill, Experience
import os

class Command(BaseCommand):
    help = 'Seed the database with sample portfolio data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with sample data...')
        
        # Create superuser if doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@portfolio.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Created superuser: admin/admin123'))
        
        # Create or update profile
        profile, created = Profile.objects.get_or_create(
            defaults={
                'name': 'Jeffery Onome Emuodafevware',
                'title': 'Full Stack Developer & Software Engineer',
                'bio': '''Passionate full-stack developer with expertise in modern web technologies. 
                I specialize in creating robust, scalable applications using React, Django, and cloud technologies. 
                With a strong foundation in both frontend and backend development, I enjoy solving complex problems 
                and building user-centric solutions.''',
                'email': 'jeffemuodafe124@gmail.com',
                'phone': '+1 (555) 123-4567',
                'location': 'San Francisco, CA',
                'website': 'https://jefferyemuodafevware.com',
                'github_url': 'https://github.com/jefferyemuodafevware',
                'linkedin_url': 'https://linkedin.com/in/jefferyemuodafevware',
                'twitter_url': 'https://twitter.com/jefferyemu',
                'meta_description': 'Full Stack Developer specializing in React, Django, and modern web technologies.'
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created profile'))
        else:
            self.stdout.write('Profile already exists')
        
        # Create skills
        skills_data = [
            # Frontend
            {'name': 'React', 'category': 'frontend', 'proficiency': 95, 'color': '#61DAFB'},
            {'name': 'JavaScript', 'category': 'languages', 'proficiency': 90, 'color': '#F7DF1E'},
            {'name': 'TypeScript', 'category': 'languages', 'proficiency': 85, 'color': '#3178C6'},
            {'name': 'HTML5', 'category': 'frontend', 'proficiency': 95, 'color': '#E34F26'},
            {'name': 'CSS3', 'category': 'frontend', 'proficiency': 90, 'color': '#1572B6'},
            {'name': 'Tailwind CSS', 'category': 'frontend', 'proficiency': 88, 'color': '#06B6D4'},
            {'name': 'Vue.js', 'category': 'frontend', 'proficiency': 75, 'color': '#4FC08D'},
            
            # Backend
            {'name': 'Python', 'category': 'languages', 'proficiency': 95, 'color': '#3776AB'},
            {'name': 'Django', 'category': 'backend', 'proficiency': 90, 'color': '#092E20'},
            {'name': 'Django REST Framework', 'category': 'backend', 'proficiency': 88, 'color': '#092E20'},
            {'name': 'Node.js', 'category': 'backend', 'proficiency': 82, 'color': '#339933'},
            {'name': 'Express.js', 'category': 'backend', 'proficiency': 80, 'color': '#000000'},
            {'name': 'FastAPI', 'category': 'backend', 'proficiency': 75, 'color': '#009688'},
            
            # Database
            {'name': 'PostgreSQL', 'category': 'database', 'proficiency': 85, 'color': '#336791'},
            {'name': 'MySQL', 'category': 'database', 'proficiency': 80, 'color': '#4479A1'},
            {'name': 'MongoDB', 'category': 'database', 'proficiency': 75, 'color': '#47A248'},
            {'name': 'Redis', 'category': 'database', 'proficiency': 70, 'color': '#DC382D'},
            
            # DevOps & Tools
            {'name': 'Git', 'category': 'tools', 'proficiency': 90, 'color': '#F05032'},
            {'name': 'Docker', 'category': 'devops', 'proficiency': 80, 'color': '#2496ED'},
            {'name': 'AWS', 'category': 'devops', 'proficiency': 75, 'color': '#FF9900'},
            {'name': 'Linux', 'category': 'tools', 'proficiency': 85, 'color': '#FCC624'},
            {'name': 'Nginx', 'category': 'devops', 'proficiency': 70, 'color': '#009639'},
        ]
        
        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'],
                defaults=skill_data
            )
            if created:
                self.stdout.write(f'Created skill: {skill.name}')
        
        # Create projects
        projects_data = [
            {
                'title': 'E-Commerce Platform',
                'slug': 'ecommerce-platform',
                'short_description': 'Full-featured e-commerce platform with payment integration',
                'description': '''A comprehensive e-commerce platform built with React and Django. 
                Features include user authentication, product catalog, shopping cart, order management, 
                payment processing with Stripe, and an admin dashboard. The application is fully responsive 
                and optimized for performance.''',
                'category': 'web',
                'github_url': 'https://github.com/jefferyemuodafevware/ecommerce-platform',
                'live_url': 'https://ecommerce-demo.jefferyemu.com',
                'technologies': 'React, Django, PostgreSQL, Redis, Stripe, Tailwind CSS, Docker',
                'is_featured': True,
                'is_completed': True,
            },
            {
                'title': 'Task Management App',
                'slug': 'task-management-app',
                'short_description': 'Collaborative task management application with real-time updates',
                'description': '''A modern task management application with real-time collaboration features. 
                Built with React and Django Channels for WebSocket support. Features include project creation, 
                task assignment, deadline tracking, file attachments, and team collaboration.''',
                'category': 'web',
                'github_url': 'https://github.com/jefferyemuodafevware/task-manager',
                'live_url': 'https://tasks.jefferyemu.com',
                'technologies': 'React, Django Channels, WebSockets, PostgreSQL, Celery, Redis',
                'is_featured': True,
                'is_completed': True,
            },
            {
                'title': 'Weather Dashboard',
                'slug': 'weather-dashboard',
                'short_description': 'Beautiful weather dashboard with forecasts and analytics',
                'description': '''An elegant weather dashboard that displays current weather, forecasts, 
                and weather analytics. Features include location search, weather maps, historical data, 
                and personalized weather alerts. Built with modern web technologies and responsive design.''',
                'category': 'web',
                'github_url': 'https://github.com/jefferyemuodafevware/weather-dashboard',
                'live_url': 'https://weather.jefferyemu.com',
                'technologies': 'React, TypeScript, Chart.js, OpenWeather API, Tailwind CSS',
                'is_featured': True,
                'is_completed': True,
            },
        ]
        
        for project_data in projects_data:
            project, created = Project.objects.get_or_create(
                slug=project_data['slug'],
                defaults=project_data
            )
            if created:
                self.stdout.write(f'Created project: {project.title}')
        
        # Create experience
        experiences_data = [
            {
                'company': 'Tech Solutions Inc.',
                'position': 'Senior Full Stack Developer',
                'employment_type': 'full_time',
                'location': 'San Francisco, CA',
                'start_date': '2022-01-01',
                'description': '''Lead development of web applications using React and Django. 
                Collaborate with cross-functional teams to deliver high-quality software solutions. 
                Mentor junior developers and contribute to architectural decisions.''',
                'skills_used': 'React, Django, PostgreSQL, AWS, Docker, Git',
                'achievements': '''
                • Led development of flagship product that increased user engagement by 40%
                • Implemented CI/CD pipeline reducing deployment time by 60%
                • Mentored 3 junior developers leading to their promotion
                ''',
                'is_current': True,
            },
            {
                'company': 'StartupXYZ',
                'position': 'Full Stack Developer',
                'employment_type': 'full_time',
                'location': 'Remote',
                'start_date': '2020-06-01',
                'end_date': '2021-12-31',
                'description': '''Developed and maintained web applications for a fast-growing startup. 
                Worked directly with founders to build MVP and scale the platform to handle 10k+ users.''',
                'skills_used': 'React, Node.js, MongoDB, Express.js, AWS',
                'achievements': '''
                • Built core platform from scratch serving 10,000+ users
                • Implemented real-time features using WebSockets
                • Reduced page load times by 50% through optimization
                ''',
                'is_current': False,
            },
        ]
        
        for exp_data in experiences_data:
            experience, created = Experience.objects.get_or_create(
                company=exp_data['company'],
                position=exp_data['position'],
                defaults=exp_data
            )
            if created:
                self.stdout.write(f'Created experience: {experience.position} at {experience.company}')
        
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
        self.stdout.write('You can now access the admin at /admin/ with username: admin, password: admin123')
