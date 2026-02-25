# 🚀 PRODUCTION DEPLOYMENT GUIDE

## Pre-Deployment Checklist

### ✅ Backend Preparation
- [ ] Update `.env.production` with real credentials
- [ ] Change ADMIN_EMAIL and ADMIN_PASSWORD
- [ ] Set correct CLIENT_URL (your domain)
- [ ] Test all API endpoints locally
- [ ] Ensure data.json has proper permissions
- [ ] Remove console.logs from production code
- [ ] Enable HTTPS/SSL certificate

### ✅ Frontend Preparation
- [ ] Update API_BASE URL in components to production URL
- [ ] Test responsive design on all devices
- [ ] Optimize images (compress, use WebP)
- [ ] Update meta tags with real domain
- [ ] Update sitemap.xml with real domain
- [ ] Add real favicon files
- [ ] Test all forms and interactions
- [ ] Run `npm run build` successfully

### ✅ SEO Optimization
- [ ] Verify all meta tags are correct
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible
- [ ] Test Open Graph tags with Facebook Debugger
- [ ] Test Twitter Card with Twitter Card Validator
- [ ] Add Google Analytics (optional)

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client folder
cd client

# Deploy
vercel --prod
```

**Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

#### Backend on Railway:
1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Select `server` folder as root
5. Add environment variables from `.env.production`
6. Deploy

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify:
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to client folder
cd client

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`
- Add `_redirects` file for SPA routing

#### Backend on Render:
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Select `server` folder
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables

### Option 3: VPS (DigitalOcean, AWS, etc.)

#### Server Setup:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone your-repo-url
cd your-repo

# Setup backend
cd server
npm install
pm2 start server.js --name portfolio-api

# Setup frontend (build and serve with nginx)
cd ../client
npm install
npm run build

# Install nginx
sudo apt install nginx

# Configure nginx (see nginx.conf below)
```

## Environment Variables Setup

### Backend (.env):
```env
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=your-email@domain.com
ADMIN_PASSWORD=your-secure-password
CLIENT_URL=https://yourdomain.com
```

### Frontend (Update in code):
Update `API_BASE` in all components:
```javascript
const API_BASE = 'https://your-backend-url.com';
```

## Post-Deployment Steps

### 1. DNS Configuration
- Point your domain to deployment platform
- Add A record or CNAME record
- Enable SSL/HTTPS
- Wait for DNS propagation (up to 48 hours)

### 2. SSL Certificate
- Most platforms (Vercel, Netlify, Railway) provide free SSL
- For VPS: Use Let's Encrypt with Certbot

### 3. Testing
```bash
# Test backend
curl https://your-api-domain.com/health

# Test frontend
curl https://yourdomain.com

# Test API endpoints
curl https://your-api-domain.com/api/data
```

### 4. Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor error logs
- Set up alerts for downtime

### 5. Performance Optimization
- Enable Gzip compression
- Add CDN (Cloudflare)
- Optimize images
- Enable caching headers

## Nginx Configuration (for VPS)

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Frontend
    root /var/www/portfolio/client/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check CLIENT_URL in backend .env
   - Verify CORS configuration in server.js

2. **API Not Responding:**
   - Check if backend is running
   - Verify firewall rules
   - Check environment variables

3. **404 on Refresh:**
   - Add `_redirects` file for Netlify
   - Configure routing for your platform

4. **Images Not Loading:**
   - Check image paths
   - Verify public folder structure
   - Use absolute URLs for production

## Maintenance

### Regular Tasks:
- Update dependencies monthly
- Monitor error logs weekly
- Backup data.json daily
- Review security updates
- Monitor performance metrics

### Backup Strategy:
```bash
# Backup data.json
cp server/data.json backups/data-$(date +%Y%m%d).json

# Automate with cron (daily at 2 AM)
0 2 * * * cp /path/to/server/data.json /path/to/backups/data-$(date +\%Y\%m\%d).json
```

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs
- PM2 Docs: https://pm2.keymetrics.io/docs

## Final Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] API endpoints tested
- [ ] Forms working correctly
- [ ] SEO tags verified
- [ ] Sitemap submitted
- [ ] Analytics configured (optional)
- [ ] Monitoring set up
- [ ] Backup strategy in place

🎉 **Congratulations! Your portfolio is now live!**
