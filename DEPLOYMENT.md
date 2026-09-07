# Deployment Guide — Aegean Applications Website

**Status:** Ready for deployment  
**Build:** Complete  
**Static Export:** `out/` directory

---

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- A Vercel account (free tier works perfectly)
- Git repository access

### Steps

1. **Push to Git Repository**
   ```bash
   # If not already pushed
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel auto-detects Next.js configuration
   - Click "Deploy"

3. **Configure Domain**
   - In Vercel project settings → Domains
   - Add your custom domain (e.g., `autonomous.build`)
   - Follow Vercel's DNS instructions
   - SSL is automatic

### Vercel Auto-Configuration
Vercel automatically detects:
- Next.js framework
- Build command: `npm run build`
- Output directory: `out/`
- Node.js version

No additional configuration needed!

---

## 🌐 Alternative: Deploy to Netlify

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out/` directory
   - Or connect your Git repo:
     - Build command: `npm run build`
     - Publish directory: `out`

3. **Add domain** in Netlify settings

---

## 📦 Alternative: Deploy to Cloudflare Pages

1. **Connect Git repository** on Cloudflare Pages
2. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: 18 or higher
3. **Deploy** — automatic SSL + global CDN

---

## 🗂️ Alternative: Deploy to Static Host

The `out/` directory is a complete static site. Upload it to:

### AWS S3 + CloudFront
```bash
aws s3 sync out/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### GitHub Pages
```bash
# In repository settings, enable GitHub Pages
# Point it to the `gh-pages` branch
npm install -g gh-pages
gh-pages -d out
```

### Traditional Web Host
- FTP/SFTP the contents of `out/` to your web root
- Ensure trailing slashes work (e.g., `/about/` → `/about/index.html`)

---

## 🔧 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Check WebGL shader on hero (should be mouse-reactive)
- [ ] Test all navigation links
- [ ] Verify email link works (`mailto:zemnaph@gmail.com`)
- [ ] Run Lighthouse audit (target ≥ 95 on all metrics)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Confirm SSL certificate is active
- [ ] Set up analytics if desired (Vercel Analytics or Google Analytics)

---

## 📊 Performance Monitoring

### Vercel Analytics (Free Tier)
- Automatic with Vercel deployment
- Real user metrics
- Core Web Vitals tracking

### Google Analytics (Optional)
Add to `src/app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## 🔄 Continuous Deployment

If using Vercel/Netlify/Cloudflare Pages with Git:
1. Push changes to `main` branch
2. Automatic build + deploy triggers
3. Live in ~2 minutes

No manual rebuild/upload needed!

---

## 🐛 Troubleshooting

### Issue: "404 on sub-pages"
**Solution:** Ensure your host supports trailing slashes or configure redirects:
- Vercel: Automatic (Next.js knows how to handle this)
- Netlify: Add `_redirects` file with `/* /index.html 200`
- Apache: Use `.htaccess` with `RewriteRule`

### Issue: "Shader not loading"
**Solution:** 
- Check browser console for WebGL errors
- Ensure browser supports WebGL (most modern browsers do)
- Fallback static grain will display if WebGL unavailable

### Issue: "Fonts not loading"
**Solution:**
- Fonts load from Google Fonts (external)
- Ensure CDN is not blocked
- Fallback to system fonts automatically

---

## 📧 Support

For deployment assistance: **zemnaph@gmail.com**

---

**Deploy once. Update continuously. Built with agents.**
