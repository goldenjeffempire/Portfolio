#!/bin/bash

echo "Starting Django backend server..."

cd portfolio_backend

# Ensure proper Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Kill existing Django processes
pkill -f "python.*manage.py runserver" 2>/dev/null || true

# Run database migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Set up initial data
echo "Setting up initial data..."
python manage.py seed_data

# Start Django server
echo "Starting Django server on 0.0.0.0:8000..."
python manage.py runserver 0.0.0.0:8000