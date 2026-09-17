// frontend/components/BedMap.jsx — M1: Visual Bed Map Component
// Rajat is responsible for this component (Week 5, M1)
//
// Renders a grid of room cards, each showing bed-level status.
// All 5 bed statuses are supported with distinct colours.
//
// Props:
//   rooms    (array)  — list of room objects with beds
//   filter   (string) — optional room type filter

'use client';

import { useState } from 'react';

// ── Bed status configuration ──────────────────────────────────────────────────
const BED_STATUS = {
  available:   { label: 'Available',   dot: '🟢', bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-200' },
  allocated:   { label: 'Allocated',   dot: '🔴', bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-200'   },
  reserved:    { label: 'Reserved',    dot: '🟡', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200'},
  maintenance: { label: 'Maintenance', dot: '⬜', bg: 'bg-gray-100',   text: 'text-gray-600',   border: 'border-gray-300'  },
  blocked:     { label: 'Blocked',     dot: '⬛', bg: 'bg-gray-800',   text: 'text-gray-100',   border: 'border-gray-900'  },
};

// Normalise legacy boolean `occupied` field → status string
function resolveStatus(bed) {
  if (bed.status) return bed.status;
  return bed.occupied ? 'allocated' : 'available';
}

// Room-level summary badge colour
function getRoomBadge(beds) {
  const statuses = beds.map(resolveStatus);
  if (statuses.every((s) => s === 'allocated'))   return { label: 'Full',      cls: 'bg-red-100 text-red-700'    };
  if (statuses.every((s) => s === 'available'))   return { label: 'Empty',     cls: 'bg-green-100 text-green-700' };
  if (statuses.some((s) => s === 'maintenance'))  return { label: 'Partial ⚠', cls: 'bg-yellow-100 text-yellow-700' };
  return { label: 'Partial', cls: 'bg-blue-100 text-blue-700' };
}

export default function BedMap({ rooms, filter = 'All' }) {
  const [tooltip, setTooltip] = useState(null); // { roomNum, bedId, status }

  // Apply room type filter
  const filtered = filter === 'All'
    ? rooms
    : rooms.filter((r) => r.roomType === filter);

  // Guard: nothing to show
  if (!filtered || filtered.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        {filter === 'All'
          ? 'No rooms found. Add rooms to this hostel first.'
          : `No ${filter} rooms match the current filter.`}
      </div>
    );
  }

  return (
    <div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(BED_STATUS).map(([key, cfg]) => (
          <span key={key}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            {cfg.dot} {cfg.label}
          </span>
        ))}
      </div>

      {/* ── Room Grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((room) => {
          const badge = getRoomBadge(room.beds);
          return (
            <div
              key={room.roomNumber}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Room header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-sm text-gray-900">Room {room.roomNumber}</p>
                  <p className="text-xs text-gray-400">{room.roomType}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>

              {/* Bed chips */}
              <div className="flex flex-wrap gap-2">
                {room.beds.map((bed) => {
                  const status = resolveStatus(bed);
                  const cfg    = BED_STATUS[status] || BED_STATUS.available;
                  const isActive = tooltip?.roomNum === room.roomNumber && tooltip?.bedId === bed.id;

                  return (
                    <div key={bed.id} className="relative">
                      <button
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-default
                                    transition-transform hover:scale-105 ${cfg.bg} ${cfg.text} ${cfg.border}`}
                        title={`Bed ${bed.id} — ${cfg.label}`}
                        onMouseEnter={() => setTooltip({ roomNum: room.roomNumber, bedId: bed.id, status })}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label={`Room ${room.roomNumber} Bed ${bed.id} is ${cfg.label}`}
                      >
                        Bed {bed.id}
                      </button>

                      {/* Tooltip */}
                      {isActive && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10
                                        bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5
                                        whitespace-nowrap shadow-lg pointer-events-none animate-fade-in">
                          {cfg.dot} {cfg.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Accessibility badge */}
              {room.beds.some((b) => b.isAccessible) && (
                <p className="mt-2 text-xs text-blue-600 font-medium">♿ Accessible bed available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
