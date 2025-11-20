# Quick Setup Guide

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection (MongoDB Atlas)
MONGODB_URI=mongodb+srv://imonatikulislam_db_user:zjfOL8FMRFwgNBB5@cluster0.a63symz.mongodb.net/doctor-portfolio?retryWrites=true&w=majority

# JWT Secrets (IMPORTANT: Change these in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars

# JWT Expiration
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Next.js
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env.local` file:**
   ```bash
   # Copy the content above into .env.local
   nano .env.local
   # or use your preferred text editor
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Creating an Admin User

After starting the server:

1. Go to `/register` and create an account
2. Note the email you used
3. Connect to MongoDB and update the user role:
   ```javascript
   // In MongoDB Compass or MongoDB Shell
   use doctor-portfolio
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
4. Login at `/login` - you'll now have admin access

## MongoDB Atlas Connection

Your MongoDB Atlas connection string is already configured in the example above. The database name is set to `doctor-portfolio`. The application will automatically create collections when you start using the models.

## Troubleshooting

### Connection Issues
- Ensure MongoDB Atlas allows connections from your IP (Network Access in Atlas)
- Check that the connection string is correct
- Verify the database name in the connection string

### Authentication Issues
- Make sure JWT_SECRET and JWT_REFRESH_SECRET are set
- Clear browser localStorage if you're having login issues

### Port Already in Use
- Change the port: `npm run dev -- -p 3001`

