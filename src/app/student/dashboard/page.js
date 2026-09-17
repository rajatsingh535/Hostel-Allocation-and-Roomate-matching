"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { mockStudents } from "@/lib/mockStudents";

const applicationStatus = {
  pending: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: "✅" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: "❌" },
  allocated: { label: "Room Allocated", color: "bg-blue-100 text-blue-800", icon: "🏠" },
};

const quickActions = [
  { title: "Apply for Hostel", desc: "Submit new application", href: "/student/application", icon: "📝", color: "bg-blue-500" },
  { title: "Find Roommate", desc: "Browse compatible students", href: "/student/roommate", icon: "👥", color: "bg-green-500" },
  { title: "View Hostels", desc: "Explore available blocks", href: "/student/hostels", icon: "🏢", color: "bg-purple-500" },
  { title: "Maintenance Request", desc: "Report issues", href: "/student/maintenance", icon: "🔧", color: "bg-orange-500" },
];

const notices = [
  { title: "Room Allocation Results", content: "Phase 1 results announced. Check your status.", date: "2024-03-15", type: "important" },
  { title: "Mess Fee Payment", content: "Pay your mess fees before March 30th", date: "2024-03-10", type: "reminder" },
  { title: "Hostel Guidelines", content: "New guidelines for visitors", date: "2024-03-05", type: "info" },
];

export default function StudentDashboard() {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading current student from localStorage/session
    setTimeout(() => {
      const student = mockStudents[0]; // Mock current student
      setCurrentStudent({
        ...student,
        applicationStatus: "allocated",
        roomNumber: "A-204",
        block: "Block A",
        roommate: mockStudents[1]?.name || "Not assigned"
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {currentStudent?.name} 👋
              </h1>
              <p className="text-gray-600">
                {currentStudent?.department} • {currentStudent?.year}rd Year • Roll: {currentStudent?.rollNo}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/student/profile"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Application Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Application Status</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{applicationStatus.allocated.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${applicationStatus.allocated.color}`}>
                        {applicationStatus.allocated.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Room {currentStudent?.roomNumber}</h3>
                    <p className="text-gray-600">{currentStudent?.block} • Boys Hostel</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Allocated on</p>
                    <p className="font-semibold text-gray-900">March 15, 2024</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Roommate:</span>
                      <p className="font-medium text-gray-900">{currentStudent?.roommate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Room Type:</span>
                      <p className="font-medium text-gray-900">Double Sharing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    className="group flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 ${action.color} text-white rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                      <span>{action.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-600 text-lg">✅</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Room Allocated</p>
                    <p className="text-xs text-gray-600">March 15, 2024 • 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-600 text-lg">📝</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Application Approved</p>
                    <p className="text-xs text-gray-600">March 12, 2024 • 10:15 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-yellow-600 text-lg">⏳</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                    <p className="text-xs text-gray-600">March 10, 2024 • 4:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {currentStudent?.name?.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{currentStudent?.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{currentStudent?.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{currentStudent?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year:</span>
                    <span className="font-medium">{currentStudent?.year}rd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">CGPA:</span>
                    <span className="font-medium">{currentStudent?.cgpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hometown:</span>
                    <span className="font-medium">{currentStudent?.hometown}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Important Notices</h2>
              <div className="space-y-3">
                {notices.map((notice, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    notice.type === 'important' ? 'bg-red-50 border-red-200' :
                    notice.type === 'reminder' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <h4 className="font-semibold text-gray-900 text-sm">{notice.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notice.content}</p>
                    <p className="text-xs text-gray-500 mt-2">{notice.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact hostel administration for any queries or issues.
              </p>
              <Link
                href="/student/maintenance"
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}