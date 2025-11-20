# Admin Panel Guide

## Creating an Admin User

### Method 1: Using the Script (Recommended)

1. **Run the create admin script:**
   ```bash
   node scripts/create-admin.js
   ```

2. **Default admin credentials:**
   - Email: `admin@doctorportfolio.com`
   - Password: `admin123456`

3. **To customize admin credentials:**
   ```bash
   ADMIN_EMAIL=your-email@example.com ADMIN_PASSWORD=your-secure-password node scripts/create-admin.js
   ```

### Method 2: Manual Registration + Database Update

1. **Register a regular account:**
   - Go to `http://localhost:3000/register`
   - Create an account with your email and password
   - Note down the email you used

2. **Update user role in MongoDB:**
   - Connect to your MongoDB database (using MongoDB Compass or MongoDB Shell)
   - Navigate to the `doctor-portfolio` database
   - Go to the `users` collection
   - Find the user document with your email
   - Update the `role` field from `"patient"` to `"admin"`
   - Save the changes

   **MongoDB Shell Command:**
   ```javascript
   use doctor-portfolio
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Method 3: Using MongoDB Atlas Dashboard

1. Log into MongoDB Atlas
2. Navigate to your cluster
3. Click "Browse Collections"
4. Select `doctor-portfolio` database → `users` collection
5. Find your user document
6. Click "Edit Document"
7. Change `role` from `"patient"` to `"admin"`
8. Click "Update"

## Accessing the Admin Panel

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the login page:**
   ```
   http://localhost:3000/login
   ```

3. **Login with your admin credentials**

4. **You'll be automatically redirected to:**
   ```
   http://localhost:3000/dashboard
   ```

## Admin Panel Navigation

### Dashboard Overview
**URL:** `/dashboard`

The main dashboard provides:
- **Statistics Cards:**
  - Total Appointments
  - Pending Appointments
  - Confirmed Appointments
  - Total Patients
- **Recent Appointments Table:**
  - Latest 10 appointments with patient details
  - Quick status overview

### Appointments Management
**URL:** `/dashboard/appointments`

**Features:**
- View all appointments in a table format
- **Filter by:**
  - Status (Pending, Confirmed, Completed, Cancelled)
  - Date
- **Actions:**
  - Confirm pending appointments
  - Cancel appointments
  - Mark appointments as completed
  - View appointment details

**Appointment Statuses:**
- **Pending:** Newly booked, awaiting confirmation
- **Confirmed:** Appointment confirmed by admin
- **Completed:** Appointment has been completed
- **Cancelled:** Appointment cancelled

### Patients Management
**URL:** `/dashboard/patients`

**Features:**
- View all registered patients
- **Search by:**
  - Patient name
  - Email address
  - Phone number
- **Patient Details:**
  - Click "View Details" to see full patient information
  - View patient's complete profile
  - Medical history (if added)
  - Contact information

### Schedule Management
**URL:** `/dashboard/schedule`

**Features:**
- Set weekly schedule for each day
- **Configure:**
  - Available days (Sunday - Saturday)
  - Start and end times
  - Available/Unavailable status
  - Time slot durations
- **Manage:**
  - Recurring weekly schedule
  - Holiday blocks
  - Special date overrides

**How to set up schedule:**
1. Click "Edit" on the day you want to configure
2. Set start time and end time
3. Toggle "Available on this day" if the day should be open
4. Click "Save"

### Settings
**URL:** `/dashboard/settings`

Currently a placeholder for future profile and account settings.

## Admin Panel Layout

### Sidebar Navigation
The admin panel has a fixed sidebar with:
- **Dashboard** - Main overview
- **Appointments** - Manage appointments
- **Patients** - Patient database
- **Schedule** - Time table management
- **Settings** - Account settings
- **Logout** - Sign out

### Top Bar
- Mobile menu toggle (on mobile devices)
- Welcome message with your email
- Quick access to all sections

### Mobile Responsive
The admin panel is fully responsive:
- **Desktop:** Sidebar always visible
- **Mobile/Tablet:** Collapsible sidebar with hamburger menu

## Key Features

### 1. Appointment Management
- View all appointments in one place
- Filter and search functionality
- Quick status updates
- Patient information at a glance

### 2. Patient Database
- Complete patient registry
- Search and filter patients
- View detailed patient information
- Track patient history

### 3. Schedule Control
- Full control over availability
- Easy weekly schedule setup
- Block holidays or special dates
- Manage time slots

### 4. Real-time Statistics
- Live dashboard metrics
- Quick overview of practice status
- Recent activity feed

## Security Notes

⚠️ **Important Security Practices:**

1. **Change Default Password:**
   - After first login, change the admin password
   - Use a strong, unique password

2. **Protect Admin Credentials:**
   - Never share admin credentials
   - Use environment variables for production

3. **Session Management:**
   - Logout when done
   - Sessions expire after token expiration

4. **Production Setup:**
   - Use secure JWT secrets
   - Enable HTTPS
   - Set up proper environment variables

## Troubleshooting

### Can't Access Admin Panel?
1. **Check if you're logged in:**
   - Make sure you're logged in with an admin account

2. **Verify user role:**
   - Check MongoDB that your user has `role: "admin"`

3. **Check browser console:**
   - Open browser DevTools (F12)
   - Check for any errors in Console tab

4. **Clear browser storage:**
   - Clear localStorage
   - Logout and login again

### Admin Panel Not Loading?
1. **Check server is running:**
   ```bash
   npm run dev
   ```

2. **Check API routes:**
   - Verify MongoDB connection
   - Check `.env.local` file has correct `MONGODB_URI`

3. **Check network tab:**
   - Open DevTools → Network tab
   - Look for failed API requests

## Quick Reference

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/dashboard` | Overview & statistics |
| Appointments | `/dashboard/appointments` | Manage appointments |
| Patients | `/dashboard/patients` | Patient database |
| Schedule | `/dashboard/schedule` | Time table setup |
| Settings | `/dashboard/settings` | Account settings |
| Login | `/login` | Admin login |
| Logout | (Button in sidebar) | Sign out |

## Next Steps

After creating your admin account:

1. ✅ Login to admin panel
2. ✅ Set up your weekly schedule
3. ✅ Review any existing appointments
4. ✅ Check patient database
5. ✅ Customize settings (when available)

For questions or issues, check the API routes in `app/api/` directory or refer to the main README.md file.

