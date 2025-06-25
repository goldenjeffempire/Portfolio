# Deployment Instructions

This portfolio website is production-ready and can be deployed to various platforms. Follow these instructions for deployment.

## Backend Deployment Options

### Option 1: Heroku
```bash
# Install Heroku CLI and login
heroku login
heroku create your-portfolio-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY="your-django-secret-key-here"
heroku config:set DEBUG=False
heroku config:set EMAIL_HOST_USER="your-email@gmail.com"
heroku config:set EMAIL_HOST_PASSWORD="your-app-password"

# Deploy
git subtree push --prefix=portfolio_backend heroku main

# Run migrations and seed data
heroku run python manage.py migrate
heroku run python manage.py seed_data
heroku run python manage.py createsuperuser
```

### Option 2: Render
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set these configurations:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd portfolio_backend && gunicorn portfolio_backend.wsgi`
   - **Environment Variables**:
     - `SECRET_KEY`: Generate a secure key
     - `DEBUG`: `False`
     - `DATABASE_URL`: (Render will provide PostgreSQL)
     - `EMAIL_HOST_USER`: Your email
     - `EMAIL_HOST_PASSWORD`: Your app password

### Option 3: DigitalOcean App Platform
1. Connect your GitHub repository
2. Configure the app:
   - **Source Directory**: `portfolio_backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Run Command**: `gunicorn portfolio_backend.wsgi`
3. Add environment variables (same as Render)
4. Add PostgreSQL database addon

## Frontend Deployment Options

### Option 1: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd portfolio_frontend

# Set environment variable
echo "VITE_API_BASE_URL=https://your-backend-url.com/api" > .env.production

# Deploy
vercel --prod
```

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Base directory**: `portfolio_frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL

### Option 3: GitHub Pages (Static hosting)
```bash
cd portfolio_frontend

# Build for production
npm run build

# Deploy to GitHub Pages (using gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

## Post-Deployment Checklist

### Backend
- [ ] Database migrations completed
- [ ] Sample data seeded
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Email service working
- [ ] CORS settings updated for frontend domain
- [ ] Static files serving correctly

### Frontend
- [ ] API base URL updated
- [ ] Build successful
- [ ] All pages loading
- [ ] Contact form submitting
- [ ] Responsive design working
- [ ] SEO meta tags present

## Environment Variables Reference

### Backend (.env)
```env
SECRET_KEY=your-very-secret-django-key-here
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/dbname
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@yourportfolio.com
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,your-backend-url.herokuapp.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## Custom Domain Setup

### Backend (Django)
1. Update `ALLOWED_HOSTS` in settings
2. Update `CORS_ALLOWED_ORIGINS` for your frontend domain
3. Configure SSL/HTTPS in production

### Frontend
1. Add custom domain in hosting platform settings
2. Configure DNS CNAME record
3. Enable HTTPS/SSL certificate

## Monitoring and Maintenance

### Backend Monitoring
- Monitor server logs for errors
- Check database performance
- Monitor email delivery
- Set up uptime monitoring

### Frontend Monitoring
- Monitor build deployments
- Check API connectivity
- Monitor Core Web Vitals
- Set up error tracking

## Security Considerations

### Backend
- Use strong SECRET_KEY
- Enable HTTPS in production
- Set DEBUG=False
- Configure proper CORS settings
- Use environment variables for secrets
- Regular security updates

### Frontend
- Validate all user inputs
- Use HTTPS for all requests
- Implement CSP headers
- Regular dependency updates

## Backup and Recovery

### Database Backup
```bash
# Heroku
heroku pg:backups:capture
heroku pg:backups:download

# Manual PostgreSQL backup
pg_dump database_url > backup.sql
```

### Code Backup
- Use Git version control
- Tag releases
- Maintain staging environment
- Regular repository backups

This completes the deployment guide for your production-ready portfolio website.