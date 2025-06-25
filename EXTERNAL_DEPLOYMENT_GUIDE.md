
# External Platform Deployment Guide

This portfolio is production-ready and can be deployed to various external platforms. Here are the deployment options:

## Backend Deployment Options

### 1. Heroku
```bash
# Install Heroku CLI and login
heroku login
heroku create your-portfolio-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set SECRET_KEY="your-django-secret-key-here"
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS="your-app-name.herokuapp.com"
heroku config:set EMAIL_HOST_USER="your-email@gmail.com"
heroku config:set EMAIL_HOST_PASSWORD="your-app-password"

# Deploy
git subtree push --prefix=portfolio_backend heroku main

# Run migrations and seed data
heroku run python manage.py migrate
heroku run python manage.py seed_data
heroku run python manage.py createsuperuser
```

### 2. Railway
1. Connect your GitHub repository to Railway
2. Create a new project and select the backend directory
3. Set environment variables:
   - `SECRET_KEY`: Your Django secret key
   - `DEBUG`: False
   - `ALLOWED_HOSTS`: Your Railway domain
   - `EMAIL_HOST_USER`: Your email
   - `EMAIL_HOST_PASSWORD`: Your email password
4. Railway will automatically detect Django and deploy

### 3. Render
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `cd portfolio_backend && gunicorn portfolio_backend.wsgi`
5. Add environment variables (same as Railway)

## Frontend Deployment Options

### 1. Vercel
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

### 2. Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Base directory: `portfolio_frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL

### 3. GitHub Pages
```bash
cd portfolio_frontend

# Build for production
npm run build

# Deploy to GitHub Pages
npm install -g gh-pages
gh-pages -d dist
```

## Environment Variables for Production

### Backend (.env)
```
SECRET_KEY=your-super-secure-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,api.your-domain.com
DATABASE_URL=postgresql://user:pass@host:port/dbname
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@your-domain.com
```

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://api.your-domain.com
VITE_SITE_URL=https://your-domain.com
```

## Database Setup

For production, you'll need a PostgreSQL database. Most platforms provide this:

- **Heroku**: `heroku addons:create heroku-postgresql:mini`
- **Railway**: Automatically provisions PostgreSQL
- **Render**: Add PostgreSQL service
- **Supabase**: Free PostgreSQL database option

## Custom Domain Setup

1. **Backend Domain**: Point `api.yourdomain.com` to backend service
2. **Frontend Domain**: Point `yourdomain.com` to frontend hosting
3. **Update CORS**: Add your domain to `CORS_ALLOWED_ORIGINS`
4. **Update API URL**: Set `VITE_API_BASE_URL` to your backend domain

## SSL/HTTPS

All recommended platforms provide automatic SSL certificates:
- Vercel: Automatic SSL
- Netlify: Automatic SSL  
- Heroku: Automatic SSL
- Railway: Automatic SSL
- Render: Automatic SSL

## Post-Deployment Checklist

- [ ] Backend API accessible and returns data
- [ ] Frontend loads and displays portfolio content
- [ ] Contact form works and sends emails
- [ ] Admin panel accessible at `/admin`
- [ ] All images and static files load correctly
- [ ] HTTPS enforced on both domains
- [ ] Database migrations completed
- [ ] Sample data seeded

## Monitoring

Set up monitoring for production:
- **Sentry**: Error tracking for both frontend and backend
- **Google Analytics**: Website traffic analytics
- **Uptime Robot**: Monitor website availability

Your portfolio is now ready for professional deployment on any of these platforms!
