/**
 * Script to create an admin user
 * Run with: node scripts/create-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://imonatikulislam_db_user:zjfOL8FMRFwgNBB5@cluster0.a63symz.mongodb.net/doctor-portfolio?retryWrites=true&w=majority';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'patient'], default: 'patient' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Admin credentials (change these as needed)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@doctorportfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`\n⚠ Admin user already exists: ${adminEmail}`);
      console.log('Updating role to admin...');
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✓ Admin role updated successfully!');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create admin user
      const admin = new User({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('\n✓ Admin user created successfully!');
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠ IMPORTANT: Change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

