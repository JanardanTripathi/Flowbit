require('dotenv').config({ path: '../api/.env' });
const mongoose = require('mongoose');
const Tenant = require('./models/Tenant');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI; // ✅ Now works

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Optional: Clear existing documents
    await Tenant.deleteMany({});
    await User.deleteMany({});

    // Create tenants
    const tenant1 = await Tenant.create({ name: 'Tenant One', plan: 'free' });
    const tenant2 = await Tenant.create({ name: 'Tenant Two', plan: 'pro' });

    // Create users with roles
    await User.create([
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        tenant: tenant1._id,
        role: 'admin'
      },
      {
        email: 'user@example.com',
        password: await bcrypt.hash('user123', 10),
        tenant: tenant2._id,
        role: 'user'
      },
    ]);

    console.log('✅ Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  } finally {
    mongoose.disconnect();
  }
}

seed();
