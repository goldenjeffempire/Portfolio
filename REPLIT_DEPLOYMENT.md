
# 🚀 Replit Deployment Guide

This portfolio is optimized for deployment on Replit. Follow these steps for production deployment.

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup
Configure these in Replit's Secrets tab:

**Required Secrets:**
```
SECRET_KEY=your-django-secret-key-generate-new-one
DEBUG=False
ALLOWED_HOSTS=your-repl-name.replit.app,your-custom-domain.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
DEFAULT_FROM_EMAIL=noreply@your-domain.com
CORS_ALLOWED_ORIGINS=https://your-repl-name.replit.app
```

**Optional Secrets:**
```
DATABASE_URL=postgresql://user:pass@host:port/dbname  # If using external DB
ENABLE_SSL_REDIRECT=True  # Enable in production
```

### 2. Frontend Environment Variables
Create `portfolio_frontend/.env.production`:
```
VITE_API_BASE_URL=/api
VITE_SITE_URL=https://your-repl-name.replit.app
```

## 🔧 Deployment Steps

### Step 1: Prepare the Application
```bash
# Build frontend for production
cd portfolio_frontend
npm run build

# Collect Django static files
cd ../portfolio_backend
python manage.py collectstatic --noinput

# Run database migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### Step 2: Configure Replit Deployment

#### Static Deployment (Frontend Only)
If you want to deploy just the frontend as a static site:

1. Open Deployments tab in Replit
2. Select "Static" deployment type
3. Configure:
   - **Build Command**: `cd portfolio_frontend && npm run build`
   - **Public Directory**: `portfolio_frontend/dist`
4. Deploy

#### Reserved VM Deployment (Full-Stack)
For the complete application with backend:

1. Open Deployments tab in Replit
2. Select "Reserved VM" deployment type
3. Configure:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm run start`
4. Add environment variables from Secrets
5. Deploy

### Step 3: Post-Deployment Configuration

1. **Domain Setup**: Configure custom domain in Replit deployments
2. **SSL Certificate**: Automatic via Replit
3. **Database**: Use Replit Database or external PostgreSQL
4. **Email**: Configure Gmail App Password for contact form

## 🔍 Troubleshooting

### Common Issues:

**Build Failures:**
- Check that all dependencies are installed
- Verify environment variables are set correctly
- Review build logs in Deployments tab

**API Connection Issues:**
- Ensure CORS settings include your domain
- Check API base URL in frontend config
- Verify backend is running on correct port

**Database Issues:**
- Run migrations: `python manage.py migrate`
- Check database connection settings
- Ensure proper permissions

**Email Not Working:**
- Verify Gmail App Password (not regular password)
- Check email host settings
- Test with Django shell: `python manage.py shell`

## 📊 Performance Optimization

### Frontend Optimizations:
- ✅ Code splitting with React.lazy()
- ✅ Image optimization and lazy loading
- ✅ Bundle analysis and tree shaking
- ✅ CDN for static assets (via Replit)

### Backend Optimizations:
- ✅ Database query optimization
- ✅ API response caching
- ✅ Static file compression (WhiteNoise)
- ✅ Request throttling

## 🛡️ Security Features

- ✅ HTTPS enforcement
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation and sanitization
- ✅ Secret key management

## 📈 Monitoring

### Built-in Monitoring:
- Error logging to console
- Performance metrics via Replit
- Health check endpoint: `/api/health/`

### Custom Monitoring:
- Django admin interface: `/admin/`
- API status endpoints
- Contact form submissions tracking

## 🔄 Updates and Maintenance

1. **Code Updates**: Push to your Replit repository
2. **Dependencies**: Update package.json and requirements.txt
3. **Database**: Run migrations for schema changes
4. **Static Files**: Rebuild and collect static files

## 📞 Support

For deployment issues:
1. Check Replit documentation
2. Review application logs
3. Test locally first
4. Contact Replit support if needed

---

**Your portfolio is now production-ready and optimized for Replit deployment! 🎉**
