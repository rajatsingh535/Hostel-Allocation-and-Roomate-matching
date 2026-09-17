// frontend/app/page.jsx — Home / Landing Page
// This is the first thing any user sees at http://localhost:3000
//
// Features:
//   - Role-selection cards (Student / Warden / Admin)
//   - Live active cycle status fetched from GET /api/cycles/active
//   - System status indicators
//   - Week 5 progress summary for the evaluator

'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ── Role cards ─────────────────────────────────────────────────────────────────
const ROLES = [
  {
    href: '/application',
    icon: '🎓',
    title: 'I am a Student',
    description: 'Submit your hostel application, rank preferences, and track your allocation status.',
    badge: 'Student Portal',
    badgeColor: 'bg-blue-100 text-blue-700',
    cta: 'Open Application →',
    border: 'border-blue-200 hover:border-blue-400',
  },
  {
    href: '/inventory',
    icon: '🏠',
    title: 'I am a Warden',
    description: 'View hostel inventory, manage bed occupancy, and review allocation drafts.',
    badge: 'Warden Portal',
    badgeColor: 'bg-green-100 text-green-700',
    cta: 'Open Inventory →',
    border: 'border-green-200 hover:border-green-400',
  },
  {
    href: '/dashboard',
    icon: '⚙️',
    title: 'I am an Admin',
    description: 'Manage allocation cycles, run the allocation engine, and publish results.',
    badge: 'Admin Portal',
    badgeColor: 'bg-purple-100 text-purple-700',
    cta: 'Open Dashboard →',
    border: 'border-purple-200 hover:border-purple-400',
  },
];

// ── Module status items for the evaluator ─────────────────────────────────────
const MODULES = [
  { id: 'M1', label: 'Hostel & Room Inventory',       status: 'done',    link: '/inventory'   },
  { id: 'M2', label: 'Application & Cycle Management', status: 'done',    link: '/application' },
  { id: 'M3', label: 'Eligibility Engine',             status: 'pending', link: null           },
  { id: 'M4', label: 'Roommate Compatibility',         status: 'pending', link: null           },
  { id: 'M5', label: 'Allocation Engine (BullMQ)',     status: 'pending', link: null           },
  { id: 'M6', label: 'Warden Review & Publication',    status: 'pending', link: null           },
];

export default function HomePage() {
  const [cycle, setCycle]   = useState(null);   // Active allocation cycle
  const [cycleLoading, setCycleLoading] = useState(true);
  const [cycleError, setCycleError]     = useState(false);

  // Fetch the currently active allocation cycle for the status banner
  useEffect(() => {
    const fetchActiveCycle = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cycles/active`);
        if (!res.ok) throw new Error('No active cycle');
        const data = await res.json();
        setCycle(data.data);
      } catch {
        setCycleError(true);
      } finally {
        setCycleLoading(false);
      }
    };
    fetchActiveCycle();
  }, []);

  return (
    <div className="animate-fade-in space-y-10">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-lpu-navy rounded-2xl overflow-hidden px-8 py-12 text-white shadow-xl">
        {/* decorative gradient blob */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-lpu-gold/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl">
          <span className="inline-block bg-lpu-gold/20 text-lpu-gold text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            P03 · Week 5 Foundation Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            LPU Hostel Allocation &<br />
            <span className="text-lpu-gold">Roommate Matching Platform</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            A policy-driven engine that automates hostel allocation for thousands of students
            — with deterministic assignment, hard-constraint validation, warden review,
            and a full audit trail.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <a href="/application"
               className="inline-flex items-center gap-2 bg-lpu-gold text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors shadow">
              📝 Apply for Hostel
            </a>
            <a href="/inventory"
               className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors">
              🗂️ View Inventory
            </a>
          </div>
        </div>
      </section>

      {/* ── Active Cycle Banner ────────────────────────────────────────────── */}
      <section>
        {cycleLoading && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 text-gray-400 text-sm shadow-sm">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin-slow" />
            Checking for active allocation cycle…
          </div>
        )}

        {!cycleLoading && cycleError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3 text-yellow-800 text-sm shadow-sm">
            <span className="text-xl">📅</span>
            <div>
              <strong>No active allocation cycle</strong>
              <span className="text-yellow-600 ml-2">— The backend may be offline or no cycle is currently open.</span>
            </div>
          </div>
        )}

        {!cycleLoading && !cycleError && cycle && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-green-900 text-sm">{cycle.name}</p>
                <p className="text-green-700 text-xs">
                  Applications open until{' '}
                  <strong>{new Date(cycle.applicationWindowEnd).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </p>
              </div>
            </div>
            <a href="/application"
               className="inline-flex items-center gap-1 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
              Apply Now →
            </a>
          </div>
        )}
      </section>

      {/* ── Role Cards ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Select your role to continue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <a key={role.href} href={role.href} className="group block no-underline">
              <div className={`bg-white rounded-xl border-2 ${role.border} p-6 h-full flex flex-col gap-3 shadow-sm 
                              transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md`}>
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{role.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role.badgeColor}`}>
                    {role.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{role.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{role.description}</p>
                </div>
                <span className="mt-auto text-sm font-semibold text-lpu-navy group-hover:underline">
                  {role.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Module Status ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Week 5 — Module Progress</h2>
        <p className="text-sm text-gray-500 mb-4">Rajat is responsible for M1 &amp; M2 (foundation modules).</p>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {MODULES.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === 'done' ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs font-bold text-gray-400 w-8">{m.id}</span>
                <span className="text-sm font-medium text-gray-700">{m.label}</span>
              </div>
              {m.status === 'done' ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Complete (Week 5)</span>
                  {m.link && (
                    <a href={m.link} className="text-xs text-lpu-navy hover:underline font-medium">View →</a>
                  )}
                </div>
              ) : (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Week 9+</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js 14', 'React 18', 'JavaScript (ES2022)', 'Tailwind CSS',
            'Node.js', 'Express.js', 'MongoDB', 'Mongoose',
            'Redis + BullMQ (Week 9)', 'JWT Auth (Week 9)', 'Puppeteer PDF (Week 13)',
          ].map((tech) => (
            <span key={tech}
                  className="text-xs font-medium bg-lpu-navy/5 text-lpu-navy border border-lpu-navy/10 px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
