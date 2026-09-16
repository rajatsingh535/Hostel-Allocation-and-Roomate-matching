const mongoose = require('mongoose');

// ---------------------------------------------------------
// Module M1: Hostel & Room Inventory Schemas
// This fulfills the Week 5 requirement for Inventory DB design
// ---------------------------------------------------------

// Schema for Bed
// Represents the lowest level of granularity in the inventory
const bedSchema = new mongoose.Schema({
    bedNumber: { type: String, required: true }, // e.g., 'A', 'B', '1', '2'
    isOccupied: { type: Boolean, default: false },
    accessibilityFeatures: [{ type: String }], // e.g., 'Ground Floor', 'Wheelchair Accessible'
    // allocatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } // Will be used in later modules
});

// Schema for Room
const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    capacity: { type: Number, required: true },
    roomType: { type: String }, // e.g., 'AC', 'Non-AC'
    beds: [bedSchema], // Embed beds inside the room for easier queries
    status: { type: String, enum: ['Available', 'Maintenance'], default: 'Available' }
});

// Schema for Floor
const floorSchema = new mongoose.Schema({
    floorNumber: { type: Number, required: true },
    rooms: [roomSchema] // Embed rooms inside floor
});

// Schema for Block
const blockSchema = new mongoose.Schema({
    blockName: { type: String, required: true }, // e.g., 'North Block'
    floors: [floorSchema]
});

// Main Schema for Hostel
const hostelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genderPolicy: { type: String, enum: ['Male', 'Female', 'Co-ed'], required: true },
    blocks: [blockSchema],
    totalCapacity: { type: Number, default: 0 },
    amenities: [{ type: String }]
}, { timestamps: true });

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
