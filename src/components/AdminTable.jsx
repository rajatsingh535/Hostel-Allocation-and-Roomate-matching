"use client";

import { useState } from "react";

/**
 * AdminTable.jsx
 * CLIENT COMPONENT — Admin panel student allocation table.
 * - Renders all students from the passed `students` prop (dynamically mapped)
 * - Supports live search/filter by name, department, or status
 * - Allows admin to toggle allocation status (simulates approval workflow)
 *
 * Week 9: wire status changes to PATCH /api/students/[id].
 */

const statusConfig = {
  Allocated: { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  Pending:   { color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  Rejected:  { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
};

export default function AdminTable({ students: initialStudents }) {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Toggle allocation status cycle: Pending → Allocated → Rejected → Pending
  const cycleStatus = (id) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const cycle = { Pending: "Allocated", Allocated: "Rejected", Rejected: "Pending" };
        return { ...s, allocationStatus: cycle[s.allocationStatus] };
      })
    );
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "All" || s.allocationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name, roll no, or department…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex gap-2">
          {["All", "Allocated", "Pending", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterStatus === status
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Student", "Roll No", "Department", "Year", "Block / Room", "CGPA", "Status", "Action"].map(
                (col) => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400 text-sm">
                  No students match your search.
                </td>
              </tr>
            ) : (
              filtered.map((student) => {
                const cfg = statusConfig[student.allocationStatus];
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    {/* Student */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${student.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {student.avatar}
                        </div>
                        <span className="font-medium text-gray-900 whitespace-nowrap">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{student.rollNo}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{student.department}</td>
                    <td className="px-4 py-3 text-gray-600">Yr {student.year}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      Block {student.hostelBlock}{student.roomNo ? ` · ${student.roomNo}` : " · —"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.cgpa}</td>
                    {/* Status badge */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {student.allocationStatus}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => cycleStatus(student.id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-right">
        Showing {filtered.length} of {students.length} students
      </p>
    </div>
  );
}
