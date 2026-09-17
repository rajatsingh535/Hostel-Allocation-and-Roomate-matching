'use client';

import { useState } from 'react';

// Mock maintenance requests data
const MAINTENANCE_REQUESTS = [
  {
    id: 'MNT-001',
    title: 'AC Not Working',
    description: 'The air conditioning in my room has stopped working. It was making strange noises yesterday and now it won\'t turn on at all.',
    category: 'electrical',
    priority: 'high',
    status: 'in_progress',
    location: 'BH1-A101',
    submittedDate: '2024-01-15',
    assignedTo: 'HVAC Team',
    estimatedCompletion: '2024-01-17',
    updates: [
      { date: '2024-01-15', message: 'Request received and assigned to HVAC team', by: 'System' },
      { date: '2024-01-16', message: 'Technician inspected the unit. Compressor needs replacement.', by: 'HVAC Technician' }
    ]
  },
  {
    id: 'MNT-002',
    title: 'Broken Study Table',
    description: 'The study table in my room is wobbly and one of the legs appears to be damaged.',
    category: 'furniture',
    priority: 'medium',
    status: 'completed',
    location: 'BH1-A101',
    submittedDate: '2024-01-10',
    assignedTo: 'Furniture Team',
    completedDate: '2024-01-12',
    updates: [
      { date: '2024-01-10', message: 'Request received', by: 'System' },
      { date: '2024-01-11', message: 'Carpenter will visit tomorrow morning', by: 'Maintenance Supervisor' },
      { date: '2024-01-12', message: 'Table leg repaired and tightened. Issue resolved.', by: 'Carpenter' }
    ]
  },
  {
    id: 'MNT-003',
    title: 'Water Leakage in Bathroom',
    description: 'There is a small leak in the bathroom tap that needs immediate attention.',
    category: 'plumbing',
    priority: 'medium',
    status: 'open',
    location: 'BH1-A101',
    submittedDate: '2024-01-18',
    assignedTo: null,
    updates: [
      { date: '2024-01-18', message: 'Request submitted and under review', by: 'System' }
    ]
  }
];

// Mock notifications data
const NOTIFICATIONS = [
  {
    id: 'NOTIF-001',
    title: 'Hostel Allocation Results Published',
    message: 'Your hostel allocation for Academic Year 2024-25 has been published. Check your allocation status.',
    type: 'allocation',
    priority: 'high',
    timestamp: '2024-01-20 10:30',
    read: false,
    actionUrl: '/student/allocation'
  },
  {
    id: 'NOTIF-002',
    title: 'Maintenance Request Update',
    message: 'Your maintenance request MNT-001 (AC Not Working) has been updated. Technician will visit tomorrow.',
    type: 'maintenance',
    priority: 'medium',
    timestamp: '2024-01-19 14:20',
    read: false,
    actionUrl: null
  },
  {
    id: 'NOTIF-003',
    title: 'Roommate Request Accepted',
    message: 'Arjun Kumar has accepted your roommate request. You can now proceed with shared room allocation.',
    type: 'roommate',
    priority: 'medium',
    timestamp: '2024-01-18 16:45',
    read: true,
    actionUrl: '/student/roommate'
  },
  {
    id: 'NOTIF-004',
    title: 'Monthly Hostel Fee Due',
    message: 'Your monthly hostel fee of ₹8,500 is due on January 25, 2024. Please make payment to avoid late charges.',
    type: 'payment',
    priority: 'high',
    timestamp: '2024-01-17 09:00',
    read: true,
    actionUrl: '/student/payments'
  },
  {
    id: 'NOTIF-005',
    title: 'Hostel Maintenance Schedule',
    message: 'Routine maintenance will be conducted in BH1-Block A on January 22, 2024 from 9 AM to 12 PM.',
    type: 'announcement',
    priority: 'low',
    timestamp: '2024-01-16 11:30',
    read: true,
    actionUrl: null
  }
];

const ISSUE_CATEGORIES = [
  { id: 'electrical', name: 'Electrical', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'plumbing', name: 'Plumbing', icon: '🚿', color: 'bg-blue-100 text-blue-800' },
  { id: 'furniture', name: 'Furniture', icon: '🪑', color: 'bg-brown-100 text-brown-800' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧽', color: 'bg-green-100 text-green-800' },
  { id: 'security', name: 'Security', icon: '🔒', color: 'bg-red-100 text-red-800' },
  { id: 'other', name: 'Other', icon: '🔧', color: 'bg-gray-100 text-gray-800' }
];

const PRIORITY_LEVELS = [
  { id: 'low', name: 'Low', color: 'bg-gray-100 text-gray-800' },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'high', name: 'High', color: 'bg-orange-100 text-orange-800' },
  { id: 'urgent', name: 'Urgent', color: 'bg-red-100 text-red-800' }
];

const STATUS_CONFIG = {
  'open': { color: 'bg-red-100 text-red-800', label: 'Open' },
  'in_progress': { color: 'bg-yellow-100 text-yellow-800', label: 'In Progress' },
  'completed': { color: 'bg-green-100 text-green-800', label: 'Completed' },
  'cancelled': { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' }
};

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'electrical',
    priority: 'medium'
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterNotificationType, setFilterNotificationType] = useState('all');

  // Filter requests by status
  const filteredRequests = MAINTENANCE_REQUESTS.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  // Filter notifications by type and read status
  const filteredNotifications = NOTIFICATIONS.filter(notification => {
    if (filterNotificationType === 'all') return true;
    if (filterNotificationType === 'unread') return !notification.read;
    return notification.type === filterNotificationType;
  });

  const submitMaintenanceRequest = () => {
    console.log('Submitting maintenance request:', newRequest);
    alert('Maintenance request submitted successfully!');
    setShowNewRequestModal(false);
    setNewRequest({ title: '', description: '', category: 'electrical', priority: 'medium' });
  };

  const markNotificationAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'allocation': return '🏠';
      case 'maintenance': return '🔧';
      case 'roommate': return '👥';
      case 'payment': return '💳';
      case 'announcement': return '📢';
      default: return '📄';
    }
  };

  const getNotificationTypeColor = (type) => {
    switch (type) {
      case 'allocation': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'roommate': return 'bg-purple-100 text-purple-800';
      case 'payment': return 'bg-red-100 text-red-800';
      case 'announcement': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Maintenance & Notifications</h1>
            <p className="text-gray-600">
              Report issues, track maintenance requests, and stay updated with notifications
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 7:</span>
            <span>Maintenance & Notifications</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex space-x-2">
          {[
            { id: 'requests', label: 'My Requests', icon: '🔧', count: MAINTENANCE_REQUESTS.length },
            { id: 'notifications', label: 'Notifications', icon: '🔔', count: NOTIFICATIONS.filter(n => !n.read).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-lpu-gold text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-lpu-gold text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="all">All Requests</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="px-6 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg transition-colors"
            >
              + New Request
            </button>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const statusConfig = STATUS_CONFIG[request.status];
              const categoryConfig = ISSUE_CATEGORIES.find(cat => cat.id === request.category);
              const priorityConfig = PRIORITY_LEVELS.find(p => p.id === request.priority);
              
              return (
                <div
                  key={request.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {request.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600">
                              {request.id} • {request.location}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryConfig?.color || 'bg-gray-100 text-gray-800'}`}>
                            {categoryConfig?.icon} {categoryConfig?.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityConfig?.color}`}>
                            {priorityConfig?.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                        {request.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                        </span>
                        {request.assignedTo && (
                          <span>Assigned to: {request.assignedTo}</span>
                        )}
                        {request.estimatedCompletion && (
                          <span>Expected: {new Date(request.estimatedCompletion).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 bg-lpu-navy text-white text-sm font-semibold rounded-lg hover:bg-lpu-gold transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No maintenance requests</h3>
              <p className="text-gray-600 mb-4">
                You haven't submitted any maintenance requests yet.
              </p>
              <button
                onClick={() => setShowNewRequestModal(true)}
                className="px-6 py-2 bg-lpu-gold text-white font-semibold rounded-lg hover:bg-lpu-gold/90 transition-colors"
              >
                Submit Your First Request
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex items-center gap-4">
            <select
              value={filterNotificationType}
              onChange={(e) => setFilterNotificationType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="allocation">Allocation</option>
              <option value="maintenance">Maintenance</option>
              <option value="roommate">Roommate</option>
              <option value="payment">Payment</option>
              <option value="announcement">Announcements</option>
            </select>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 transition-all cursor-pointer hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-lpu-gold' : ''
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      !notification.read ? 'bg-lpu-gold text-white' : 'bg-gray-100'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getNotificationTypeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-lpu-gold rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-xs text-lpu-navy hover:text-lpu-gold font-semibold"
                        >
                          Take Action →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                You're all caught up! No new notifications to show.
              </p>
            </div>
          )}
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Maintenance Request</h2>
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newRequest.category}
                    onChange={(e) => setNewRequest({ ...newRequest, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
                  >
                    {ISSUE_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
                  >
                    {PRIORITY_LEVELS.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Please provide a detailed description of the issue, including when it started and any relevant details..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
                />
              </div>

            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitMaintenanceRequest}
                disabled={!newRequest.title || !newRequest.description}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  newRequest.title && newRequest.description
                    ? 'bg-lpu-gold hover:bg-lpu-gold/90 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRequest.title}</h2>
                  <p className="text-gray-600">{selectedRequest.id} • {selectedRequest.location}</p>
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
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Request Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800">{selectedRequest.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Status Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Status:</span> {STATUS_CONFIG[selectedRequest.status].label}</div>
                    <div><span className="text-gray-600">Priority:</span> {PRIORITY_LEVELS.find(p => p.id === selectedRequest.priority)?.name}</div>
                    <div><span className="text-gray-600">Category:</span> {ISSUE_CATEGORIES.find(c => c.id === selectedRequest.category)?.name}</div>
                    <div><span className="text-gray-600">Submitted:</span> {new Date(selectedRequest.submittedDate).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Assignment</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600">Assigned To:</span> {selectedRequest.assignedTo || 'Not assigned'}</div>
                    {selectedRequest.estimatedCompletion && (
                      <div><span className="text-gray-600">Expected Completion:</span> {new Date(selectedRequest.estimatedCompletion).toLocaleDateString()}</div>
                    )}
                    {selectedRequest.completedDate && (
                      <div><span className="text-gray-600">Completed:</span> {new Date(selectedRequest.completedDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
              </div>

              {selectedRequest.updates && selectedRequest.updates.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Update History</h3>
                  <div className="space-y-3">
                    {selectedRequest.updates.map((update, index) => (
                      <div key={index} className="border-l-2 border-lpu-gold pl-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{update.by}</span>
                          <span className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}