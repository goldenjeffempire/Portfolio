# Production Deployment Guide

## Portfolio Website - Jeffery Onome Emuodafevware

This guide provides step-by-step instructions for deploying the complete portfolio website to production environments.

## Architecture Overview

- **Frontend**: React SPA with Vite build system
- **Backend**: Django REST API with PostgreSQL database
- **Features**: AI project showcase, contact forms, skills progression, responsive design

## Backend Deployment (Django API)

### Option 1: Heroku Deployment

1. **Prepare for Heroku**
```bash
pip install gunicorn whitenoise
echo "web: gunicorn portfolio_backend.wsgi --log-file -" > Procfile
echo "python-3.11.*" > runtime.txt
```

2. **Configure Settings for Production**
```python
# portfolio_backend/settings.py additions
import os
import dj_database_url

ALLOWED_HOSTS = ['your-app-name.herokuapp.com', 'localhost', '127.0.0.1']

# Database configuration
DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3'))
}

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

3. **Deploy Commands**
```bash
heroku create your-portfolio-api
heroku addons:create heroku-postgresql:mini
heroku config:set DJANGO_SECRET_KEY="your-secret-key"
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py seed_data
```

### Option 2: DigitalOcean App Platform

1. **Create app.yaml**
```yaml
name: portfolio-backend
services:
- name: api
  source_dir: portfolio_backend
  github:
    repo: your-username/portfolio-repo
    branch: main
  run_command: gunicorn portfolio_backend.wsgi
  environment_slug: python
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: DJANGO_SECRET_KEY
    value: your-secret-key
databases:
- name: portfolio-db
  engine: PG
  version: "13"
```

### Option 3: Railway Deployment

1. **Connect GitHub repository to Railway**
2. **Set environment variables**:
   - `DJANGO_SECRET_KEY`
   - `RAILWAY_STATIC_URL` (auto-configured)
3. **Railway auto-detects Django and handles deployment**

## Frontend Deployment (React)

### Option 1: Vercel Deployment

1. **Build Configuration**
```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

2. **Environment Variables**
```bash
# .env.production
VITE_API_URL=https://your-backend-url.herokuapp.com
```

3. **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Netlify Deployment

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables in Netlify Dashboard**
   - `VITE_API_URL`: Your backend URL

3. **Add _redirects file**
```bash
echo "/*    /index.html   200" > portfolio_frontend/public/_redirects
```

### Option 3: GitHub Pages with Actions

1. **Create .github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: cd portfolio_frontend && npm install
    - run: cd portfolio_frontend && npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./portfolio_frontend/dist
```

## Domain Configuration

### Custom Domain Setup

1. **Backend Domain (API)**
   - Point `api.jefferyemuodafevware.com` to backend service
   - Update CORS settings: `CORS_ALLOWED_ORIGINS = ['https://jefferyemuodafevware.com']`

2. **Frontend Domain**
   - Point `jefferyemuodafevware.com` to frontend hosting
   - Update API URL: `VITE_API_URL=https://api.jefferyemuodafevware.com`

## Environment Variables

### Backend Environment Variables
```bash
DJANGO_SECRET_KEY=your-super-secure-secret-key
DATABASE_URL=postgresql://user:pass@host:port/dbname
DEBUG=False
ALLOWED_HOSTS=your-domain.com,api.your-domain.com
CORS_ALLOWED_ORIGINS=https://your-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend Environment Variables
```bash
VITE_API_URL=https://api.your-domain.com
VITE_SITE_URL=https://your-domain.com
```

## SSL Certificate

All major platforms (Vercel, Netlify, Heroku) provide automatic SSL certificates. For custom domains:

1. **Let's Encrypt** (free option)
2. **Cloudflare** (free tier with CDN)
3. **Platform-provided SSL** (recommended)

## Database Setup

### Production Database Migration
```bash
# After deployment
python manage.py migrate
python manage.py seed_data
python manage.py collectstatic --noinput
```

### Database Backup Strategy
```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

## Performance Optimization

### Frontend Optimizations
1. **Code Splitting**: Vite handles automatically
2. **Image Optimization**: Use WebP format
3. **CDN**: Cloudflare or platform CDN
4. **Caching**: Browser and CDN caching headers

### Backend Optimizations
1. **Database Indexing**: Already configured in models
2. **Static File Serving**: WhiteNoise for static files
3. **API Caching**: Redis for API response caching
4. **Database Connection Pooling**: PgBouncer for high traffic

## Monitoring and Analytics

### Error Monitoring
```bash
pip install sentry-sdk
# Add to Django settings
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

### Analytics
- **Google Analytics**: Add tracking ID to frontend
- **Plausible**: Privacy-focused alternative

## Security Checklist

- [ ] HTTPS enforced on both frontend and backend
- [ ] CORS properly configured
- [ ] Django security middleware enabled
- [ ] Database credentials secured
- [ ] Secret keys in environment variables
- [ ] Content Security Policy headers
- [ ] Rate limiting on API endpoints

## Cost Estimation

### Free Tier Options
- **Vercel**: Frontend hosting (free)
- **Railway**: Backend hosting (free tier)
- **Supabase**: PostgreSQL database (free tier)
- **Total**: $0/month for small traffic

### Professional Tier
- **Vercel Pro**: $20/month
- **Railway Pro**: $5/month
- **Database**: $7/month
- **Total**: ~$32/month

## Contact Form Setup

### Email Service Configuration
```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
```

### Alternative Email Services
1. **SendGrid**: Reliable delivery
2. **Mailgun**: Developer-friendly
3. **AWS SES**: Cost-effective for high volume

## Final Deployment Steps

1. **Test thoroughly in staging environment**
2. **Set up monitoring and alerts**
3. **Configure automated backups**
4. **Set up CI/CD pipeline**
5. **Update DNS records**
6. **Verify all functionality**

## Support and Maintenance

- **Regular Updates**: Monthly dependency updates
- **Security Patches**: Immediate application
- **Performance Monitoring**: Weekly reviews
- **Backup Verification**: Monthly restore tests

This portfolio website showcases advanced full-stack development skills with the featured Echoverse App project demonstrating AI integration capabilities. The production deployment will serve as a professional showcase for attracting high-value clients and opportunities.