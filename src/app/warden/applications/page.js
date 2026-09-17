"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const mockApplications = [
  {
    id: 1,
    name: "Neha Sharma",
    rollNo: "2022CS023", 
    email: "neha.sharma@student.lpu.co.in",
    phone: "+91 98765-43210",
    department: "Computer Science",
    year: 2,
    gender: "Female",
    cgpa: 8.5,
    status: "pending",
    priority: 1,
    appliedDate: "2024-03-10",
    preferences: {
      roomType: "Double",
      blocks: ["Block C", "Block D"],
      sleepSchedule: "Early Bird",
      studyHabits: "Solo Study"
    },
    documents: {
      photo: true,
      idProof: true,
      medicalCert: true,
      feeReceipt: false
    },
    hometown: "Delhi",
    parentContact: "+91 98765-43200"
  },
  {
    id: 2,
    name: "Vikash Kumar",
    rollNo: "2022ME015",
    email: "vikash.kumar@student.lpu.co.in", 
    phone: "+91 87654-32109",
    department: "Mechanical Engineering",
    year: 2,
    gender: "Male", 
    cgpa: 7.8,
    status: "approved",
    priority: 2,
    appliedDate: "2024-03-09",
    preferences: {
      roomType: "Single",
      blocks: ["Block A", "Block B"],
      sleepSchedule: "Night Owl",
      studyHabits: "Group Study"
    },
    documents: {
      photo: true,
      idProof: true,
      medicalCert: true,
      feeReceipt: true
    },
    hometown: "Patna",
    parentContact: "+91 87654-32100",
    approvedDate: "2024-03-11",
    allocatedRoom: "A-205"
  },
  {
    id: 3,
    name: "Anjali Gupta",
    rollNo: "2022EC018",
    email: "anjali.gupta@student.lpu.co.in",
    phone: "+91 76543-21098", 
    department: "Electronics & Communication",
    year: 2,
    gender: "Female",
    cgpa: 9.1,
    status: "pending",
    priority: 1,
    appliedDate: "2024-03-08",
    preferences: {
      roomType: "Double", 
      blocks: ["Block C"],
      sleepSchedule: "Normal",
      studyHabits: "Flexible"
    },
    documents: {
      photo: true,
      idProof: true,
      medicalCert: false,
      feeReceipt: true
    },
    hometown: "Mumbai",
    parentContact: "+91 76543-21000"
  },
  {
    id: 4,
    name: "Rohit Singh",
    rollNo: "2022CS089",
    email: "rohit.singh@student.lpu.co.in",
    phone: "+91 65432-10987",
    department: "Computer Science", 
    year: 3,
    gender: "Male",
    cgpa: 8.2,
    status: "rejected",
    priority: 3,
    appliedDate: "2024-03-07",
    preferences: {
      roomType: "Single",
      blocks: ["Block A"], 
      sleepSchedule: "Night Owl",
      studyHabits: "Solo Study"
    },
    documents: {
      photo: false,
      idProof: true,
      medicalCert: true,
      feeReceipt: false
    },
    hometown: "Chandigarh",
    parentContact: "+91 65432-10900",
    rejectedDate: "2024-03-12",
    rejectionReason: "Incomplete documentation"
  }
];

const statusConfig = {
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: "✅" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: "❌" },
  allocated: { label: "Room Allocated", color: "bg-blue-100 text-blue-800", icon: "🏠" }
};

const ApplicationCard = ({ application, onStatusChange, onViewDetails }) => {
  const status = statusConfig[application.status];
  const docsComplete = Object.values(application.documents).every(Boolean);
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {application.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{application.name}</h3>
            <p className="text-gray-600">{application.rollNo} • {application.department}</p>
            <p className="text-sm text-gray-500">Year {application.year} • CGPA: {application.cgpa}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.icon} {status.label}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            application.priority === 1 ? 'bg-red-100 text-red-700' :
            application.priority === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            P{application.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Applied:</span>
          <div className="font-medium">{application.appliedDate}</div>
        </div>
        <div>
          <span className="text-gray-500">Room Type:</span>
          <div className="font-medium">{application.preferences.roomType}</div>
        </div>
        <div>
          <span className="text-gray-500">Preferred Blocks:</span>
          <div className="font-medium">{application.preferences.blocks.join(", ")}</div>
        </div>
        <div>
          <span className="text-gray-500">Documents:</span>
          <div className={`font-medium ${docsComplete ? 'text-green-600' : 'text-red-600'}`}>
            {docsComplete ? '✅ Complete' : '❌ Incomplete'}
          </div>
        </div>
      </div>

      {application.status === 'approved' && application.allocatedRoom && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="text-green-800 text-sm">
            🏠 Allocated to Room: <strong>{application.allocatedRoom}</strong>
          </div>
        </div>
      )}

      {application.status === 'rejected' && application.rejectionReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="text-red-800 text-sm">
            ❌ Rejection Reason: <strong>{application.rejectionReason}</strong>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>📧 {application.email}</span>
          <span>•</span>
          <span>📱 {application.phone}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(application)}
            className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Details
          </button>
          {application.status === 'pending' && (
            <>
              <button
                onClick={() => onStatusChange(application.id, 'approved')}
                className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onStatusChange(application.id, 'rejected')}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ApplicationDetailsModal = ({ application, onClose, onStatusChange }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {application.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
                <p className="text-gray-600">{application.rollNo} • {application.department}</p>
                <p className="text-sm text-gray-500">Year {application.year} • CGPA: {application.cgpa}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Email:</span>
                  <span className="col-span-2 font-medium">{application.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Phone:</span>
                  <span className="col-span-2 font-medium">{application.phone}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Gender:</span>
                  <span className="col-span-2 font-medium">{application.gender}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Hometown:</span>
                  <span className="col-span-2 font-medium">{application.hometown}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Parent Contact:</span>
                  <span className="col-span-2 font-medium">{application.parentContact}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Applied Date:</span>
                  <span className="col-span-2 font-medium">{application.appliedDate}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Priority Level:</span>
                  <span className={`col-span-2 font-medium ${
                    application.priority === 1 ? 'text-red-600' :
                    application.priority === 2 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    Priority {application.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Preferences</h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Room Type:</span>
                  <span className="col-span-2 font-medium">{application.preferences.roomType}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Preferred Blocks:</span>
                  <span className="col-span-2 font-medium">{application.preferences.blocks.join(", ")}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Sleep Schedule:</span>
                  <span className="col-span-2 font-medium">{application.preferences.sleepSchedule}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-500">Study Habits:</span>
                  <span className="col-span-2 font-medium">{application.preferences.studyHabits}</span>
                </div>
              </div>
            </div>

            {/* Document Status */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(application.documents).map(([doc, status]) => (
                  <div key={doc} className={`p-3 rounded-lg border ${status ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className={`text-sm font-medium ${status ? 'text-green-800' : 'text-red-800'}`}>
                      {status ? '✅' : '❌'} {doc.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Information */}
            {(application.status === 'approved' || application.status === 'rejected') && (
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
                {application.status === 'approved' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-green-800">
                      <div className="font-semibold mb-2">✅ Application Approved</div>
                      <div className="text-sm">Approved on: {application.approvedDate}</div>
                      {application.allocatedRoom && (
                        <div className="text-sm">Allocated Room: <strong>{application.allocatedRoom}</strong></div>
                      )}
                    </div>
                  </div>
                )}
                {application.status === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800">
                      <div className="font-semibold mb-2">❌ Application Rejected</div>
                      <div className="text-sm">Rejected on: {application.rejectedDate}</div>
                      <div className="text-sm">Reason: {application.rejectionReason}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            {application.status === 'pending' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    onStatusChange(application.id, 'rejected');
                    onClose();
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => {
                    onStatusChange(application.id, 'approved');
                    onClose();
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WardenApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    priority: "all",
    documents: "all",
    search: ""
  });
  const [sortBy, setSortBy] = useState("appliedDate");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = useMemo(() => {
    let result = applications.filter(app => {
      if (filters.status !== "all" && app.status !== filters.status) return false;
      if (filters.department !== "all" && app.department !== filters.department) return false;
      if (filters.priority !== "all" && app.priority.toString() !== filters.priority) return false;
      if (filters.documents !== "all") {
        const docsComplete = Object.values(app.documents).every(Boolean);
        if (filters.documents === "complete" && !docsComplete) return false;
        if (filters.documents === "incomplete" && docsComplete) return false;
      }
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        return app.name.toLowerCase().includes(q) || 
               app.rollNo.toLowerCase().includes(q) ||
               app.email.toLowerCase().includes(q);
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === "appliedDate") return new Date(b.appliedDate) - new Date(a.appliedDate);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priority") return a.priority - b.priority;
      if (sortBy === "cgpa") return b.cgpa - a.cgpa;
      return 0;
    });

    return result;
  }, [applications, filters, sortBy]);

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === id 
        ? { 
            ...app, 
            status: newStatus,
            ...(newStatus === 'approved' ? { approvedDate: new Date().toISOString().split('T')[0] } : {}),
            ...(newStatus === 'rejected' ? { rejectedDate: new Date().toISOString().split('T')[0], rejectionReason: 'Documents incomplete' } : {})
          }
        : app
    ));
  };

  const departments = [...new Set(applications.map(app => app.department))];
  const statsData = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
              <p className="text-gray-600 mt-1">Review and manage hostel applications</p>
            </div>
            <Link
              href="/warden/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{statsData.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                📝
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{statsData.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl">
                ⏳
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{statsData.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                ✅
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{statsData.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">
                ❌
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search applications..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <select
                value={filters.department}
                onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="1">Priority 1</option>
                <option value="2">Priority 2</option>
                <option value="3">Priority 3</option>
              </select>
            </div>
            <div>
              <select
                value={filters.documents}
                onChange={(e) => setFilters(prev => ({ ...prev, documents: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Documents</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="appliedDate">Applied Date</option>
                <option value="name">Name</option>
                <option value="priority">Priority</option>
                <option value="cgpa">CGPA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredApplications.length} of {applications.length} applications
          </p>
          <button
            onClick={() => setFilters({
              status: "all",
              department: "all", 
              priority: "all",
              documents: "all",
              search: ""
            })}
            className="text-blue-600 hover:underline text-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more applications</p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onStatusChange={handleStatusChange}
                onViewDetails={setSelectedApplication}
              />
            ))
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}