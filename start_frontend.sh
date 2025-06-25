
#!/bin/bash

echo "Starting React frontend server..."

cd portfolio_frontend

# Kill existing Node.js processes
pkill -f "npm.*dev" 2>/dev/null || true

# Install dependencies
echo "Installing dependencies..."
npm install

# Start frontend server
echo "Starting frontend server on 0.0.0.0:3000..."
npm run dev
