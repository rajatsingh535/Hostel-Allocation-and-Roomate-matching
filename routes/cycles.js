// routes/cycles.js — M2: Application & Cycle Management API
// Rajat is responsible for this file (Week 5, M2)
//
// These routes manage allocation cycles and student applications.
// Base path: /api/cycles
//
// GET  /api/cycles                        → list all allocation cycles
// POST /api/cycles                        → create a new cycle (admin only)
// GET  /api/cycles/:id/applications       → list all applications for a cycle
// POST /api/cycles/:id/applications       → student submits an application

const express = require('express');
const router = express.Router();
const { AllocationCycle, Application } = require('../models/Application');

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cycles
// Returns all allocation cycles. The frontend shows these to students so
// they know which cycle is currently open for applications.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const cycles = await AllocationCycle.find().sort({ createdAt: -1 });
    res.json({ success: true, data: cycles });
  } catch (err) {
    console.error('Error fetching cycles:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cycles
// Admin creates a new allocation cycle.
//
// Example request body:
// {
//   "name": "Fall 2024 Hostel Allocation",
//   "academicYear": "2024-25",
//   "applicationWindowStart": "2024-07-01",
//   "applicationWindowEnd": "2024-07-15"
// }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const cycle = new AllocationCycle(req.body);
    const saved = await cycle.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('Error creating cycle:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/cycles/:id/applications
// Returns all applications submitted for a specific cycle.
// Wardens use this to review who has applied.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/applications', async (req, res) => {
  try {
    const applications = await Application.find({ cycle: req.params.id });
    res.json({ success: true, data: applications });
  } catch (err) {
    console.error('Error fetching applications:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/cycles/:id/applications
// A student submits their hostel application for a given cycle.
//
// Example request body:
// {
//   "studentId": "22BCE1234",
//   "studentName": "Rajat Singh",
//   "programme": "B.Tech CSE",
//   "yearOfStudy": 2
// }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/applications', async (req, res) => {
  try {
    // Check that the cycle actually exists before accepting the application
    const cycle = await AllocationCycle.findById(req.params.id);
    if (!cycle) {
      return res.status(404).json({ success: false, message: 'Allocation cycle not found' });
    }

    // Only accept applications when the cycle is Open
    if (cycle.status !== 'Open') {
      return res.status(400).json({
        success: false,
        message: `Applications are not open for this cycle. Status: ${cycle.status}`,
      });
    }

    // Create the application linked to this cycle
    const application = new Application({
      ...req.body,
      cycle: req.params.id,
      status: 'Submitted',
      submittedAt: new Date(),
    });

    const saved = await application.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    // If a student tries to apply twice, MongoDB throws a duplicate key error (code 11000)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this allocation cycle.',
      });
    }
    console.error('Error submitting application:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
