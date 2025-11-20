# Environment Variables Template for Vercel

Copy these environment variables to your Vercel project settings.

## Required Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production-generate-with-openssl-rand-base64-32
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-generate-with-openssl-rand-base64-32
```

## Optional Environment Variables

```env
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=production
```

## How to Add to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter the variable name and value
5. Select the environment(s) where it applies (Production, Preview, Development)
6. Click **Save**

## Generate Secure Secrets

For `JWT_SECRET` and `JWT_REFRESH_SECRET`, generate secure random strings:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Or using Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Important Notes

⚠️ **Never commit these values to Git!**
- All `.env*` files are in `.gitignore`
- Use Vercel's environment variable settings only
- Keep your secrets secure and rotate them periodically

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for Vercel or add Vercel IPs)
5. Get connection string and replace `<password>` with your actual password

