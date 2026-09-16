// frontend/app/application/page.jsx — M2: Student Application Page
// Rajat is responsible for this page (Week 5, M2)
//
// This page shows the currently open allocation cycle and
// lets the student fill in and submit their application form.

import ApplicationForm from "../../components/ApplicationForm";

export default function ApplicationPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
          Module 2 — Hostel Application
        </h2>
        <p style={{ color: "#666", marginTop: "0.3rem" }}>
          Student View · Currently open: <strong>Fall 2024 Hostel Allocation</strong>
        </p>
      </div>

      {/* Info banner — shows the active cycle details */}
      <div
        style={{
          background: "#e8f4fd",
          border: "1px solid #bee3f8",
          borderRadius: "10px",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
          fontSize: "0.9rem",
          color: "#1a365d",
        }}
      >
        <strong>📅 Application Window:</strong> 1 July 2024 – 15 July 2024 &nbsp;|&nbsp;
        <strong>Status:</strong> Open &nbsp;|&nbsp;
        <strong>Required Docs:</strong> Fee Receipt, Enrolment Certificate
      </div>

      {/* The application form itself (imported component) */}
      <ApplicationForm />
    </div>
  );
}
