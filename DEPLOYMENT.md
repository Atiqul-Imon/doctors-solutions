# Vercel Deployment Guide

This guide will help you deploy the Doctor Portfolio & Management System to Vercel.

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier works)
- MongoDB Atlas account (or MongoDB connection string)

## Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel**: Visit [https://vercel.com](https://vercel.com) and sign in with your GitHub account

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository (`Atiqul-Imon/doctors-solutions`)
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run prebuild && npm run build` (already in package.json)
   - **Output Directory**: `.next` (default for Next.js)
   - **Install Command**: `npm install`

4. **Environment Variables**:
   Add the following environment variables in the Vercel dashboard:
   
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_strong_secret_key_here
   JWT_REFRESH_SECRET=your_strong_refresh_secret_key_here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   NODE_ENV=production
   ```
   
   **Important**: 
   - Use strong, random strings for `JWT_SECRET` and `JWT_REFRESH_SECRET`
   - Never commit these secrets to GitHub
   - Generate secure secrets using: `openssl rand -base64 32`

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

4. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add JWT_REFRESH_SECRET
   vercel env add JWT_EXPIRES_IN
   vercel env add JWT_REFRESH_EXPIRES_IN
   vercel env add NODE_ENV
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure MongoDB Atlas (if using)

1. **Whitelist Vercel IPs**:
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add Vercel's IP ranges)
   - Save

2. **Get Connection String**:
   - Go to MongoDB Atlas → Database Access
   - Create a database user if needed
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add it to Vercel environment variables as `MONGODB_URI`

## Step 4: Create Admin User

After deployment, you need to create an admin user. You have two options:

### Option A: Using Vercel CLI (Recommended)

1. **Run the create-admin script locally** (it will connect to production DB):
   ```bash
   MONGODB_URI=your_production_mongodb_uri npm run create-admin
   ```

### Option B: Using MongoDB Atlas Console

1. **Connect to MongoDB**:
   - Use MongoDB Compass or MongoDB Atlas shell
   - Connect to your database

2. **Create Admin User**:
   ```javascript
   use doctor-portfolio
   
   db.users.insertOne({
     email: "admin@example.com",
     password: "$2a$10$hashedPasswordHere", // Use bcrypt to hash your password
     role: "admin",
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

   To hash password, use Node.js:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hashed = bcrypt.hashSync('your-password', 10);
   console.log(hashed);
   ```

## Step 5: Verify Deployment

1. **Visit your deployed site**: `https://your-project-name.vercel.app`

2. **Test the following**:
   - ✅ Homepage loads
   - ✅ Admin login works
   - ✅ Database connection works
   - ✅ Appointments can be created
   - ✅ Patients can be added
   - ✅ Prescriptions can be generated and printed

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Yes | Secret for access tokens | Generate with `openssl rand -base64 32` |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens | Generate with `openssl rand -base64 32` |
| `JWT_EXPIRES_IN` | No | Access token expiration | `15m` (default) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token expiration | `7d` (default) |
| `NODE_ENV` | No | Node environment | `production` (auto-set by Vercel) |

## Troubleshooting

### Build Fails

1. **Check Build Logs**:
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on failed deployment → View Build Logs

2. **Common Issues**:
   - **Missing environment variables**: Make sure all required env vars are set
   - **Build timeout**: Check if `prebuild` script is taking too long
   - **Type errors**: Run `npm run build` locally first to catch errors

### Database Connection Issues

1. **Check MongoDB Atlas**:
   - Ensure IP whitelist includes Vercel IPs (or allow all)
   - Verify connection string is correct
   - Check database user has proper permissions

2. **Test Connection**:
   ```bash
   # Test MongoDB connection
   node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(e => console.error(e))"
   ```

### PDF Generation Not Working

1. **Check Font Files**:
   - Ensure `prebuild` script runs (copies PDFKit fonts)
   - Check `public/fonts/pdfkit/` directory exists
   - Verify fonts are in Vercel build

2. **Serverless Function Limits**:
   - PDF generation might hit timeout limits
   - Consider increasing function timeout in Vercel settings

### Runtime Errors

1. **Check Function Logs**:
   - Vercel Dashboard → Functions → View Logs

2. **Common Issues**:
   - **Module not found**: Check if all dependencies are in `package.json`
   - **Environment variable not found**: Verify env vars are set correctly
   - **CORS issues**: Next.js handles CORS automatically

## Custom Domain (Optional)

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables** (if needed):
   - Some features might need the domain URL
   - Add `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

## Performance Optimization

Vercel automatically optimizes Next.js apps, but you can:

1. **Enable Edge Functions** (if applicable):
   - For API routes that don't need Node.js
   - Add `export const runtime = 'edge'` to API route

2. **Optimize Images**:
   - Use Next.js Image component (already in use)
   - Vercel automatically optimizes images

3. **Enable Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics (free tier available)

## Monitoring

1. **Vercel Analytics**:
   - Built-in analytics for page views
   - Enable in Project Settings

2. **Function Logs**:
   - Monitor API route performance
   - Check for errors in real-time

3. **Error Tracking**:
   - Consider adding Sentry or similar service
   - Monitor production errors

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch automatically deploys
- Preview deployments for pull requests
- Rollback to previous deployments if needed

## Security Checklist

- ✅ Strong JWT secrets (32+ characters, random)
- ✅ MongoDB connection string secured
- ✅ Environment variables not in code
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ CORS configured (handled by Next.js)
- ✅ Input validation on API routes
- ✅ Authentication on protected routes

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

**Note**: After deployment, update your MongoDB Atlas IP whitelist to include Vercel's IP addresses or allow access from anywhere (0.0.0.0/0) for simplicity during development.

