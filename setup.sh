#!/bin/bash

echo "🚀 Setting up Study with Maryam - Full Stack Application"
echo "======================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version 14 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed."
fi

# Check if MongoDB is running (local)
if command -v mongod &> /dev/null; then
    if ! pgrep -x "mongod" > /dev/null; then
        echo "⚠️  MongoDB is not running. Please start MongoDB:"
        echo "   brew services start mongodb-community"
        echo "   Or use MongoDB Atlas and update backend/.env"
    else
        echo "✅ MongoDB is running"
    fi
else
    echo "⚠️  MongoDB not found locally. Make sure to configure MongoDB Atlas in backend/.env"
fi

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB (if using local): brew services start mongodb-community"
echo "2. Start Backend: cd backend && npm run dev"
echo "3. Start Frontend (new terminal): npm run dev"
echo ""
echo "Access the application:"
echo "- Frontend: http://localhost:5173"
echo "- Admin Panel: http://localhost:5173/admin"
echo "- Backend API: http://localhost:5000"