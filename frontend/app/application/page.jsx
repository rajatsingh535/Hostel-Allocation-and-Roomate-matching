// frontend/app/application/page.jsx — M2: Student Application Page
// Rajat is responsible for this page (Week 5, M2)
//
// Data flow:
//   1. Page mounts → calls GET /api/cycles/active
//   2. Shows loading spinner while fetching
//   3. On success → shows cycle info banner + ApplicationForm with cycleId
//   4. On error/no cycle → shows helpful message
//   5. Closed cycle → shows deadline-passed state

'use client';

import { useState, useEffect } from 'react';
import ApplicationForm from '../../components/ApplicationForm';
import LoadingSpinner  from '../../components/LoadingSpinner';
import EmptyState      from '../../components/EmptyState';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Deadline countdown helper
function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function ApplicationPage() {
  const [cycle,   setCycle]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cycles/active`);
        if (res.status === 404) { setCycle(null); return; }
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const json = await res.json();
        setCycle(json.data);
      } catch (err) {
        setError(err.message);
        // Still allow demo mode — render form without cycleId
        setCycle({ _id: 'demo', name: 'Demo Cycle (Offline)', applicationWindowEnd: null, requiredDocuments: ['Fee Receipt', 'Enrolment Certificate'] });
      } finally {
        setLoading(false);
      }
    };
    fetchCycle();
  }, []);

  const days = cycle?.applicationWindowEnd ? daysUntil(cycle.applicationWindowEnd) : null;

  return (
    <div className="animate-fade-in space-y-6">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-white bg-lpu-navy px-2 py-0.5 rounded">M2</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Hostel Application</h1>
        </div>
        <p className="text-sm text-gray-500">
          Student View · Complete your application to be considered in the next allocation run
        </p>
      </div>

      {/* ── Loading state ─────────────────────────────────────────────────── */}
      {loading && <LoadingSpinner message="Checking for active allocation cycle…" />}

      {/* ── No cycle / closed ─────────────────────────────────────────────── */}
      {!loading && !cycle && !error && (
        <EmptyState
          icon="📅"
          title="No active allocation cycle"
          message="The hostel allocation window is currently closed. Please check back later or contact the Hostel Admin Office."
        />
      )}

      {/* ── Main content ─────────────────────────────────────────────────── */}
      {!loading && cycle && (
        <>
          {/* Backend offline warning */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2 text-amber-800 text-sm">
              <span className="text-lg">⚠️</span>
              <span>Backend unreachable — running in demo mode. Application will not be saved to DB.</span>
            </div>
          )}

          {/* Cycle info banner */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Coloured top bar */}
            <div className="h-1.5 bg-gradient-to-r from-lpu-navy to-lpu-gold" />
            <div className="px-6 py-5 flex flex-wrap gap-6 items-start">

              {/* Cycle name + status */}
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Active Allocation Cycle</p>
                <p className="text-lg font-extrabold text-gray-900">{cycle.name}</p>
                <span className="inline-block mt-1 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  ● OPEN
                </span>
              </div>

              {/* Deadline */}
              {cycle.applicationWindowEnd && (
                <div className="text-center min-w-[110px]">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Deadline</p>
                  <p className="text-base font-bold text-gray-800">
                    {new Date(cycle.applicationWindowEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  {days !== null && (
                    <span className={`text-xs font-bold mt-0.5 inline-block ${days <= 3 ? 'text-red-600' : 'text-amber-600'}`}>
                      {days === 0 ? 'Closes today!' : `${days} day${days !== 1 ? 's' : ''} left`}
                    </span>
                  )}
                </div>
              )}

              {/* Required docs */}
              <div className="min-w-[180px]">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Required Documents</p>
                <ul className="space-y-0.5">
                  {(cycle.requiredDocuments || []).map((doc) => (
                    <li key={doc} className="text-xs text-gray-700 flex items-center gap-1.5">
                      <span className="text-green-500">📄</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* The multi-step form */}
          <ApplicationForm cycleId={cycle._id} />
        </>
      )}
    </div>
  );
}
