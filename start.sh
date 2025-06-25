
#!/bin/bash

echo "=== Starting Production Portfolio Application ==="

# Set production environment
export NODE_ENV=production
export DJANGO_SETTINGS_MODULE=portfolio_backend.settings

# Function to kill existing processes
cleanup() {
    echo "Stopping servers..."
    pkill -f "python.*manage.py.*runserver" 2>/dev/null || true
    pkill -f "npm.*dev" 2>/dev/null || true
    pkill -f "node.*vite" 2>/dev/null || true
    pkill -f "gunicorn" 2>/dev/null || true
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

echo "=== Setting up Backend ==="
cd portfolio_backend

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Database operations
echo "Running database migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

# Collect static files for production
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Create media directories if they don't exist
mkdir -p media/profile media/projects

# Copy profile image if it exists
if [ -f "../attached_assets/IMG_6182.JPG~2_1750824423422.jpg" ]; then
    cp "../attached_assets/IMG_6182.JPG~2_1750824423422.jpg" "media/profile/jeffery_profile.jpg"
    echo "Profile image copied successfully"
fi

# Seed database with production data
echo "Setting up portfolio data..."
python manage.py seed_data

# Create superuser for admin (if not exists)
echo "Creating admin user..."
python manage.py shell << EOF
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@portfolio.com', 'admin123')
    print('Admin user created: admin/admin123')
else:
    print('Admin user already exists')
EOF

# Start Django server for production
echo "Starting Django production server on 0.0.0.0:8000..."
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

echo "=== Setting up Frontend ==="
cd ../portfolio_frontend

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm ci --production

# Build for production
echo "Building frontend for production..."
npm run build

# Start frontend server
echo "Starting frontend production server on 0.0.0.0:3000..."
npm run preview &
FRONTEND_PID=$!

# Wait for servers to start
sleep 5

echo "=== Production Portfolio Application Started ==="
echo ""
echo "🚀 Application URLs:"
echo "   Frontend: http://0.0.0.0:3000"
echo "   Backend API: http://0.0.0.0:8000/api"
echo "   Admin Dashboard: http://0.0.0.0:8000/admin"
echo ""
echo "🔐 Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📊 API Endpoints:"
echo "   Profile: http://0.0.0.0:8000/api/profile/"
echo "   Skills: http://0.0.0.0:8000/api/skills/"
echo "   Projects: http://0.0.0.0:8000/api/projects/"
echo "   Contact: http://0.0.0.0:8000/api/contact/"
echo "   Stats: http://0.0.0.0:8000/api/stats/"
echo "   Health: http://0.0.0.0:8000/api/health/"
echo ""
echo "💡 Features:"
echo "   ✅ Enhanced Admin Dashboard with Modern UI/UX"
echo "   ✅ Production-Optimized Frontend Build"
echo "   ✅ API Caching & Performance Optimization"
echo "   ✅ Email Contact Form Integration"
echo "   ✅ Responsive Design & Animations"
echo "   ✅ Error Handling & Logging"
echo "   ✅ Security Headers & CORS Protection"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID
