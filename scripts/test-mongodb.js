/**
 * Script to test MongoDB connection
 * Run with: node scripts/test-mongodb.js
 */

const mongoose = require('mongoose');

// MongoDB connection from .env.local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://imonatikulislam_db_user:zjfOL8FMRFwgNBB5@cluster0.a63symz.mongodb.net/doctor-portfolio?retryWrites=true&w=majority';

console.log('Testing MongoDB connection...\n');
console.log('Connection string:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

async function testConnection() {
  try {
    console.log('\n⏳ Attempting to connect to MongoDB Atlas...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4
    });

    console.log('✓ Successfully connected to MongoDB Atlas!\n');
    
    // Test database operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Available collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    
    // Check for users
    const usersCount = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`\n👥 Total users in database: ${usersCount}`);
    
    if (usersCount > 0) {
      const users = await mongoose.connection.db.collection('users').find({}).toArray();
      console.log('\n📋 Users:');
      users.forEach(user => {
        console.log(`   - Email: ${user.email}, Role: ${user.role}`);
      });
    }

    await mongoose.connection.close();
    console.log('\n✓ Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.error('\nPossible causes:');
    console.error('1. Network/DNS issue - Check your internet connection');
    console.error('2. MongoDB Atlas cluster is paused or deleted');
    console.error('3. IP address not whitelisted in MongoDB Atlas');
    console.error('4. Incorrect connection string');
    console.error('\nFull error details:', error);
    process.exit(1);
  }
}

testConnection();
