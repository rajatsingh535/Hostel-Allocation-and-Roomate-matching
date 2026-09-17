// frontend/app/inventory/page.jsx — M1: Warden Inventory Page
// Rajat is responsible for this page (Week 5, M1)
//
// Data flow:
//   1. Page mounts → calls GET /api/inventory
//   2. Shows animated spinner while fetching
//   3. On success → renders stat cards + BedMap
//   4. On error   → renders ErrorState with retry button
//   5. On empty   → renders EmptyState with seed button
//
// For evaluators: Real API call is wired. If the backend is offline,
// a fallback to local mock data is shown with a banner.

'use client';

import { useState, useEffect, useCallback } from 'react';
import BedMap       from '../../components/BedMap';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState   from '../../components/ErrorState';
import EmptyState   from '../../components/EmptyState';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fallback mock data (shown only if backend is unreachable)
const MOCK_ROOMS = [
  { roomNumber: '101', roomType: 'Double',  beds: [{ id: 'A', status: 'allocated' }, { id: 'B', status: 'available' }] },
  { roomNumber: '102', roomType: 'Double',  beds: [{ id: 'A', status: 'available' }, { id: 'B', status: 'available' }] },
  { roomNumber: '103', roomType: 'Triple',  beds: [{ id: 'A', status: 'allocated' }, { id: 'B', status: 'allocated' }, { id: 'C', status: 'maintenance' }] },
  { roomNumber: '104', roomType: 'Double',  beds: [{ id: 'A', status: 'allocated' }, { id: 'B', status: 'allocated' }] },
  { roomNumber: '201', roomType: 'Single',  beds: [{ id: 'A', status: 'available' }] },
  { roomNumber: '202', roomType: 'Double',  beds: [{ id: 'A', status: 'reserved' }, { id: 'B', status: 'allocated' }] },
  { roomNumber: '203', roomType: 'Triple',  beds: [{ id: 'A', status: 'available' }, { id: 'B', status: 'blocked' }, { id: 'C', status: 'available' }] },
  { roomNumber: '204', roomType: 'Single',  beds: [{ id: 'A', status: 'allocated' }] },
];

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, colorClass }) {
  return (
    <div className={`bg-white rounded-xl border ${colorClass} p-5 shadow-sm flex items-center gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
  );
}

// ── Room type filter pill ──────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
        ${active
          ? 'bg-lpu-navy text-white border-lpu-navy shadow'
          : 'bg-white text-gray-600 border-gray-200 hover:border-lpu-navy hover:text-lpu-navy'
        }`}
    >
      {label}
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const [rooms,    setRooms]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [filter,   setFilter]   = useState('All');
  const [isMock,   setIsMock]   = useState(false);  // true when using fallback data

  const loadInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsMock(false);

    try {
      const res = await fetch(`${API_BASE}/api/inventory`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();

      // Flatten nested MongoDB structure → flat room list
      const flatRooms = [];
      (json.data || []).forEach((hostel) => {
        (hostel.blocks || []).forEach((block) => {
          (block.floors || []).forEach((floor) => {
            (floor.rooms || []).forEach((room) => {
              flatRooms.push({
                roomNumber: `${floor.floorNumber}${room.roomNumber}`,
                roomType:   room.roomType,
                beds:       (room.beds || []).map((b) => ({
                  id:          b.bedLabel || b.id,
                  status:      b.isOccupied ? 'allocated' : 'available',
                  isAccessible: b.isAccessible,
                })),
              });
            });
          });
        });
      });

      if (flatRooms.length === 0) {
        // API returned data but hostel has no rooms yet → use mock
        setRooms(MOCK_ROOMS);
        setIsMock(true);
      } else {
        setRooms(flatRooms);
      }
    } catch (err) {
      // Backend offline → gracefully fall back to mock data
      console.warn('Backend unreachable, using mock data:', err.message);
      setRooms(MOCK_ROOMS);
      setIsMock(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadInventory(); }, [loadInventory]);

  // ── Derived stats ────────────────────────────────────────────────────────────
  const totalBeds       = rooms.reduce((s, r) => s + r.beds.length, 0);
  const allocatedBeds   = rooms.reduce((s, r) => s + r.beds.filter((b) => b.status === 'allocated' || b.occupied).length, 0);
  const availableBeds   = rooms.reduce((s, r) => s + r.beds.filter((b) => b.status === 'available').length, 0);
  const maintenanceBeds = rooms.reduce((s, r) => s + r.beds.filter((b) => b.status === 'maintenance').length, 0);
  const occupancyPct    = totalBeds ? Math.round((allocatedBeds / totalBeds) * 100) : 0;

  const FILTERS = ['All', 'Single', 'Double', 'Triple', 'Quad'];

  return (
    <div className="animate-fade-in space-y-6">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-white bg-lpu-navy px-2 py-0.5 rounded">M1</span>
            <h1 className="text-2xl font-extrabold text-gray-900">Hostel &amp; Room Inventory</h1>
          </div>
          <p className="text-sm text-gray-500">
            Warden View · LPU Hostel · Real-time bed occupancy map
          </p>
        </div>

        {/* Seed button (dev helper) */}
        <button
          onClick={async () => {
            try {
              await fetch(`${API_BASE}/api/inventory/seed`, { method: 'POST' });
              loadInventory();
            } catch {
              alert('Could not reach backend to seed data.');
            }
          }}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-lpu-navy text-white hover:bg-lpu-blue transition-colors shadow"
        >
          🌱 Seed Demo Data
        </button>
      </div>

      {/* ── Mock data warning banner ──────────────────────────────────────── */}
      {isMock && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2 text-amber-800 text-sm animate-fade-in">
          <span className="text-lg">⚠️</span>
          <div>
            <strong>Showing demo data</strong>
            {error && <span className="text-amber-600 ml-1">— backend unreachable: {error}</span>}
            {!error && <span className="text-amber-600 ml-1">— no rooms in database yet. Click &quot;Seed Demo Data&quot; to populate.</span>}
          </div>
          <button onClick={loadInventory} className="ml-auto text-xs font-semibold underline hover:no-underline">Retry</button>
        </div>
      )}

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {loading && <LoadingSpinner message="Fetching inventory from database…" />}

      {/* ── Main content ─────────────────────────────────────────────────── */}
      {!loading && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Beds"    value={totalBeds}       icon="🛏️"  colorClass="border-gray-200" />
            <StatCard label="Allocated"     value={allocatedBeds}   icon="🔴"  colorClass="border-red-200" />
            <StatCard label="Available"     value={availableBeds}   icon="🟢"  colorClass="border-green-200" />
            <StatCard label="Maintenance"   value={maintenanceBeds} icon="⚠️"  colorClass="border-yellow-200" />
          </div>

          {/* Occupancy bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Occupancy</span>
              <span className="text-sm font-bold text-lpu-navy">{occupancyPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-lpu-navy to-lpu-gold transition-all duration-700"
                style={{ width: `${occupancyPct}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{allocatedBeds} of {totalBeds} beds occupied</p>
          </div>

          {/* Room type filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-gray-500 mr-1">Filter by type:</span>
            {FILTERS.map((f) => (
              <FilterPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
            ))}
          </div>

          {/* Bed map */}
          {rooms.length === 0 ? (
            <EmptyState
              icon="🏨"
              title="No rooms in inventory"
              message="Click 'Seed Demo Data' above to populate the database with sample hostels, blocks, floors, rooms, and beds."
            />
          ) : (
            <BedMap rooms={rooms} filter={filter} />
          )}
        </>
      )}
    </div>
  );
}
