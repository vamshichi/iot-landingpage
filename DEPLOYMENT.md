# Deployment Guide - IoT Security Summit Website

## Deployment Platforms

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel?**
- Optimized for Next.js
- Automatic deployments on git push
- Free tier available
- Built-in edge functions and caching
- 99.9% uptime SLA

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
```bash
npm i -g vercel
vercel
```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env.local`:
     - SMTP_HOST
     - SMTP_PORT
     - SMTP_SECURE
     - SMTP_USER
     - SMTP_PASSWORD
     - SMTP_FROM_EMAIL
     - CONTACT_EMAIL

4. **Deploy**
```bash
vercel --prod
```

5. **Connect Domain**
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records (auto-configured by Vercel)

### Option 2: Netlify

**Steps:**

1. **Connect GitHub to Netlify**
   - Visit https://app.netlify.com
   - Click "New site from Git"
   - Connect GitHub account
   - Select repository

2. **Build Configuration**
   - Build command: `pnpm build`
   - Publish directory: `.next`

3. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add all SMTP variables from `.env.local`

4. **Deploy**
   - Automatic on git push to main

### Option 3: Self-Hosted (AWS EC2, DigitalOcean, Linode)

**Build Requirements:**
- Node.js 18+ 
- 512MB RAM minimum (1GB+ recommended)
- 2GB storage minimum

**Steps:**

```bash
# 1. Connect to your server
ssh root@your-server-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install pnpm
npm install -g pnpm

# 4. Clone repository
git clone <your-repo-url>
cd iot-summit-website

# 5. Install dependencies
pnpm install

# 6. Create .env.local with production values
nano .env.local
# Add SMTP and other environment variables

# 7. Build the application
pnpm build

# 8. Start with PM2 (process manager)
npm i -g pm2
pm2 start "pnpm start" --name "iot-summit"
pm2 startup
pm2 save

# 9. Setup Nginx reverse proxy
# See Nginx configuration section below
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name iotsummit.ae www.iotsummit.ae;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable HTTPS with Let's Encrypt:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d iotsummit.ae -d www.iotsummit.ae
```

### Option 4: Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "start"]
```

**Build & Run:**

```bash
# Build Docker image
docker build -t iot-summit:latest .

# Run container with environment variables
docker run -d \
  -p 80:3000 \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-email@gmail.com \
  -e SMTP_PASSWORD=your-app-password \
  -e SMTP_FROM_EMAIL="IoT Summit <noreply@iotsummit.ae>" \
  -e CONTACT_EMAIL=info@iotsummit.ae \
  --name iot-summit \
  iot-summit:latest
```

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables configured
- [ ] SMTP credentials tested locally
- [ ] Custom domain registered and DNS configured
- [ ] SSL certificate ready (auto-handled by Vercel/Netlify)
- [ ] Contact email is monitored
- [ ] Homepage loads without errors
- [ ] Forms work end-to-end
- [ ] Emails send successfully
- [ ] Mobile responsive design verified
- [ ] All sections have accurate content
- [ ] Social media links configured
- [ ] Analytics tracking enabled (optional)
- [ ] Favicon uploaded
- [ ] Meta tags are accurate
- [ ] Performance tested with Lighthouse
- [ ] Security headers configured

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Optimize images to <100KB each
- Use WebP format when possible

### Caching Strategy
- Static pages: 1 year cache
- API responses: 60 seconds cache
- Images: 30 days cache

### Security Headers
Configure in `next.config.mjs`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

## Monitoring & Analytics

### Google Analytics
1. Create Google Analytics property
2. Get tracking ID (GA_ID)
3. Add to `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Performance Monitoring
- Use Vercel Analytics (automatic)
- Monitor with: Web Vitals, Page Load Time, Error Rate
- Set up alerts for critical metrics

### Email Monitoring
- Monitor bounce rate
- Check spam filter folder regularly
- Log all form submissions

## Troubleshooting

### Emails Not Sending in Production
1. Verify SMTP credentials in dashboard
2. Check email provider rate limits
3. Ensure firewall allows port 587/465
4. Review server logs for errors

### High CPU Usage
1. Increase server resources
2. Enable caching headers
3. Optimize images
4. Use CDN for static assets

### Database/Google Sheets Errors
1. Verify API credentials
2. Check quota limits
3. Ensure sheets have write permissions
4. Review API errors in logs

## Post-Deployment

### Monitor Performance
- Check error rates daily
- Monitor form submissions
- Review email delivery
- Track user analytics

### Regular Maintenance
- Update dependencies monthly
- Monitor security vulnerabilities
- Back up form data regularly
- Update event information as needed

### Scaling (When Needed)
- Add CDN for static content
- Implement caching layer
- Use serverless database
- Load testing with tools like Artillery or k6

## Cost Estimates

| Platform | Monthly Cost |
|----------|-------------|
| Vercel (Pro) | $20 |
| Netlify (Pro) | $19 |
| AWS EC2 (t2.micro) | $10-15 |
| Self-hosted VPS | $5-20 |

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Docker Hub**: https://hub.docker.com
- **Let's Encrypt**: https://letsencrypt.org

---

Ready to deploy? Start with Option 1 (Vercel) for quickest setup!
