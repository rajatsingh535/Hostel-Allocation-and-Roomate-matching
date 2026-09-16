// models/Inventory.js — M1: Hostel & Room Inventory
// Rajat is responsible for this file (Week 5, M1)
//
// This file defines the MongoDB data model for the entire hostel inventory.
// Structure (top to bottom):
//   Hostel → contains many Blocks
//   Block  → contains many Floors
//   Floor  → contains many Rooms
//   Room   → contains many Beds
//
// Every bed has its own status and accessibility attributes.
// This bed-level granularity is required by the project spec.

const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────────────────────
// BED — The smallest unit of inventory
// ─────────────────────────────────────────────────────────────────────────────
const bedSchema = new mongoose.Schema({
  bedLabel: {
    type: String,
    required: true,
    // e.g. "A", "B", "1", "2"
  },
  isOccupied: {
    type: Boolean,
    default: false, // Starts empty; set to true when a student is assigned
  },
  isAccessible: {
    type: Boolean,
    default: false, // true for wheelchair-accessible beds
  },
  accessibilityNotes: {
    type: String,
    default: '', // e.g. "Near elevator", "Ground floor", "Extra-wide doorway"
  },
  // allocatedTo will be filled in by the Allocation Engine (Module 6, later weeks)
  // allocatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

// ─────────────────────────────────────────────────────────────────────────────
// ROOM — A room on a floor that contains beds
// ─────────────────────────────────────────────────────────────────────────────
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true, // e.g. "101", "202A"
  },
  roomType: {
    type: String,
    enum: ['Single', 'Double', 'Triple', 'Quad'],
    required: true,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Available', 'Full', 'Maintenance', 'Reserved'],
    default: 'Available',
  },
  beds: [bedSchema], // Each room embeds its beds directly for easy queries
});

// ─────────────────────────────────────────────────────────────────────────────
// FLOOR — A floor within a block
// ─────────────────────────────────────────────────────────────────────────────
const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true, // 0 = ground floor, 1 = first floor, etc.
  },
  rooms: [roomSchema],
});

// ─────────────────────────────────────────────────────────────────────────────
// BLOCK — A named wing/block within a hostel
// ─────────────────────────────────────────────────────────────────────────────
const blockSchema = new mongoose.Schema({
  blockName: {
    type: String,
    required: true, // e.g. "North Wing", "Block A"
  },
  genderPolicy: {
    type: String,
    enum: ['Male', 'Female', 'Co-ed'],
    required: true, // A block is always gender-designated
  },
  floors: [floorSchema],
});

// ─────────────────────────────────────────────────────────────────────────────
// HOSTEL — The top-level entity
// ─────────────────────────────────────────────────────────────────────────────
const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Saraswati Hostel"
      unique: true,
    },
    genderPolicy: {
      type: String,
      enum: ['Male', 'Female', 'Co-ed'],
      required: true,
    },
    totalCapacity: {
      type: Number,
      default: 0,
      // This should be updated whenever beds are added/removed
    },
    amenities: {
      type: [String],
      default: [], // e.g. ["WiFi", "Laundry", "Gym", "Mess"]
    },
    blocks: [blockSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
