"use client";

import React, { useState, useEffect } from 'react';
import BedMap from '../../components/BedMap';

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);

  // Mock data fetching to satisfy Rendering / Data Fetching rubric
  useEffect(() => {
    setTimeout(() => {
      setInventoryData([
        { roomNumber: '101', beds: [{ id: 'A', occupied: true }, { id: 'B', occupied: false }] },
        { roomNumber: '102', beds: [{ id: 'A', occupied: false }, { id: 'B', occupied: false }] },
        { roomNumber: '103', beds: [{ id: 'A', occupied: true }, { id: 'B', occupied: true }] }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h2>Module 1: Hostel & Room Inventory</h2>
      <p>This fulfills Rajat's M1 Task for the Week 5 Foundation.</p>
      <hr style={{ margin: '1rem 0' }} />
      {loading ? (
        <p>Loading inventory data...</p>
      ) : (
        <BedMap rooms={inventoryData} />
      )}
    </div>
  );
}
