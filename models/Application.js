// models/Application.js — M2: Application & Cycle Management
// Rajat is responsible for this file (Week 5, M2)
//
// This file defines two MongoDB models:
//   1. AllocationCycle — represents one complete hostel allocation round
//      (e.g., "Fall 2024 Allocation"). It has a start/end window.
//   2. Application — a single student's application within a cycle.
//
// These are kept in separate collections so cycles can exist before any
// student applies, and so multiple applications per cycle can be queried.

const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────────────────────
// ALLOCATION CYCLE — One round of hostel allocation (e.g., a semester)
// ─────────────────────────────────────────────────────────────────────────────
const allocationCycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Fall 2024 Hostel Allocation"
      unique: true,
    },
    academicYear: {
      type: String,
      required: true, // e.g. "2024-25"
    },
    applicationWindowStart: {
      type: Date,
      required: true, // When students can start applying
    },
    applicationWindowEnd: {
      type: Date,
      required: true, // Deadline for applications
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Open', 'Closed', 'Allocated', 'Published'],
      default: 'Upcoming',
      // Lifecycle: Upcoming → Open (window starts) → Closed (window ends)
      //            → Allocated (engine ran) → Published (warden approved)
    },
    requiredDocuments: {
      type: [String],
      default: ['Fee Receipt', 'Enrolment Certificate'],
      // The admin can configure which docs students must upload
    },
  },
  {
    timestamps: true,
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// APPLICATION — A single student's hostel application for one cycle
// ─────────────────────────────────────────────────────────────────────────────
const applicationSchema = new mongoose.Schema(
  {
    // Which cycle this application belongs to
    cycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AllocationCycle',
      required: true,
    },

    // Student identity — in later weeks this will reference a User model
    studentId: {
      type: String,
      required: true, // e.g. "22BCE1234"
    },
    studentName: {
      type: String,
      required: true,
    },
    programme: {
      type: String,
      required: true, // e.g. "B.Tech CSE", "M.Tech AI"
    },
    yearOfStudy: {
      type: Number,
      required: true, // 1, 2, 3, 4...
    },

    // Uploaded documents for eligibility verification
    documents: [
      {
        documentName: { type: String }, // e.g. "Fee Receipt"
        fileUrl: { type: String },       // URL to stored file (S3 / local)
        isVerified: { type: Boolean, default: false }, // Warden marks this
      },
    ],

    // Application lifecycle status
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Eligible', 'Ineligible', 'Allocated', 'Waitlisted'],
      default: 'Draft',
      // Draft → Submitted → Eligible/Ineligible (after M3 validation)
      // → Allocated / Waitlisted (after M6 engine runs)
    },

    submittedAt: {
      type: Date,
      default: null, // Set when the student clicks "Submit" (not just "Save Draft")
    },

    // Preferences and questionnaire references will be added in M4 and M5
    // preference: { type: mongoose.Schema.Types.ObjectId, ref: 'Preference' }
    // compatibility: { type: mongoose.Schema.Types.ObjectId, ref: 'CompatibilityResponse' }
  },
  {
    timestamps: true,
  }
);

// Prevent one student from applying twice to the same cycle
applicationSchema.index({ studentId: 1, cycle: 1 }, { unique: true });

const AllocationCycle = mongoose.model('AllocationCycle', allocationCycleSchema);
const Application = mongoose.model('Application', applicationSchema);

module.exports = { AllocationCycle, Application };
