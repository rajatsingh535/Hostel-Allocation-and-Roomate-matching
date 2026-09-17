"use client";

import { useState } from "react";

/**
 * MatchRequestButton.jsx
 * CLIENT COMPONENT — Product Workflow rubric criterion.
 *
 * Manages a three-state match request interaction:
 *   "idle"    → shows "Send Match Request" button
 *   "pending" → shows spinner + "Request Sent" (simulates API call)
 *   "accepted"→ shows green "Matched! ✓" success state
 *   "rejected"→ shows red "Request Declined" state (random for demo)
 *
 * State transitions are client-side only in Week 5.
 * Week 9: wire this to POST /api/matches.
 */
export default function MatchRequestButton({ studentId, studentName }) {
  const [status, setStatus] = useState("idle"); // idle | pending | accepted | rejected

  const handleRequest = async () => {
    if (status !== "idle") return;

    setStatus("pending");

    // Simulate async API call (Week 9: replace with real fetch to /api/matches)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo: randomly accept or reject to show both state paths
    const outcome = Math.random() > 0.3 ? "accepted" : "rejected";
    setStatus(outcome);
  };

  const handleReset = () => setStatus("idle");

  if (status === "idle") {
    return (
      <button
        onClick={handleRequest}
        className="w-full mt-4 py-2.5 px-4 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all"
      >
        Send Match Request
      </button>
    );
  }

  if (status === "pending") {
    return (
      <button
        disabled
        className="w-full mt-4 py-2.5 px-4 bg-indigo-400 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
      >
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        Sending Request…
      </button>
    );
  }

  if (status === "accepted") {
    return (
      <div className="mt-4 space-y-2">
        <div className="w-full py-2.5 px-4 bg-green-100 text-green-700 text-sm font-semibold rounded-xl flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Matched with {studentName}!
        </div>
        <button
          onClick={handleReset}
          className="w-full py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Withdraw request
        </button>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="mt-4 space-y-2">
        <div className="w-full py-2.5 px-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Request Declined
        </div>
        <button
          onClick={handleReset}
          className="w-full py-1.5 text-xs text-indigo-500 hover:text-indigo-700 transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return null;
}
