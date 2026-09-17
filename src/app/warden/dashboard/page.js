"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { mockStudents } from "@/lib/mockStudents";

const mockMaintenanceRequests = [
  { id: 1, room: "A-204", issue: "AC not working", priority: "high", status: "pending", student: "Arjun Kumar", date: "2024-03-15" },
  { id: 2, room: "B-105", issue: "Leaking faucet", priority: "medium", status: "in_progress", student: "Priya Singh", date: "2024-03-14" },
  { id: 3, room: "C-301", issue: "Wi-Fi issues", priority: "low", status: "completed", student: "Ravi Patel", date: "2024-03-13" }
];

const mockRoomData = [
  { id: 1, number: "A-101", block: "A", type: "Double", capacity: 2, occupied: 2, students: ["Arjun Kumar", "Ravi Sharma"] },
  { id: 2, number: "A-102", block: "A", type: "Double", capacity: 2, occupied: 1, students: ["Priya Singh"] },
  { id: 3, number: "A-103", block: "A", type: "Single", capacity: 1, occupied: 1, students: ["Rahul Gupta"] },
  { id: 4, number: "A-104", block: "A", type: "Double", capacity: 2, occupied: 0, students: [] },
];

const mockApplications = [
  { id: 1, name: "Neha Sharma", rollNo: "2022CS023", department: "CSE", status: "pending", priority: 1, appliedDate: "2024-03-10" },
  { id: 2, name: "Vikash Kumar", rollNo: "2022ME015", department: "Mechanical", status: "approved", priority: 2, appliedDate: "2024-03-09" },
  { id: 3, name: "Anjali Gupta", rollNo: "2022EC018", department: "Electronics", status: "pending", priority: 1, appliedDate: "2024-03-08" },
];

const quickStats = [
  { label: "Total Rooms", value: 800, icon: "🏠", color: "bg-blue-500" },
  { label: "Occupied", value: 685, icon: "✅", color: "bg-green-500" },
  { label: "Available", value: 115, icon: "📍", color: "bg-yellow-500" },
  { label: "Maintenance", value: 12, icon: "🔧", color: "bg-red-500" },
];

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800", 
  high: "bg-red-100 text-red-800"
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

export default function WardenDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedBlock, setSelectedBlock] = useState("All");

  const filteredRequests = useMemo(() => {
    return mockMaintenanceRequests.filter(request => {
      if (selectedBlock === "All") return true;
      return request.room.startsWith(selectedBlock);
    });
  }, [selectedBlock]);

  const occupancyRate = Math.round((685 / 800) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Warden Dashboard</h1>
              <p className="text-gray-600 mt-1">LPU Hostel Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">Mr. Rajesh Kumar</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                occupancyRate > 90 ? 'bg-red-100 text-red-800' : 
                occupancyRate > 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {occupancyRate}% Occupancy
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Review Applications", desc: "3 pending applications", href: "/warden/applications", icon: "📝", color: "bg-blue-500" },
              { title: "Room Allocation", desc: "Assign rooms to students", href: "/warden/rooms", icon: "🏠", color: "bg-green-500" },
              { title: "Maintenance Requests", desc: "2 urgent requests", href: "/warden/requests", icon: "🔧", color: "bg-red-500" },
              { title: "Asset Management", desc: "Update inventory", href: "/warden/assets", icon: "📦", color: "bg-purple-500" },
            ].map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className="group block bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 ${action.color} text-white rounded-lg mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-lg">{action.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
                  <Link href="/warden/applications" className="text-blue-600 hover:underline text-sm">
                    View All →
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{app.name}</h3>
                          <p className="text-sm text-gray-600">{app.rollNo} • {app.department}</p>
                          <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Requests */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Urgent Requests</h2>
                  <select
                    value={selectedBlock}
                    onChange={(e) => setSelectedBlock(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="All">All Blocks</option>
                    <option value="A">Block A</option>
                    <option value="B">Block B</option>
                    <option value="C">Block C</option>
                    <option value="D">Block D</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{request.room}</h4>
                          <p className="text-xs text-gray-600">{request.issue}</p>
                          <p className="text-xs text-gray-500">By: {request.student}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[request.priority]}`}>
                          {request.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                          {request.status}
                        </span>
                        <button className="text-blue-600 hover:underline text-xs">
                          Assign
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/warden/requests" className="block text-center text-blue-600 hover:underline text-sm mt-4">
                  View All Requests →
                </Link>
              </div>
            </div>

            {/* Block Occupancy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Block Occupancy</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { block: "Block A", occupied: 185, total: 200, type: "Boys" },
                    { block: "Block B", occupied: 165, total: 180, type: "Boys" },
                    { block: "Block C", occupied: 198, total: 220, type: "Girls" },
                    { block: "Block D", occupied: 175, total: 200, type: "Girls" }
                  ].map((block, idx) => {
                    const occupancyPercent = Math.round((block.occupied / block.total) * 100);
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900">{block.block}</span>
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                              block.type === 'Boys' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                            }`}>
                              {block.type}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {block.occupied}/{block.total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              occupancyPercent > 90 ? 'bg-red-500' : 
                              occupancyPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{width: `${occupancyPercent}%`}}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {occupancyPercent}% occupied • {block.total - block.occupied} available
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Room Changes */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Recent Room Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { action: "Room Allocated", details: "A-204 assigned to Arjun Kumar", time: "2 hours ago", type: "allocation" },
                  { action: "Maintenance Completed", details: "B-105 faucet repair completed", time: "4 hours ago", type: "maintenance" },
                  { action: "Student Check-out", details: "Priya Singh checked out from C-301", time: "1 day ago", type: "checkout" },
                  { action: "Room Transfer", details: "Rahul moved from A-101 to A-203", time: "2 days ago", type: "transfer" }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                      activity.type === 'allocation' ? 'bg-green-500' :
                      activity.type === 'maintenance' ? 'bg-blue-500' :
                      activity.type === 'checkout' ? 'bg-red-500' : 'bg-purple-500'
                    }`}>
                      {activity.type === 'allocation' ? '🏠' :
                       activity.type === 'maintenance' ? '🔧' :
                       activity.type === 'checkout' ? '👋' : '🔄'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{activity.action}</h4>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}