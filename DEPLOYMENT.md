# 🚀 Deploy Elara Jewelry to Vercel

This guide will help you deploy your Elara Jewelry full-stack application to Vercel.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com)
- [MongoDB Atlas Account](https://www.mongodb.com/atlas) (for production database)

## 🗄️ Database Setup

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Get your connection string

### 2. Update Environment Variables
Update `backend/config.env` with your production MongoDB URI:

```env
# Production MongoDB
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/elara-jewelry
```

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root of project)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install && cd frontend && npm install && cd ../backend && npm install`

4. **Environment Variables**
   Add these in Vercel:
   ```
   MONGODB_URI_PROD=your_mongodb_atlas_connection_string
   NODE_ENV=production
   JWT_SECRET=your_jwt_secret
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow prompts**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

## ⚙️ Configuration Files

### Root `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

### Frontend `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ]
}
```

## 🔧 Post-Deployment

### 1. Update API URLs
After deployment, update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api'  // Replace with your actual Vercel URL
  : 'http://localhost:5000/api';
```

### 2. Seed Production Database
```bash
# Set production environment
export NODE_ENV=production
export MONGODB_URI=your_production_mongodb_uri

# Run seeder
cd backend
npm run seed
```

### 3. Test Your App
- Visit your Vercel URL
- Test all filters and sorting
- Verify API endpoints work
- Check mobile responsiveness

## 🌐 Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update CORS**
   Update `backend/server.js` with your domain:
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://yourdomain.com', 'https://www.yourdomain.com']
     : ['http://localhost:3000', 'http://localhost:5173']
   ```

## 📱 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI_PROD` | Production MongoDB connection string | ✅ |
| `NODE_ENV` | Environment (production/development) | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `RATE_LIMIT_WINDOW_MS` | Rate limiting window (default: 900000) | ❌ |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window (default: 100) | ❌ |

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **API Not Working**
   - Verify environment variables are set
   - Check CORS configuration
   - Ensure MongoDB connection string is correct

3. **Database Connection Issues**
   - Verify MongoDB Atlas network access
   - Check database user permissions
   - Ensure connection string format is correct

### Debug Commands

```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy
vercel --prod
```

## 🎉 Success!

Your Elara Jewelry app is now live on Vercel with:
- ✅ Full-stack deployment
- ✅ Working filters and sorting
- ✅ Responsive design
- ✅ Production database
- ✅ API endpoints
- ✅ Real-time product data

## 🔄 Updates

To update your deployed app:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically redeploys
4. Or manually trigger: `vercel --prod`

---

**Happy Deploying! 🚀✨**
