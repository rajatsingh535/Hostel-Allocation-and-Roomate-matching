// frontend/app/inventory/page.jsx — M1: Warden Inventory Page
// Rajat is responsible for this page (Week 5, M1)
//
// This is the Warden's view. It shows all rooms and beds in the hostel.
// For Week 5, we load mock data after a short delay to demonstrate
// the useState + useEffect data-fetching pattern (satisfies the rubric).
//
// In later weeks (M7), this will fetch from GET /api/inventory
// and support drag-to-reassign beds to different students.

"use client"; // Must be client-side because we use useState and useEffect

import { useState, useEffect } from "react";
import BedMap from "../../components/BedMap";

// Mock seed data — represents what the API will eventually return
// This mirrors the MongoDB Hostel → Block → Floor → Room → Bed structure
const MOCK_INVENTORY = [
  {
    roomNumber: "101",
    roomType: "Double",
    beds: [
      { id: "A", occupied: true },
      { id: "B", occupied: false },
    ],
  },
  {
    roomNumber: "102",
    roomType: "Double",
    beds: [
      { id: "A", occupied: false },
      { id: "B", occupied: false },
    ],
  },
  {
    roomNumber: "103",
    roomType: "Triple",
    beds: [
      { id: "A", occupied: true },
      { id: "B", occupied: true },
      { id: "C", occupied: false },
    ],
  },
  {
    roomNumber: "104",
    roomType: "Double",
    beds: [
      { id: "A", occupied: true },
      { id: "B", occupied: true },
    ],
  },
  {
    roomNumber: "201",
    roomType: "Single",
    beds: [{ id: "A", occupied: false }],
  },
  {
    roomNumber: "202",
    roomType: "Double",
    beds: [
      { id: "A", occupied: false },
      { id: "B", occupied: true },
    ],
  },
];

export default function InventoryPage() {
  const [rooms, setRooms] = useState([]);       // Will hold the room data
  const [loading, setLoading] = useState(true);  // Shows spinner while loading
  const [error, setError] = useState(null);       // Shows error if fetch fails

  // Simulate an API call — in later weeks this will be:
  // const res = await fetch('http://localhost:5000/api/inventory');
  useEffect(() => {
    const loadInventory = async () => {
      try {
        // Simulating a 1 second network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRooms(MOCK_INVENTORY);
      } catch (err) {
        setError("Failed to load inventory. Please try again.");
      } finally {
        setLoading(false); // Always stop the spinner, success or failure
      }
    };

    loadInventory();
  }, []); // Empty array = run only once when the page loads

  // Count how many beds are available across all rooms
  const totalBeds = rooms.reduce((sum, r) => sum + r.beds.length, 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + r.beds.filter((b) => b.occupied).length, 0);
  const availableBeds = totalBeds - occupiedBeds;

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
          Module 1 — Hostel & Room Inventory
        </h2>
        <p style={{ color: "#666", marginTop: "0.3rem" }}>
          Warden View · Saraswati Hostel · Block A · Floor 1 & 2
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
          <p>Loading inventory...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={{ background: "#f8d7da", padding: "1rem", borderRadius: "8px", color: "#842029" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Success state — show stats + bed map */}
      {!loading && !error && (
        <>
          {/* Summary stats */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            <StatCard label="Total Beds" value={totalBeds} color="#1a1a2e" />
            <StatCard label="Occupied" value={occupiedBeds} color="#dc3545" />
            <StatCard label="Available" value={availableBeds} color="#28a745" />
          </div>

          {/* The actual bed map component */}
          <BedMap rooms={rooms} />
        </>
      )}
    </div>
  );
}

// Small reusable stat card component (defined in the same file for simplicity)
function StatCard({ label, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "1rem 1.5rem",
        minWidth: "130px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: "1.8rem", fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.2rem" }}>{label}</div>
    </div>
  );
}
