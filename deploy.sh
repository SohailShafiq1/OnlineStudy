#!/bin/bash

# Production Deployment Script for Study with Maryam

echo "🚀 Starting Production Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Run this script from the project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment Checklist:${NC}"
echo "1. ✓ Backend URL configured: https://study-backend-production.up.railway.app"
echo "2. ✓ Frontend URL configured: https://studywithmaryam.online/"
echo "3. ✓ MongoDB connected: Cluster0"
echo ""

# Build frontend
echo -e "${YELLOW}📦 Building frontend...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend dependencies installation failed${NC}"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend built successfully!${NC}"
echo -e "${GREEN}📁 Build files are in: ./dist/${NC}"
echo ""

# Instructions
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo ""
echo "FRONTEND DEPLOYMENT:"
echo "1. Upload contents of 'dist' folder to your hosting (studywithmaryam.online)"
echo "2. Ensure .htaccess or redirects are configured for React Router"
echo ""
echo "BACKEND DEPLOYMENT:"
echo "1. Commit and push backend changes:"
echo "   cd backend"
echo "   git add ."
echo "   git commit -m 'Production ready'"
echo "   git push"
echo ""
echo "2. Verify backend health:"
echo "   curl https://study-backend-production.up.railway.app/health"
echo ""
echo "VERIFICATION:"
echo "• Frontend: https://studywithmaryam.online/"
echo "• Backend Health: https://study-backend-production.up.railway.app/health"
echo "• Backend API: https://study-backend-production.up.railway.app/api/"
echo ""
echo -e "${GREEN}✨ Build complete! Ready for deployment!${NC}"
