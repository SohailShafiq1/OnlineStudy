# 🌐 Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd study-with-maryam
vercel
```

**Or use Vercel Dashboard:**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite
5. Click "Deploy"

### 2. Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Go to https://netlify.com
2. Drag and drop the `dist` folder
3. Done!

### 3. GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/study-with-maryam",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/study-with-maryam/'
})
```

4. Deploy:
```bash
npm run deploy
```

### 4. Traditional Web Hosting (cPanel, etc.)

1. Build the project:
```bash
npm run build
```

2. Upload the contents of the `dist` folder to your hosting:
   - Via FTP/SFTP
   - Via cPanel File Manager
   - Via hosting control panel

3. Configure `.htaccess` for React Router:
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

## Environment Variables (if needed)

Create `.env` file:
```
VITE_API_URL=your-api-url
VITE_SITE_URL=your-site-url
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Pre-Deployment Checklist

- [ ] Update contact information in Footer.jsx
- [ ] Add real content and remove sample data
- [ ] Test all routes and links
- [ ] Add proper meta tags for SEO
- [ ] Optimize images and assets
- [ ] Test on mobile devices
- [ ] Configure custom domain (if needed)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test PDF downloads
- [ ] Verify all forms work correctly

## Post-Deployment

1. **Test the live site thoroughly**
2. **Submit to Google Search Console**
3. **Set up monitoring (Uptime, errors)**
4. **Share on social media**
5. **Gather user feedback**

## Custom Domain Setup

### On Vercel:
1. Go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### On Netlify:
1. Go to Site Settings
2. Click "Domain Management"
3. Add custom domain
4. Follow DNS configuration steps

## Performance Optimization

1. **Enable caching** on hosting
2. **Use CDN** for static assets
3. **Compress images** before uploading
4. **Enable Gzip/Brotli** compression
5. **Lazy load** images and components

## Monitoring & Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Continuous Deployment

### With Vercel/Netlify + GitHub:
1. Push code to GitHub
2. Automatic deployment on every push
3. Preview deployments for pull requests

## Troubleshooting Deployment

**Issue**: Blank page after deployment
**Solution**: Check base URL in vite.config.js

**Issue**: 404 on refresh
**Solution**: Configure routing on server (add .htaccess or _redirects)

**Issue**: Assets not loading
**Solution**: Check asset paths and base URL

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/static-deploy.html

---

**Your site is ready to go live! 🚀**
