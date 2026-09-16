// frontend/components/ApplicationForm.jsx — M2: Student Application Form
// Rajat is responsible for this component (Week 5, M2)
//
// This is the student-facing form for submitting a hostel application.
// It uses controlled React inputs with useState so every field is tracked.
//
// In later weeks, the handleSubmit function will POST to:
//   POST /api/cycles/:id/applications

"use client";

import { useState } from "react";

export default function ApplicationForm() {
  // Track all form fields in one state object
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    programme: "",
    yearOfStudy: "",
  });

  // Track form submission status for user feedback
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // Update only the field that changed, keep everything else the same
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Week 5: Simulate a POST request with a short delay
      // In later weeks, replace this with:
      // const res = await fetch('http://localhost:5000/api/cycles/<CYCLE_ID>/applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      // Reset the form after a successful submission
      setFormData({ studentId: "", studentName: "", programme: "", yearOfStudy: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
        Fill in your details to apply
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Student ID */}
        <Field label="Student ID" name="studentId" placeholder="e.g. 22BCE1234"
          value={formData.studentId} onChange={handleChange} required />

        {/* Full Name */}
        <Field label="Full Name" name="studentName" placeholder="e.g. Rajat Singh"
          value={formData.studentName} onChange={handleChange} required />

        {/* Programme */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Programme</label>
          <select
            name="programme"
            value={formData.programme}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select your programme</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="B.Tech ME">B.Tech ME</option>
            <option value="M.Tech AI">M.Tech AI</option>
            <option value="MBA">MBA</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Year of Study */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Year of Study</label>
          <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year (Dual Degree)</option>
          </select>
        </div>

        {/* Submit button — changes based on loading state */}
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: status === "loading" ? "#aaa" : "#1a1a2e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {/* Success message */}
      {status === "success" && (
        <div style={{ marginTop: "1rem", background: "#d4edda", padding: "0.75rem 1rem", borderRadius: "8px", color: "#0f5132" }}>
          ✅ Application submitted successfully! You will be notified once your eligibility is verified.
        </div>
      )}

      {/* Error message */}
      {status === "error" && (
        <div style={{ marginTop: "1rem", background: "#f8d7da", padding: "0.75rem 1rem", borderRadius: "8px", color: "#842029" }}>
          ❌ Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}

// Reusable text input field to avoid repeating the same markup
function Field({ label, name, placeholder, value, onChange, required }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

// Shared styles
const labelStyle = {
  display: "block",
  fontWeight: 600,
  marginBottom: "0.4rem",
  fontSize: "0.9rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.8rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "0.95rem",
  outline: "none",
};
