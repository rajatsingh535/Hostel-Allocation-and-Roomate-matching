// routes/inventory.js — M1: Hostel & Room Inventory API
// Rajat is responsible for this file (Week 5, M1)
//
// These routes expose the hostel inventory to the frontend.
// Base path: /api/inventory
//
// GET  /api/inventory          → list all hostels (with nested blocks/rooms/beds)
// POST /api/inventory          → create a new hostel
// GET  /api/inventory/:id      → get one hostel by its MongoDB ID
// POST /api/inventory/:id/bed  → add a bed to a specific room (for admin use)

const express = require('express');
const router = express.Router();
const Hostel = require('../models/Inventory');

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/inventory
// Returns all hostels with their full nested structure.
// The frontend uses this to render the Warden Bed Map.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const hostels = await Hostel.find(); // Get everything from MongoDB
    res.json({ success: true, data: hostels });
  } catch (err) {
    console.error('Error fetching inventory:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching inventory' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/inventory/:id
// Returns a single hostel. Used when the warden opens a specific hostel view.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ success: false, message: 'Hostel not found' });
    }
    res.json({ success: true, data: hostel });
  } catch (err) {
    console.error('Error fetching hostel:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/inventory
// Creates a new hostel. Used by the Hostel Administrator.
//
// Example request body:
// {
//   "name": "Saraswati Hostel",
//   "genderPolicy": "Female",
//   "amenities": ["WiFi", "Mess"],
//   "blocks": []
// }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    const saved = await hostel.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error creating hostel:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
