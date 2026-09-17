'use client';

import { useState } from 'react';

// Mock pending requests data
const PENDING_REQUESTS = [
  {
    id: 'REQ-001',
    student: {
      name: 'Rajat Singh',
      regNumber: '12345678',
      email: 'rajat.singh@lpu.in',
      phone: '+91 98765 43210',
      course: 'B.Tech CSE',
      year: '3rd Year'
    },
    preferences: [
      { rank: 1, hostel: 'BH-7', roomType: 'Single AC' },
      { rank: 2, hostel: 'BH-5', roomType: 'Double AC' },
      { rank: 3, hostel: 'BH-3', roomType: 'Single AC' }
    ],
    documents: {
      studentId: { status: 'verified', uploadedAt: '2024-01-15' },
      feeReceipt: { status: 'pending', uploadedAt: '2024-01-16' },
      medicalCert: { status: 'verified', uploadedAt: '2024-01-14' },
      parentConsent: { status: 'rejected', uploadedAt: '2024-01-13', reason: 'Signature unclear' }
    },
    applicationDate: '2024-01-12',
    priority: 'high',
    status: 'under_review'
  },
  {
    id: 'REQ-002',
    student: {
      name: 'Arjun Kumar',
      regNumber: '12345679',
      email: 'arjun.kumar@lpu.in',
      phone: '+91 98765 43211',
      course: 'B.Tech ECE',
      year: '2nd Year'
    },
    preferences: [
      { rank: 1, hostel: 'BH-2', roomType: 'Double Non-AC' },
      { rank: 2, hostel: 'BH-4', roomType: 'Triple AC' },
      { rank: 3, hostel: 'BH-1', roomType: 'Double AC' }
    ],
    documents: {
      studentId: { status: 'verified', uploadedAt: '2024-01-10' },
      feeReceipt: { status: 'verified', uploadedAt: '2024-01-11' },
      medicalCert: { status: 'verified', uploadedAt: '2024-01-09' },
      parentConsent: { status: 'verified', uploadedAt: '2024-01-08' }
    },
    applicationDate: '2024-01-08',
    priority: 'normal',
    status: 'ready_for_allocation'
  },
  {
    id: 'REQ-003',
    student: {
      name: 'Vikram Shah',
      regNumber: '12345680',
      email: 'vikram.shah@lpu.in',
      phone: '+91 98765 43212',
      course: 'BCA',
      year: '1st Year'
    },
    preferences: [
      { rank: 1, hostel: 'BH-6', roomType: 'Triple Non-AC' },
      { rank: 2, hostel: 'BH-8', roomType: 'Double Non-AC' },
      { rank: 3, hostel: 'BH-10', roomType: 'Triple Non-AC' }
    ],
    documents: {
      studentId: { status: 'pending', uploadedAt: '2024-01-17' },
      feeReceipt: { status: 'pending', uploadedAt: null },
      medicalCert: { status: 'pending', uploadedAt: null },
      parentConsent: { status: 'pending', uploadedAt: null }
    },
    applicationDate: '2024-01-17',
    priority: 'normal',
    status: 'incomplete_documents'
  }
];

const REQUEST_STATUS = {
  'under_review': { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
  'ready_for_allocation': { color: 'bg-green-100 text-green-800', label: 'Ready for Allocation' },
  'incomplete_documents': { color: 'bg-red-100 text-red-800', label: 'Incomplete Documents' },
  'allocated': { color: 'bg-blue-100 text-blue-800', label: 'Allocated' },
  'rejected': { color: 'bg-gray-100 text-gray-800', label: 'Rejected' }
};

const DOCUMENT_STATUS = {
  'verified': { color: 'text-green-600', icon: '✓', label: 'Verified' },
  'pending': { color: 'text-yellow-600', icon: '⏳', label: 'Pending Review' },
  'rejected': { color: 'text-red-600', icon: '✗', label: 'Rejected' }
};

export default function RequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort requests
  const filteredRequests = PENDING_REQUESTS.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.student.regNumber.includes(searchQuery) ||
                         request.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      case 'priority':
        return a.priority === 'high' ? -1 : 1;
      case 'name':
        return a.student.name.localeCompare(b.student.name);
      default:
        return 0;
    }
  });

  const handleApproveRequest = (requestId) => {
    console.log('Approving request:', requestId);
    alert(`Request ${requestId} approved and allocated!`);
    setSelectedRequest(null);
  };

  const handleRejectRequest = (requestId, reason) => {
    console.log('Rejecting request:', requestId, 'Reason:', reason);
    alert(`Request ${requestId} rejected. Reason: ${reason}`);
    setSelectedRequest(null);
  };

  const getDocumentProgress = (documents) => {
    const total = Object.keys(documents).length;
    const verified = Object.values(documents).filter(doc => doc.status === 'verified').length;
    return { verified, total, percentage: Math.round((verified / total) * 100) };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Student Applications</h1>
            <p className="text-gray-600">
              Review and process hostel allocation requests
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 4:</span>
            <span>Room Allocation & Requests</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Applications', value: PENDING_REQUESTS.length, color: 'bg-blue-50 border-blue-200 text-blue-900' },
          { label: 'Ready for Allocation', value: PENDING_REQUESTS.filter(r => r.status === 'ready_for_allocation').length, color: 'bg-green-50 border-green-200 text-green-900' },
          { label: 'Under Review', value: PENDING_REQUESTS.filter(r => r.status === 'under_review').length, color: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
          { label: 'Incomplete Docs', value: PENDING_REQUESTS.filter(r => r.status === 'incomplete_documents').length, color: 'bg-red-50 border-red-200 text-red-900' }
        ].map((stat, index) => (
          <div key={index} className={`border-2 rounded-xl p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Applications
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name, Reg No, or Request ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="under_review">Under Review</option>
              <option value="ready_for_allocation">Ready for Allocation</option>
              <option value="incomplete_documents">Incomplete Documents</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="date">Application Date</option>
              <option value="priority">Priority</option>
              <option value="name">Student Name</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterStatus('all');
                setSearchQuery('');
                setSortBy('date');
              }}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>

        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{sortedRequests.length}</span> applications
          {searchQuery && (
            <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
          )}
        </p>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Top Preference
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedRequests.map((request) => {
                const docProgress = getDocumentProgress(request.documents);
                const statusConfig = REQUEST_STATUS[request.status];
                
                return (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{request.student.name}</p>
                        <p className="text-sm text-gray-600">{request.student.regNumber}</p>
                        <p className="text-xs text-gray-500">{request.student.course}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{request.id}</span>
                        {request.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{request.preferences[0].hostel}</p>
                      <p className="text-sm text-gray-600">{request.preferences[0].roomType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              docProgress.percentage === 100 ? 'bg-green-500' :
                              docProgress.percentage > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{width: `${docProgress.percentage}%`}}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          {docProgress.verified}/{docProgress.total}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(request.applicationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-sm bg-lpu-navy text-white px-3 py-1 rounded hover:bg-lpu-gold transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRequest.student.name}</h2>
                  <p className="text-gray-600">Request ID: {selectedRequest.id}</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Student Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-600">Registration:</span> {selectedRequest.student.regNumber}</div>
                  <div><span className="text-gray-600">Email:</span> {selectedRequest.student.email}</div>
                  <div><span className="text-gray-600">Phone:</span> {selectedRequest.student.phone}</div>
                  <div><span className="text-gray-600">Course:</span> {selectedRequest.student.course} - {selectedRequest.student.year}</div>
                </div>
              </div>

              {/* Hostel Preferences */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Hostel Preferences</h3>
                <div className="space-y-2">
                  {selectedRequest.preferences.map((pref) => (
                    <div key={pref.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-lpu-navy text-white rounded-full text-xs flex items-center justify-center font-bold">
                          {pref.rank}
                        </span>
                        <span className="font-semibold">{pref.hostel}</span>
                      </div>
                      <span className="text-sm text-gray-600">{pref.roomType}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Document Verification</h3>
                <div className="space-y-3">
                  {Object.entries(selectedRequest.documents).map(([docType, doc]) => {
                    const statusConfig = DOCUMENT_STATUS[doc.status];
                    return (
                      <div key={docType} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg ${statusConfig.color}`}>{statusConfig.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {docType.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            {doc.reason && (
                              <p className="text-xs text-red-600">{doc.reason}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-semibold ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                          {doc.uploadedAt && (
                            <p className="text-xs text-gray-500">
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleRejectRequest(selectedRequest.id, 'Documents incomplete')}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleApproveRequest(selectedRequest.id)}
                  disabled={selectedRequest.status !== 'ready_for_allocation'}
                  className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                    selectedRequest.status === 'ready_for_allocation'
                      ? 'bg-lpu-gold hover:bg-lpu-gold/90 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Approve & Allocate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}