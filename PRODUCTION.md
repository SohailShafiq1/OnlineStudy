# Production Deployment Guide

## 🚀 Quick Start

Your application is configured with:
- **Frontend**: https://studywithmaryam.online/
- **Backend**: https://study-backend-production.up.railway.app
- **Database**: MongoDB Atlas

## ✅ Production Checklist

### Backend (Railway)

1. **Environment Variables** (Set in Railway Dashboard):
   ```
   MONGODB_URI=mongodb+srv://sohailshafiq002_db_user:sqRlLLaLdIc1dQAo@cluster0.gqcbit0.mongodb.net/study-with-maryam?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   NODE_ENV=production
   ```

2. **Deploy Backend**:
   ```bash
   cd backend
   git add .
   git commit -m "Production ready"
   git push
   ```
   Railway will auto-deploy from your repository.

3. **Verify Backend**:
   - Visit: https://study-backend-production.up.railway.app/health
   - Should return: `{"status": "OK", "message": "Server is running", ...}`

### Frontend (Your Host)

1. **Environment Variables**:
   Create `.env` file in root:
   ```
   VITE_BACKEND_URL=https://study-backend-production.up.railway.app/api
   ```

2. **Build Frontend**:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy**:
   Upload the `dist` folder contents to your hosting provider.

4. **Configure URL Rewriting** (for React Router):
   
   **For Netlify** - Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

   **For Vercel** - Create `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```

   **For Apache** - Create `.htaccess` in root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 🔍 Testing Production

### Test Backend:
```bash
# Health check
curl https://study-backend-production.up.railway.app/health

# Get classes
curl https://study-backend-production.up.railway.app/api/classes

# Get subjects
curl https://study-backend-production.up.railway.app/api/subjects
```

### Test Frontend:
1. Visit https://studywithmaryam.online/
2. Check browser console for errors
3. Test navigation between pages
4. Test admin features (if applicable)

## 🛠️ Common Issues & Solutions

### Issue: CORS Error
**Symptom**: Browser console shows CORS policy error
**Solution**: Verify frontend URL is in backend CORS whitelist (server.js)

### Issue: 502 Bad Gateway
**Symptom**: Backend returns 502 error
**Solution**: 
- Check Railway logs for errors
- Verify MongoDB connection string
- Ensure PORT is set correctly

### Issue: 404 on Page Refresh
**Symptom**: Direct URLs work, but refresh gives 404
**Solution**: Configure URL rewriting (see above)

### Issue: Environment Variables Not Working
**Symptom**: App uses localhost URLs in production
**Solution**: 
- Rebuild frontend after changing .env
- Vite requires `VITE_` prefix for environment variables
- Restart backend after changing .env

## 📊 Monitoring

### Backend Health:
```bash
curl https://study-backend-production.up.railway.app/health
```

### Check Logs:
- Railway: Dashboard > Project > Deployments > View Logs
- Frontend: Browser Developer Tools > Console

## 🔐 Security Notes

1. **Never commit .env files** - Already in .gitignore
2. **Rotate credentials** if accidentally exposed
3. **Use HTTPS** for all production URLs
4. **Keep dependencies updated**: `npm audit fix`

## 🚀 Quick Deploy Commands

### Deploy Backend Changes:
```bash
cd backend
git add .
git commit -m "Update backend"
git push
```

### Deploy Frontend Changes:
```bash
npm run build
# Upload dist/ folder to hosting
```

## 📞 Support

If issues persist:
1. Check Railway deployment logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test API endpoints individually

## 🎉 Success Indicators

✅ Backend health check returns OK  
✅ Frontend loads without console errors  
✅ Data fetches from backend successfully  
✅ All routes work (no 404s on refresh)  
✅ File uploads work (if applicable)  
✅ MongoDB connection stable  

---

**Last Updated**: December 26, 2025
