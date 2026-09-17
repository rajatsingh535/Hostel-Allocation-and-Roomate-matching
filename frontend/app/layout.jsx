// frontend/app/layout.jsx — Global Layout with professional navigation
// This file wraps every page. It provides:
//   - LPU-branded top nav bar with active link highlighting
//   - Mobile responsive hamburger menu
//   - Consistent page container
//
// Next.js App Router requires this at /app/layout.jsx.
// 'use client' is needed so we can use hooks (usePathname, useState).

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';

// Navigation links — update this array to add new pages
const NAV_LINKS = [
  { href: '/',            label: 'Home',       icon: '🏠' },
  { href: '/application', label: 'Apply',       icon: '📝' },
  { href: '/inventory',   label: 'Inventory',   icon: '🗂️' },
  { href: '/dashboard',   label: 'Dashboard',   icon: '📊' },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="LPU Hostel Allocation & Roommate Matching — Policy-driven allocation engine" />
        <title>LPU Hostel Allocation</title>
      </head>

      <body className="min-h-screen bg-lpu-light flex flex-col">

        {/* ── Top Navigation Bar ──────────────────────────────────────────── */}
        <header className="bg-lpu-navy shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Brand */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-lpu-gold rounded-lg flex items-center justify-center text-white font-extrabold text-sm shadow">
                  LPU
                </div>
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-sm leading-tight">Hostel Allocation</p>
                  <p className="text-gray-400 text-xs">P03 – Roommate Matching Platform</p>
                </div>
              </a>

              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_LINKS.map(({ href, label, icon }) => {
                  const active = pathname === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                        ${active
                          ? 'bg-lpu-gold text-white shadow-sm'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="text-base">{icon}</span>
                      {label}
                    </a>
                  );
                })}
              </nav>

              {/* Auth pill (placeholder for Week 5) */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-lpu-gold flex items-center justify-center text-white text-xs font-bold">
                    R
                  </div>
                  <span className="text-gray-200 text-xs font-medium">Rajat Singh</span>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
              <div className="md:hidden border-t border-white/10 pb-3 pt-2 animate-fade-in">
                {NAV_LINKS.map(({ href, label, icon }) => {
                  const active = pathname === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg mx-2 my-0.5
                        ${active
                          ? 'bg-lpu-gold text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <span>{icon}</span>
                      {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* ── Page Content ────────────────────────────────────────────────── */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="bg-lpu-navy border-t border-white/10 mt-auto py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
              <span>P03 — LPU Hostel Allocation & Roommate Matching Platform</span>
              <span>Week 5 Foundation Review · M1 + M2 by Rajat Singh</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
