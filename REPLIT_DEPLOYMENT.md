
# 🚀 Replit Deployment Guide

This guide covers deploying your full-stack portfolio website on Replit.

## 📋 Prerequisites

- Replit account
- Your portfolio code in a Replit project
- Environment variables configured

## 🔧 Environment Setup

### 1. Create Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Django Settings
SECRET_KEY=your-super-secret-django-key-change-in-production
DEBUG=False
ALLOWED_HOSTS=your-replit-url.replit.app,.replit.dev,.replit.co

# Database (optional - uses SQLite by default)
# DATABASE_URL=postgresql://user:password@host:port/database

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com

# Frontend Configuration
VITE_API_URL=https://your-replit-url.replit.app/api
VITE_APP_TITLE=Your Portfolio
```

### 2. Initial Setup Commands

Run these commands in the Replit shell:

```bash
# Install Python dependencies
cd portfolio_backend && pip install -r requirements.txt

# Install Node.js dependencies
cd portfolio_frontend && npm install

# Create database and run migrations
cd portfolio_backend && python manage.py migrate

# Create sample data
cd portfolio_backend && python manage.py seed_data

# Create admin user
cd portfolio_backend && python manage.py createsuperuser
```

## 🏃‍♂️ Running the Application

### Development Mode

Click the **Run** button or use the "Start Development" workflow to run both frontend and backend simultaneously:

- Frontend: http://your-repl-url.replit.dev:3000
- Backend API: http://your-repl-url.replit.dev:5000/api
- Django Admin: http://your-repl-url.replit.dev:5000/admin

### Production Build

Use the "Build Production" workflow to create optimized builds:

```bash
# This will:
# 1. Build the React frontend for production
# 2. Collect Django static files
# 3. Run database migrations
```

## 🌐 Replit Deployment

### Using Replit's Deployment Feature

1. **Enable Deployments**:
   - Go to your Repl
   - Click on the "Deploy" tab
   - Configure deployment settings

2. **Configure Build Settings**:
   - Build Command: `npm run build:all`
   - Start Command: `cd portfolio_backend && gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:$PORT`

3. **Environment Variables**:
   - Add all environment variables from your `.env` file
   - Make sure `DEBUG=False` and `ALLOWED_HOSTS` includes your deployment domain

4. **Deploy**:
   - Click "Deploy" to create your production deployment
   - Your site will be available at the provided URL

### Manual Deployment Steps

If you prefer manual deployment:

```bash
# 1. Build frontend
cd portfolio_frontend
npm run build

# 2. Copy build files to Django static directory
cp -r dist/* ../portfolio_backend/static/

# 3. Collect static files
cd ../portfolio_backend
python manage.py collectstatic --noinput

# 4. Run migrations
python manage.py migrate

# 5. Start production server
gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:$PORT
```

## 📊 Content Management

### Accessing Django Admin

1. Navigate to `https://your-deployment-url/admin/`
2. Login with your superuser credentials
3. Manage your portfolio content:
   - **Profile**: Personal information and bio
   - **Skills**: Technical skills with proficiency levels
   - **Experience**: Work history and achievements
   - **Projects**: Portfolio projects with descriptions
   - **Education**: Academic background and certifications
   - **Contact Messages**: View messages from your contact form

### Updating Content

To update your portfolio content:

1. Log into Django admin
2. Navigate to the appropriate section
3. Add, edit, or delete entries as needed
4. Changes will be reflected immediately on your website

## 🔧 Troubleshooting

### Common Issues

1. **Static Files Not Loading**:
   ```bash
   cd portfolio_backend
   python manage.py collectstatic --noinput
   ```

2. **Database Errors**:
   ```bash
   cd portfolio_backend
   python manage.py migrate
   ```

3. **CORS Issues**:
   - Check your `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` settings
   - Ensure frontend is making requests to the correct API URL

4. **Email Not Working**:
   - Verify email configuration in `.env`
   - Use Gmail App Passwords for Gmail SMTP

### Logs and Debugging

- Check Replit console for error messages
- Django logs are written to `portfolio_backend/portfolio_backend.log`
- Enable debug mode temporarily by setting `DEBUG=True` (remember to disable for production)

## 🚀 Performance Optimization

### Frontend Optimization

- Static assets are automatically minified and compressed
- Images are lazy-loaded for better performance
- Code splitting is implemented for faster initial loads

### Backend Optimization

- Database queries are optimized with `select_related` and `prefetch_related`
- API responses are cached where appropriate
- Static files are served efficiently with WhiteNoise

## 🔒 Security Checklist

- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` configured
- [ ] `ALLOWED_HOSTS` properly configured
- [ ] HTTPS enabled (automatically by Replit)
- [ ] Admin panel secured with strong credentials
- [ ] Environment variables properly set
- [ ] CORS configured correctly

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the logs in the Replit console
3. Ensure all environment variables are properly configured
4. Make sure both frontend and backend are running correctly

Your portfolio should now be fully functional and accessible at your Replit deployment URL!
