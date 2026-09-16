const mongoose = require('mongoose');

// ---------------------------------------------------------
// Module M2: Application & Cycle Management Schemas
// This fulfills the Week 5 requirement for Application DB design
// ---------------------------------------------------------

// Schema for Allocation Cycle
// Manages the time windows for different allocation rounds
const allocationCycleSchema = new mongoose.Schema({
    cycleName: { type: String, required: true }, // e.g., 'Fall 2024 Allocation'
    academicYear: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Upcoming', 'Active', 'Closed'], default: 'Upcoming' },
    // rules: [...] // Can hold eligibility and quota rules for this cycle
}, { timestamps: true });

// Schema for Student Application
const applicationSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, // Ideally a reference to a User/Student model
    cycleId: { type: mongoose.Schema.Types.ObjectId, ref: 'AllocationCycle', required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected'], default: 'Draft' },
    documents: [{
        documentName: String,
        url: String, // URL to the uploaded document (e.g., on S3 or local storage)
        verified: { type: Boolean, default: false }
    }],
    // Preferences and Questionnaire references will be added in Module M4/M5
    // preferenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Preference' }
}, { timestamps: true });

const AllocationCycle = mongoose.model('AllocationCycle', allocationCycleSchema);
const Application = mongoose.model('Application', applicationSchema);

module.exports = { AllocationCycle, Application };
