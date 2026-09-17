// server.js — Main entry point for the backend
// This file starts Express, connects to MongoDB, and loads all API routes.
// Run with: npm start or node server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Pull in MONGODB_URI and PORT from .env file

const app = express();

// Allow the Next.js frontend (port 3000) to talk to this backend (port 5000)
app.use(cors());

// Let Express parse incoming JSON bodies (needed for POST/PUT requests)
app.use(express.json());

// ─────────────────────────────────────────────────────────────────────────────
// MONGODB CONNECTION
// ─────────────────────────────────────────────────────────────────────────────
// We read the connection string from the .env file so credentials are never
// hardcoded in source code. If MONGODB_URI is missing, we exit immediately
// with a clear message so the developer knows what to fix.

const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('');
    console.error('❌  MONGODB_URI is not set!');
    console.error('    Please create a .env file in the root folder with:');
    console.error('    MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hostel_allocation');
    console.error('    You can get this string from https://cloud.mongodb.com → Connect → Drivers');
    console.error('');
    process.exit(1); // Stop the server — there is no point continuing without a DB
  }

  try {
    await mongoose.connect(uri);
    console.log('✅  MongoDB connected successfully');
  } catch (err) {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

connectToDatabase();

// ─────────────────────────────────────────────────────────────────────────────
// API ROUTES (8 MODULES ARCHITECTURE)
// ─────────────────────────────────────────────────────────────────────────────
// M1 — Auth & Roles
app.use('/api/auth', (req, res) => res.json({ success: true, message: 'Auth endpoint stub' }));

// M2 & M3 — Room Browsing & Management (previously M1 in Week 5)
app.use('/api/inventory', require('./routes/inventory')); 

// M4 — Applications & Requests (previously M2 in Week 5)
app.use('/api/cycles', require('./routes/cycles'));
app.use('/api/requests', (req, res) => res.json({ success: true, message: 'Requests endpoint stub' }));

// M5 — Roommate Matching
app.use('/api/roommates', (req, res) => res.json({ success: true, message: 'Roommate endpoint stub' }));

// M6 — Asset Inventory
app.use('/api/assets', (req, res) => res.json({ success: true, message: 'Assets endpoint stub' }));

// M7 — Maintenance & Notifications
app.use('/api/maintenance', (req, res) => res.json({ success: true, message: 'Maintenance endpoint stub' }));

// Basic health-check route
app.get('/', (req, res) => {
  res.json({
    message: 'Hostel Allocation API is running 🚀',
    version: '0.1.0 (Week 5 Foundation)',
    endpoints: ['/api/inventory', '/api/cycles'],
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
