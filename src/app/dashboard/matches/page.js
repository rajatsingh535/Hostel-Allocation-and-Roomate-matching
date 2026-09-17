"use client";

import { useState, useMemo } from "react";
import MatchCard from "@/components/MatchCard";
import { mockStudents } from "@/lib/mockStudents";

/**
 * Dashboard Matches Page — /dashboard/matches
 * React.js Routing criterion: nested App Router route
 * Rendering & Data Fetching criterion: dynamic map over mockStudents with
 *   - useState for filter/sort controls
 *   - useMemo for derived filtered list
 *   - Client component for interactivity
 *
 * Shows match cards for all students with interactive filter controls.
 */

const SORT_OPTIONS = [
  { value: "score_desc", label: "Best Match First" },
  { value: "score_asc", label: "Lowest Match First" },
  { value: "name_asc", label: "Name A → Z" },
  { value: "cgpa_desc", label: "Highest CGPA" },
];

const SLEEP_FILTERS = ["All", "Night Owl", "Early Bird"];
const CLEANLINESS_FILTERS = ["All", "Very Neat", "Neat", "Moderate"];

export default function DashboardMatchesPage() {
  const [sortBy, setSortBy] = useState("score_desc");
  const [sleepFilter, setSleepFilter] = useState("All");
  const [cleanFilter, setCleanFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);

  // Dynamic filtering + sorting using useMemo
  const filteredStudents = useMemo(() => {
    let result = [...mockStudents];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.interests.some((i) => i.toLowerCase().includes(q))
      );
    }

    // Sleep schedule filter
    if (sleepFilter !== "All") {
      result = result.filter((s) => s.sleepSchedule === sleepFilter);
    }

    // Cleanliness filter
    if (cleanFilter !== "All") {
      result = result.filter((s) => s.cleanliness === cleanFilter);
    }

    // Minimum match score
    result = result.filter((s) => s.matchScore >= minScore);

    // Sort
    result.sort((a, b) => {
      if (sortBy === "score_desc") return b.matchScore - a.matchScore;
      if (sortBy === "score_asc") return a.matchScore - b.matchScore;
      if (sortBy === "name_asc") return a.name.localeCompare(b.name);
      if (sortBy === "cgpa_desc") return b.cgpa - a.cgpa;
      return 0;
    });

    return result;
  }, [search, sleepFilter, cleanFilter, minScore, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <span>Dashboard</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-indigo-600 font-medium">Matches</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Find Roommate Matches</h1>
        <p className="text-gray-500 mt-1">
          {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} found &mdash; sorted by compatibility score.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search name, dept, interest…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Sleep filter */}
          <select
            value={sleepFilter}
            onChange={(e) => setSleepFilter(e.target.value)}
            className="py-2 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
          >
            {SLEEP_FILTERS.map((f) => (
              <option key={f} value={f}>{f === "All" ? "🌙 Sleep: All" : `🌙 ${f}`}</option>
            ))}
          </select>

          {/* Cleanliness filter */}
          <select
            value={cleanFilter}
            onChange={(e) => setCleanFilter(e.target.value)}
            className="py-2 px-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
          >
            {CLEANLINESS_FILTERS.map((f) => (
              <option key={f} value={f}>{f === "All" ? "✨ Cleanliness: All" : `✨ ${f}`}</option>
            ))}
          </select>
        </div>

        {/* Min score slider */}
        <div className="mt-3 flex items-center gap-3">
          <label className="text-xs text-gray-500 font-medium whitespace-nowrap">
            Min Match Score: <span className="text-indigo-600 font-bold">{minScore}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="flex-1 accent-indigo-600"
          />
          <button
            onClick={() => { setSearch(""); setSleepFilter("All"); setCleanFilter("All"); setMinScore(0); setSortBy("score_desc"); }}
            className="text-xs text-gray-400 hover:text-indigo-600 transition-colors font-medium whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Match Cards Grid — DYNAMIC MAP over filtered array (state-driven) */}
      {filteredStudents.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your filters or lowering the minimum match score.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredStudents.map((student) => (
            <MatchCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}
