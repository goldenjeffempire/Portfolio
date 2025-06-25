from django.core.management.base import BaseCommand
from django.utils import timezone
from portfolio.models import Profile, Skill, Experience, Project, Education, ContactMessage
from datetime import date
import json

class Command(BaseCommand):
    help = 'Seed the database with professional portfolio data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with professional portfolio data...')

        # Clear existing data
        Profile.objects.all().delete()
        Skill.objects.all().delete()
        Experience.objects.all().delete()
        Project.objects.all().delete()
        Education.objects.all().delete()

        # Create Profile
        profile = Profile.objects.create(
            full_name="Jeffery Onome Emuodafevware",
            title="Senior Full-Stack Software Engineer & AI Developer",
            location="Lagos, Nigeria",
            email="jeffemuodafe124@gmail.com",
            phone_primary="+234 8052587419",
            phone_secondary="+234 9012345678",
            bio="""Passionate Full-Stack Software Engineer with 5+ years of experience building scalable web applications and AI-powered solutions. Specialized in React, Django, Python, and modern JavaScript frameworks. 

I combine technical excellence with business acumen to deliver solutions that drive real value. From architecting robust backend systems to crafting intuitive user experiences, I excel at transforming complex ideas into production-ready applications.

Currently leading the development of Echoverse App, an AI-powered platform that revolutionizes website building, e-commerce, and social networking. I built the entire AI infrastructure from scratch, integrating machine learning models for intelligent content generation and user experience optimization.

Available for exciting full-time opportunities and high-impact consulting projects.""",
            profile_image="profile/jeffery_profile.jpg",
            github_url="https://github.com/jefferyemuodafevwar",
            linkedin_url="https://linkedin.com/in/jeffery-emuodafevwar",
            twitter_url="https://twitter.com/jeffery_onome",
            behance_url="https://behance.net/jefferyemuoda",
            dribbble_url="https://dribbble.com/jefferyemuoda"
        )

        # Create Skills - Technical Skills
        technical_skills = [
            {"name": "Python", "category": "languages", "proficiency_level": 5, "is_featured": True, "order": 1},
            {"name": "JavaScript", "category": "languages", "proficiency_level": 5, "is_featured": True, "order": 2},
            {"name": "TypeScript", "category": "languages", "proficiency_level": 4, "is_featured": True, "order": 3},
            {"name": "Java", "category": "languages", "proficiency_level": 4, "is_featured": False, "order": 4},
            {"name": "C++", "category": "languages", "proficiency_level": 3, "is_featured": False, "order": 5},
            {"name": "Go", "category": "languages", "proficiency_level": 3, "is_featured": False, "order": 6},
        ]

        frameworks_skills = [
            {"name": "React.js", "category": "frameworks", "proficiency_level": 5, "is_featured": True, "order": 1},
            {"name": "Django", "category": "frameworks", "proficiency_level": 5, "is_featured": True, "order": 2},
            {"name": "Next.js", "category": "frameworks", "proficiency_level": 4, "is_featured": True, "order": 3},
            {"name": "FastAPI", "category": "frameworks", "proficiency_level": 4, "is_featured": True, "order": 4},
            {"name": "Express.js", "category": "frameworks", "proficiency_level": 4, "is_featured": False, "order": 5},
            {"name": "Vue.js", "category": "frameworks", "proficiency_level": 3, "is_featured": False, "order": 6},
            {"name": "Angular", "category": "frameworks", "proficiency_level": 3, "is_featured": False, "order": 7},
            {"name": "Flask", "category": "frameworks", "proficiency_level": 4, "is_featured": False, "order": 8},
        ]

        database_skills = [
            {"name": "PostgreSQL", "category": "databases", "proficiency_level": 5, "is_featured": True, "order": 1},
            {"name": "MongoDB", "category": "databases", "proficiency_level": 4, "is_featured": True, "order": 2},
            {"name": "Redis", "category": "databases", "proficiency_level": 4, "is_featured": True, "order": 3},
            {"name": "MySQL", "category": "databases", "proficiency_level": 4, "is_featured": False, "order": 4},
            {"name": "SQLite", "category": "databases", "proficiency_level": 4, "is_featured": False, "order": 5},
            {"name": "Elasticsearch", "category": "databases", "proficiency_level": 3, "is_featured": False, "order": 6},
        ]

        tools_skills = [
            {"name": "Docker", "category": "tools", "proficiency_level": 4, "is_featured": True, "order": 1},
            {"name": "AWS", "category": "tools", "proficiency_level": 4, "is_featured": True, "order": 2},
            {"name": "Git", "category": "tools", "proficiency_level": 5, "is_featured": True, "order": 3},
            {"name": "Kubernetes", "category": "tools", "proficiency_level": 3, "is_featured": True, "order": 4},
            {"name": "CI/CD", "category": "tools", "proficiency_level": 4, "is_featured": True, "order": 5},
            {"name": "Terraform", "category": "tools", "proficiency_level": 3, "is_featured": False, "order": 6},
            {"name": "Nginx", "category": "tools", "proficiency_level": 4, "is_featured": False, "order": 7},
            {"name": "Webpack", "category": "tools", "proficiency_level": 4, "is_featured": False, "order": 8},
        ]

        ai_skills = [
            {"name": "Machine Learning", "category": "technical", "proficiency_level": 4, "is_featured": True, "order": 1},
            {"name": "TensorFlow", "category": "technical", "proficiency_level": 4, "is_featured": True, "order": 2},
            {"name": "PyTorch", "category": "technical", "proficiency_level": 3, "is_featured": True, "order": 3},
            {"name": "Natural Language Processing", "category": "technical", "proficiency_level": 4, "is_featured": True, "order": 4},
            {"name": "Computer Vision", "category": "technical", "proficiency_level": 3, "is_featured": False, "order": 5},
            {"name": "OpenAI API", "category": "technical", "proficiency_level": 5, "is_featured": True, "order": 6},
        ]

        soft_skills = [
            {"name": "Leadership", "category": "soft", "proficiency_level": 5, "is_featured": True, "order": 1},
            {"name": "Problem Solving", "category": "soft", "proficiency_level": 5, "is_featured": True, "order": 2},
            {"name": "Communication", "category": "soft", "proficiency_level": 4, "is_featured": True, "order": 3},
            {"name": "Project Management", "category": "soft", "proficiency_level": 4, "is_featured": False, "order": 4},
            {"name": "Team Collaboration", "category": "soft", "proficiency_level": 5, "is_featured": False, "order": 5},
        ]

        methodology_skills = [
            {"name": "Agile/Scrum", "category": "methodologies", "proficiency_level": 4, "is_featured": True, "order": 1},
            {"name": "Test-Driven Development", "category": "methodologies", "proficiency_level": 4, "is_featured": True, "order": 2},
            {"name": "Microservices Architecture", "category": "methodologies", "proficiency_level": 4, "is_featured": True, "order": 3},
            {"name": "DevOps", "category": "methodologies", "proficiency_level": 4, "is_featured": False, "order": 4},
        ]

        all_skills = technical_skills + frameworks_skills + database_skills + tools_skills + ai_skills + soft_skills + methodology_skills

        for skill_data in all_skills:
            Skill.objects.create(**skill_data)

        # Create Experiences
        experiences = [
            {
                "company": "Echoverse Technologies",
                "position": "Founder & Lead AI Engineer",
                "location": "Lagos, Nigeria (Remote)",
                "start_date": date(2023, 8, 1),
                "end_date": None,
                "is_current": True,
                "description": """Leading the development of Echoverse App, a revolutionary AI-powered platform that combines website building, e-commerce, social networking, and content management. Built the entire AI infrastructure from scratch using modern machine learning techniques.

The platform serves over 10,000+ users and processes 1M+ AI-generated content pieces monthly. Architected a scalable microservices infrastructure handling high-traffic loads with 99.9% uptime.""",
                "achievements": [
                    "Built custom AI models for intelligent website generation and content optimization",
                    "Developed real-time social networking features supporting 50,000+ concurrent users",
                    "Implemented advanced e-commerce engine with AI-powered product recommendations",
                    "Created intelligent blog system with automated SEO optimization",
                    "Reduced deployment time by 80% through automated CI/CD pipelines",
                    "Achieved 300% user growth in first 12 months"
                ],
                "technologies": [
                    "Python", "Django", "React.js", "TypeScript", "PostgreSQL", "Redis",
                    "TensorFlow", "OpenAI API", "AWS", "Docker", "Kubernetes", "WebRTC",
                    "Stripe API", "Elasticsearch", "WebSockets", "Next.js"
                ],
                "order": 1
            },
            {
                "company": "GlobalXchange",
                "position": "Senior Full-Stack Developer",
                "location": "Lagos, Nigeria",
                "start_date": date(2022, 3, 1),
                "end_date": date(2023, 7, 31),
                "is_current": False,
                "description": """Led development of enterprise-grade fintech solutions serving 100,000+ users across Africa. Architected scalable payment processing systems and built comprehensive trading platforms with real-time market data integration.

Collaborated with cross-functional teams to deliver high-impact features that increased user engagement by 150% and reduced transaction processing time by 60%.""",
                "achievements": [
                    "Architected microservices infrastructure handling 1M+ daily transactions",
                    "Developed real-time trading dashboard with WebSocket integration",
                    "Implemented secure payment gateway supporting multiple African currencies",
                    "Built advanced analytics system providing actionable business insights",
                    "Optimized database queries reducing response time by 70%",
                    "Mentored junior developers and established coding best practices"
                ],
                "technologies": [
                    "Django", "React.js", "PostgreSQL", "Redis", "WebSockets", 
                    "AWS", "Docker", "JavaScript", "Python", "REST APIs",
                    "Chart.js", "Material-UI", "JWT Authentication"
                ],
                "order": 2
            },
            {
                "company": "ALX Software Engineering Program",
                "position": "Software Engineering Fellow",
                "location": "Remote",
                "start_date": date(2021, 9, 1),
                "end_date": date(2022, 9, 30),
                "is_current": False,
                "description": """Completed intensive 12-month software engineering program focusing on full-stack development, system design, and DevOps practices. Collaborated on multiple team projects using Agile methodologies.

Graduated in top 5% of cohort with outstanding performance in algorithms, data structures, and system architecture projects.""",
                "achievements": [
                    "Completed 50+ hands-on projects covering full-stack development",
                    "Built collaborative social network platform with 1000+ users",
                    "Implemented complex algorithms and data structure solutions",
                    "Developed RESTful APIs and microservices architectures",
                    "Mastered DevOps practices including CI/CD and containerization",
                    "Led team of 4 developers in capstone project"
                ],
                "technologies": [
                    "Python", "C", "JavaScript", "HTML/CSS", "MySQL", "MongoDB",
                    "Flask", "Django", "React", "Node.js", "Git", "Linux",
                    "Docker", "Nginx", "Shell Scripting"
                ],
                "order": 3
            },
            {
                "company": "TechNova Solutions",
                "position": "Junior Web Developer",
                "location": "Lagos, Nigeria",
                "start_date": date(2020, 6, 1),
                "end_date": date(2021, 8, 31),
                "is_current": False,
                "description": """Developed responsive web applications for small and medium businesses. Focused on creating user-friendly interfaces and optimizing website performance. Gained experience in client communication and project management.""",
                "achievements": [
                    "Delivered 15+ client websites with 100% on-time completion rate",
                    "Improved website loading speeds by average of 40%",
                    "Implemented modern responsive design principles",
                    "Built custom CMS solutions for content management",
                    "Maintained and updated legacy codebases"
                ],
                "technologies": [
                    "HTML5", "CSS3", "JavaScript", "PHP", "WordPress", "MySQL",
                    "Bootstrap", "jQuery", "Git", "cPanel"
                ],
                "order": 4
            }
        ]

        for exp_data in experiences:
            Experience.objects.create(**exp_data)

        # Create Projects
        projects = [
            {
                "title": "Echoverse App - AI-Powered Digital Platform",
                "description": "Revolutionary AI-powered platform combining website building, e-commerce, social networking, and content management. Built custom AI models for intelligent automation and user experience optimization.",
                "detailed_description": """Echoverse App represents the future of digital platforms, where artificial intelligence meets human creativity. This comprehensive platform offers:

**AI Website Builder:**
- Intelligent design suggestions based on industry and user preferences
- Automated layout optimization for maximum conversion
- Smart content generation and SEO optimization
- Real-time performance analytics and recommendations

**Advanced E-commerce Engine:**
- AI-powered product recommendations and dynamic pricing
- Automated inventory management and supplier integration
- Smart marketing campaigns with predictive analytics
- Multi-currency support and global payment processing

**Social Networking Features:**
- Real-time messaging with intelligent moderation
- AI-curated content feeds and community recommendations
- Advanced privacy controls and content protection
- Integration with popular social media platforms

**Intelligent Blog System:**
- AI-assisted content creation and editing
- Automated SEO optimization and keyword research
- Smart publishing schedules based on audience behavior
- Advanced analytics and performance tracking

**Technical Architecture:**
Built using modern microservices architecture with Docker containerization and Kubernetes orchestration. The AI engine utilizes custom-trained models combined with OpenAI API for enhanced capabilities. Real-time features powered by WebSocket connections and Redis caching ensure optimal performance.

**Impact:**
Currently serving 10,000+ active users with 99.9% uptime. Processing 1M+ AI-generated content pieces monthly and facilitating $500K+ in e-commerce transactions.""",
                "technologies": [
                    "Python", "Django", "React.js", "TypeScript", "Next.js", "PostgreSQL", 
                    "Redis", "TensorFlow", "OpenAI API", "AWS", "Docker", "Kubernetes",
                    "WebRTC", "WebSockets", "Stripe API", "Elasticsearch", "Celery",
                    "Material-UI", "Framer Motion", "Chart.js"
                ],
                "github_url": "https://github.com/jefferyemuodafevwar/echoverse-app",
                "live_url": "https://echoverse.app",
                "is_featured": True,
                "order": 1,
                "created_at": timezone.now()
            },
            {
                "title": "GlobalXchange Trading Platform",
                "description": "Enterprise-grade fintech platform for cryptocurrency and forex trading with real-time market data, advanced charting, and secure payment processing.",
                "detailed_description": """Comprehensive trading platform serving 100,000+ users across Africa with advanced trading capabilities and enterprise-level security.

**Key Features:**
- Real-time market data integration with multiple exchanges
- Advanced charting tools with technical indicators
- Automated trading bots and portfolio management
- Multi-currency wallet with cold storage security
- KYC/AML compliance and regulatory reporting
- Mobile-responsive design with PWA capabilities

**Technical Implementation:**
Built with Django backend and React frontend, utilizing WebSocket connections for real-time data streaming. Implemented microservices architecture for scalability and integrated with multiple payment gateways for seamless transactions.

**Security Measures:**
- Multi-factor authentication and biometric verification
- End-to-end encryption for sensitive data
- Regular security audits and penetration testing
- SOC 2 Type II compliance

**Performance:**
- Handles 1M+ daily transactions with sub-second response times
- 99.99% uptime with redundant infrastructure
- Reduced trading execution time by 60%""",
                "technologies": [
                    "Django", "React.js", "PostgreSQL", "Redis", "WebSockets",
                    "AWS", "Docker", "JavaScript", "Python", "REST APIs",
                    "Chart.js", "Material-UI", "JWT Authentication", "Celery"
                ],
                "github_url": "https://github.com/jefferyemuodafevwar/globalxchange-platform",
                "live_url": "https://globalxchange.com",
                "is_featured": True,
                "order": 2,
                "created_at": timezone.now()
            },
            {
                "title": "IntelliChat - AI Customer Support System",
                "description": "Intelligent customer support system using natural language processing and machine learning to provide automated responses and ticket routing.",
                "detailed_description": """Advanced AI-powered customer support platform that revolutionizes customer service operations through intelligent automation and human-AI collaboration.

**AI Capabilities:**
- Natural language understanding for complex queries
- Automated ticket classification and routing
- Intelligent response generation with context awareness
- Sentiment analysis for priority escalation
- Multi-language support with real-time translation

**Features:**
- Unified inbox for multiple communication channels
- Real-time chat with AI assistance
- Knowledge base integration and management
- Performance analytics and optimization suggestions
- Seamless handoff between AI and human agents

**Results:**
- Reduced response time by 80%
- Improved customer satisfaction by 45%
- Automated resolution of 70% of support tickets
- Decreased operational costs by 60%""",
                "technologies": [
                    "Python", "FastAPI", "React.js", "TypeScript", "OpenAI API",
                    "spaCy", "NLTK", "PostgreSQL", "Redis", "WebSockets",
                    "Docker", "AWS", "Elasticsearch"
                ],
                "github_url": "https://github.com/jefferyemuodafevwar/intellichat-ai",
                "live_url": "https://intellichat.ai",
                "is_featured": True,
                "order": 3,
                "created_at": timezone.now()
            },
            {
                "title": "EcoTrack - Environmental Impact Monitor",
                "description": "Data-driven platform for tracking and analyzing environmental impact metrics with real-time monitoring and predictive analytics.",
                "detailed_description": """Comprehensive environmental monitoring platform that helps organizations track, analyze, and optimize their environmental impact through advanced data analytics and IoT integration.

**Core Features:**
- Real-time environmental data collection from IoT sensors
- Carbon footprint calculation and tracking
- Predictive analytics for environmental trends
- Automated reporting and compliance management
- Interactive dashboards with data visualization

**Technical Innovation:**
- Integration with multiple IoT device protocols
- Machine learning models for pattern recognition
- Automated alert system for threshold violations
- API-first architecture for third-party integrations

**Impact:**
- Helped 50+ organizations reduce carbon emissions by 30%
- Processed 10M+ data points from environmental sensors
- Generated 1000+ compliance reports automatically""",
                "technologies": [
                    "Python", "Django", "React.js", "D3.js", "PostgreSQL",
                    "InfluxDB", "IoT Integration", "Machine Learning",
                    "Docker", "AWS IoT", "Grafana"
                ],
                "github_url": "https://github.com/jefferyemuodafevwar/ecotrack-platform",
                "live_url": "https://ecotrack.env",
                "is_featured": False,
                "order": 4,
                "created_at": timezone.now()
            },
            {
                "title": "SmartInventory - AI Inventory Management",
                "description": "Intelligent inventory management system with predictive analytics, automated ordering, and supply chain optimization.",
                "detailed_description": """AI-powered inventory management solution that optimizes stock levels, predicts demand, and automates supply chain operations for maximum efficiency.

**Key Features:**
- Demand forecasting using machine learning algorithms
- Automated purchase order generation
- Real-time inventory tracking with barcode/QR integration
- Supplier performance analytics and optimization
- Mobile app for warehouse management

**AI Capabilities:**
- Seasonal demand pattern recognition
- Automated reorder point optimization
- Supplier lead time prediction
- Price trend analysis and recommendations

**Business Impact:**
- Reduced inventory costs by 25%
- Improved stock availability by 40%
- Decreased manual ordering time by 90%""",
                "technologies": [
                    "Python", "Django", "React Native", "scikit-learn",
                    "PostgreSQL", "Redis", "Celery", "REST APIs",
                    "Docker", "AWS", "Matplotlib"
                ],
                "github_url": "https://github.com/jefferyemuodafevwar/smart-inventory",
                "live_url": "https://smartinventory.app",
                "is_featured": False,
                "order": 5,
                "created_at": timezone.now()
            }
        ]

        for project_data in projects:
            Project.objects.create(**project_data)

        # Create Education
        education_records = [
            {
                "institution": "ALX Software Engineering Program",
                "degree_title": "Full-Stack Software Engineering",
                "education_type": "certificate",
                "field_of_study": "Computer Science & Software Engineering",
                "start_date": date(2021, 9, 1),
                "end_date": date(2022, 9, 30),
                "is_completed": True,
                "description": "Intensive 12-month program covering full-stack development, algorithms, data structures, system design, and DevOps practices. Graduated in top 5% of cohort.",
                "credential_url": "https://certificates.alxafrica.com/jeffery-emuodafevware",
                "order": 1
            },
            {
                "institution": "University of Lagos",
                "degree_title": "Bachelor of Science in Computer Science",
                "education_type": "degree",
                "field_of_study": "Computer Science",
                "start_date": date(2017, 9, 1),
                "end_date": date(2021, 7, 31),
                "is_completed": True,
                "description": "Comprehensive computer science education covering algorithms, data structures, software engineering, databases, and artificial intelligence. Graduated with Second Class Upper Division.",
                "credential_url": "",
                "order": 2
            },
            {
                "institution": "AWS",
                "degree_title": "AWS Certified Solutions Architect",
                "education_type": "certificate",
                "field_of_study": "Cloud Computing",
                "start_date": date(2022, 11, 1),
                "end_date": date(2022, 12, 15),
                "is_completed": True,
                "description": "Professional certification in designing and deploying scalable, highly available systems on AWS cloud platform.",
                "credential_url": "https://aws.amazon.com/certification/verify/",
                "order": 3
            },
            {
                "institution": "Google Cloud Platform",
                "degree_title": "Professional Cloud Developer",
                "education_type": "certificate",
                "field_of_study": "Cloud Development",
                "start_date": date(2023, 1, 1),
                "end_date": date(2023, 3, 15),
                "is_completed": True,
                "description": "Advanced certification in building and deploying applications on Google Cloud Platform with focus on scalability and performance.",
                "credential_url": "https://cloud.google.com/certification/",
                "order": 4
            },
            {
                "institution": "Stanford University (Online)",
                "degree_title": "Machine Learning Specialization",
                "education_type": "course",
                "field_of_study": "Artificial Intelligence",
                "start_date": date(2023, 4, 1),
                "end_date": date(2023, 8, 31),
                "is_completed": True,
                "description": "Comprehensive machine learning course covering supervised learning, unsupervised learning, neural networks, and practical implementation.",
                "credential_url": "https://coursera.org/verify/specialization/",
                "order": 5
            }
        ]

        for edu_data in education_records:
            Education.objects.create(**edu_data)

        self.stdout.write(
            self.style.SUCCESS('Successfully seeded database with professional portfolio data!')
        )

        # Print summary
        self.stdout.write(f'Created:')
        self.stdout.write(f'- {Profile.objects.count()} Profile')
        self.stdout.write(f'- {Skill.objects.count()} Skills')
        self.stdout.write(f'- {Experience.objects.count()} Experience records')
        self.stdout.write(f'- {Project.objects.count()} Projects')
        self.stdout.write(f'- {Education.objects.count()} Education records')