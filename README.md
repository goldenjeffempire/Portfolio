# Portfolio Website - Jeffery Onome Emuodafevware

A modern, production-ready portfolio website built with React frontend and Django backend.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Full-Stack Architecture**: React frontend consuming Django REST APIs
- **Content Management**: Admin interface for managing portfolio content
- **Contact Form**: Working contact form with email notifications
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Production Ready**: Configured for deployment on various platforms

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Production database
- **Django CORS Headers** - Cross-origin requests
- **Whitenoise** - Static file serving
- **Gunicorn** - WSGI HTTP server

## 📦 Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Create virtual environment**
   ```bash
   cd portfolio_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Database setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py seed_data  # Load sample data
   python manage.py createsuperuser  # Create admin user
   ```

6. **Run backend server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd portfolio_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Update VITE_API_BASE_URL if needed
   ```

4. **Run frontend server**
   ```bash
   npm run dev
   ```

## 🌍 Deployment

### Backend Deployment (Heroku/Render)

1. **Heroku**
   ```bash
   # Install Heroku CLI and login
   heroku create your-portfolio-backend
   heroku addons:create heroku-postgresql:hobby-dev
   heroku config:set SECRET_KEY="your-secret-key"
   heroku config:set DEBUG=False
   git push heroku main
   heroku run python portfolio_backend/manage.py migrate
   heroku run python portfolio_backend/manage.py seed_data
   ```

2. **Render**
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `cd portfolio_backend && gunicorn portfolio_backend.wsgi`
   - Add environment variables from `.env.example`

### Frontend Deployment

1. **Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   cd portfolio_frontend
   vercel --prod
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

## 📝 Content Management

### Adding/Updating Content

1. **Access Django Admin**
   - Navigate to `http://your-backend-url/admin/`
   - Login with superuser credentials

2. **Manage Content**
   - **Profile**: Personal information and bio
   - **Skills**: Technical and soft skills with proficiency levels
   - **Experience**: Work history and achievements
   - **Projects**: Portfolio projects with links and technologies
   - **Education**: Academic background and certifications
   - **Contact Messages**: View messages from contact form

### API Endpoints

- `GET /api/profile/` - Profile information
- `GET /api/skills/` - Skills list
- `GET /api/experience/` - Work experience
- `GET /api/projects/` - Portfolio projects
- `GET /api/education/` - Education and certifications
- `POST /api/contact/` - Submit contact form

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
SECRET_KEY=your-django-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/dbname
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## 📱 Features Overview

### Homepage
- Hero section with introduction
- Featured skills preview
- Featured projects showcase
- Call-to-action sections

### About Page
- Professional summary
- Detailed skills with proficiency levels
- Work experience timeline
- Education and certifications

### Projects Page
- Project filtering by technology
- Detailed project cards
- GitHub and live demo links
- Technology tags

### Contact Page
- Contact form with validation
- Social media links
- Contact information
- Availability status

## 🔒 Security Features

- CSRF protection
- CORS configuration
- Input validation and sanitization
- Secure headers for production
- Environment-based configuration

## 🎨 Customization

### Styling
- Modify `portfolio_frontend/src/index.css` for global styles
- Update `portfolio_frontend/tailwind.config.js` for theme customization
- Components use Tailwind utility classes

### Content
- Update seed data in `portfolio_backend/portfolio/management/commands/seed_data.py`
- Modify through Django admin interface
- Update social links and contact information

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**Jeffery Onome Emuodafevware**
- Email: jeffemuodafe124@gmail.com
- LinkedIn: [linkedin.com/in/jeffery-emuodafevwar](https://linkedin.com/in/jeffery-emuodafevwar)
- GitHub: [github.com/jefferyemuodafevwar](https://github.com/jefferyemuodafevwar)

---

Built with ❤️ using React and Django