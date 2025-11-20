# Doctor Portfolio & Management System

A comprehensive, industry-standard portfolio website and management system for doctors built with Next.js 15, MongoDB, and TypeScript.

## 🚀 Features

### Public Portfolio Website
- **Professional Homepage** - Modern, responsive design with hero section, features, and services
- **About Page** - Doctor biography, qualifications, specializations, and achievements
- **Services Page** - Detailed medical services with descriptions
- **Contact Page** - Contact information and appointment booking form
- **Appointment Booking** - Public appointment booking system with time slot selection

### Admin Dashboard
- **Dashboard Overview** - Statistics, recent appointments, and quick insights
- **Patient Management** - Complete patient database with:
  - Personal information (name, contact, address)
  - Medical history tracking
  - Allergies management
  - Current medications
  - Vital signs and lab results
  - Visit notes and follow-ups
  - Family history
  - Insurance information
- **Appointment Management** - View, manage, and schedule appointments
- **Schedule Management** - Configure doctor's availability and time slots
- **Prescription Management** - Digital prescriptions with:
  - Auto-generated prescription numbers (PRS-YYYY-MM-XXXXX)
  - Medication tracking
  - Prescription templates
  - PDF generation and printing
  - Renewal system
- **Prescription Templates** - Save and reuse common medication combinations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Access & Refresh Tokens)
- **Styling**: Tailwind CSS
- **PDF Generation**: PDFKit
- **UI Components**: Custom components with Lucide React icons

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account or local MongoDB instance
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Atiqul-Imon/doctors-solutions.git
   cd doctors-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   ```

4. **Create admin user**
   ```bash
   npm run create-admin
   ```
   Follow the prompts to create your first admin account.

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 Documentation

- **[Setup Guide](./SETUP.md)** - Detailed setup instructions
- **[Admin Guide](./ADMIN_GUIDE.md)** - How to use the admin panel
- **[Patient Management Guide](./PATIENT_MANAGEMENT_GUIDE.md)** - Patient data management features
- **[Prescription Management Guide](./PRESCRIPTION_MANAGEMENT_GUIDE.md)** - Prescription system documentation
- **[Feature Recommendations](./FEATURE_RECOMMENDATIONS.md)** - Future enhancement ideas
- **[Optimization Report](./OPTIMIZATION_REPORT.md)** - Performance optimizations and cost-saving measures

## 🏗️ Project Structure

```
├── app/
│   ├── (admin)/          # Admin dashboard routes
│   ├── (auth)/           # Authentication pages
│   ├── api/              # API routes
│   ├── about/            # About page
│   ├── book-appointment/ # Appointment booking
│   ├── contact/          # Contact page
│   └── services/         # Services page
├── components/
│   ├── admin/            # Admin components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── auth/             # Authentication utilities
│   ├── db/                # Database connection
│   ├── models/            # Mongoose models
│   ├── services/          # Business logic services
│   └── utils/             # Utility functions
├── public/                # Static assets
└── scripts/               # Utility scripts
```

## 🔐 Authentication

The system uses JWT-based authentication with:
- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for token renewal
- **Protected Routes**: Admin routes require authentication

## 📊 Database Models

- **User**: Admin users and authentication
- **Patient**: Complete patient records
- **Appointment**: Appointment scheduling
- **Schedule**: Doctor's availability
- **Prescription**: Digital prescriptions
- **PrescriptionTemplate**: Reusable prescription templates
- **DoctorProfile**: Doctor information (future use)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project" and import your repository
   - Add environment variables (see below)
   - Click "Deploy"

3. **Set Environment Variables in Vercel**:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Strong secret for access tokens (use `openssl rand -base64 32`)
   - `JWT_REFRESH_SECRET` - Strong secret for refresh tokens
   - `JWT_EXPIRES_IN` - Access token expiration (default: `15m`)
   - `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: `7d`)

4. **Create Admin User**:
   After deployment, run locally:
   ```bash
   MONGODB_URI=your_production_uri npm run create-admin
   ```

📖 **Detailed Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

### Build for Production (Local)

```bash
npm run build
npm start
```

### Environment Variables for Production

Required environment variables:
- `MONGODB_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret key for JWT access tokens (required)
- `JWT_REFRESH_SECRET` - Secret key for JWT refresh tokens (required)
- `JWT_EXPIRES_IN` - Access token expiration (optional, default: `15m`)
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (optional, default: `7d`)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run create-admin` - Create admin user

## 🎯 Key Features

### Patient Management
- Comprehensive patient database
- Medical history tracking
- Visit notes and follow-ups
- Medication management
- Lab results and vital signs

### Prescription System
- Auto-generated prescription numbers
- PDF generation and printing
- Prescription templates
- Renewal tracking
- Medication history

### Appointment System
- Public booking interface
- Time slot management
- Conflict detection
- Status tracking

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- MongoDB injection prevention

## 📈 Performance Optimizations

The codebase includes several performance optimizations:
- Database query optimization (aggregation pipelines)
- Composite indexes for common queries
- Search debouncing
- Response caching
- Pagination limits

See [OPTIMIZATION_REPORT.md](./OPTIMIZATION_REPORT.md) for details.

## 🤝 Contributing

This is a private project. For contributions or questions, please contact the repository owner.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Atiqul Islam**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- All open-source contributors whose packages made this possible

---

**Note**: Remember to keep your `.env.local` file secure and never commit it to version control.
