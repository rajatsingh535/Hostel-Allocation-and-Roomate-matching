"use client";
import { useState } from "react";
import Link from "next/link";

const issueCategories = [
  { id: "electrical", label: "Electrical Issues", icon: "⚡", color: "bg-yellow-500" },
  { id: "plumbing", label: "Plumbing", icon: "🚿", color: "bg-blue-500" },
  { id: "furniture", label: "Furniture", icon: "🪑", color: "bg-brown-500" },
  { id: "cleanliness", label: "Cleanliness", icon: "🧹", color: "bg-green-500" },
  { id: "security", label: "Security", icon: "🔒", color: "bg-red-500" },
  { id: "internet", label: "Internet/Wi-Fi", icon: "📶", color: "bg-purple-500" },
  { id: "roommate", label: "Roommate Issues", icon: "👥", color: "bg-orange-500" },
  { id: "other", label: "Other", icon: "📝", color: "bg-gray-500" },
];

const priorityLevels = [
  { id: "low", label: "Low", color: "text-green-600 bg-green-100", desc: "Non-urgent, can wait a few days" },
  { id: "medium", label: "Medium", color: "text-yellow-600 bg-yellow-100", desc: "Needs attention within 1-2 days" },
  { id: "high", label: "High", color: "text-orange-600 bg-orange-100", desc: "Urgent, needs immediate attention" },
  { id: "emergency", label: "Emergency", color: "text-red-600 bg-red-100", desc: "Safety concern, immediate action required" },
];

const mockRequests = [
  {
    id: 1,
    title: "Broken AC in Room A-204",
    category: "electrical",
    priority: "high",
    status: "in_progress",
    description: "Air conditioning unit stopped working, room getting very hot",
    submittedDate: "2024-03-15",
    lastUpdate: "2024-03-16",
    assignedTo: "Maintenance Team A",
    estimatedCompletion: "2024-03-17"
  },
  {
    id: 2,
    title: "Weak Wi-Fi Signal",
    category: "internet",
    priority: "medium",
    status: "pending",
    description: "Internet connection is very slow in our room",
    submittedDate: "2024-03-14",
    lastUpdate: "2024-03-14"
  },
  {
    id: 3,
    title: "Leaking Faucet",
    category: "plumbing",
    priority: "low",
    status: "completed",
    description: "Bathroom faucet has been dripping continuously",
    submittedDate: "2024-03-10",
    lastUpdate: "2024-03-12",
    completedDate: "2024-03-12",
    resolution: "Faucet washer replaced"
  }
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: "🔧" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: "✅" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: "❌" }
};

export default function MaintenanceRequests() {
  const [activeTab, setActiveTab] = useState("requests"); // requests, new, contact
  const [newRequest, setNewRequest] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    images: [],
    contactPreference: "email",
    urgentContact: ""
  });
  const [requests, setRequests] = useState(mockRequests);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const request = {
      id: requests.length + 1,
      ...newRequest,
      status: "pending",
      submittedDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0]
    };
    setRequests([request, ...requests]);
    setNewRequest({
      title: "",
      category: "",
      priority: "",
      description: "",
      images: [],
      contactPreference: "email",
      urgentContact: ""
    });
    setActiveTab("requests");
    alert("Request submitted successfully! You will receive updates via email.");
  };

  const handleFileUpload = (files) => {
    setNewRequest(prev => ({
      ...prev,
      images: [...prev.images, ...Array.from(files)]
    }));
  };

  const renderRequestsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Your Maintenance Requests</h2>
        <button
          onClick={() => setActiveTab("new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{requests.length}</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {requests.filter(r => r.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {requests.filter(r => r.status === "in_progress").length}
          </div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">
            {requests.filter(r => r.status === "completed").length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => {
          const category = issueCategories.find(cat => cat.id === request.category);
          const priority = priorityLevels.find(p => p.id === request.priority);
          const status = statusConfig[request.status];

          return (
            <div key={request.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 ${category?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center text-white text-lg`}>
                    {category?.icon || "📝"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{request.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Submitted: {request.submittedDate}</span>
                      <span>•</span>
                      <span>Updated: {request.lastUpdate}</span>
                      {request.assignedTo && (
                        <>
                          <span>•</span>
                          <span>Assigned to: {request.assignedTo}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                      {priority.label}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.icon} {status.label}
                  </span>
                </div>
              </div>

              {request.status === "in_progress" && request.estimatedCompletion && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                  <div className="flex items-center text-blue-800">
                    <span className="text-sm">🔧 Estimated completion: {request.estimatedCompletion}</span>
                  </div>
                </div>
              )}

              {request.status === "completed" && request.resolution && (
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                  <div className="flex items-center text-green-800">
                    <span className="text-sm">✅ Resolution: {request.resolution}</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Completed on: {request.completedDate}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Category: {category?.label}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                    View Details
                  </button>
                  {request.status === "pending" && (
                    <button className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNewRequestTab = () => (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Submit New Request</h2>
        <button
          onClick={() => setActiveTab("requests")}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Requests
        </button>
      </div>

      <form onSubmit={handleSubmitRequest} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Request Title *</label>
          <input
            type="text"
            value={newRequest.title}
            onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Brief description of the issue"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
            <div className="grid grid-cols-2 gap-2">
              {issueCategories.map((category) => (
                <label key={category.id} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={newRequest.category === category.id}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  <div className="ml-3 flex items-center">
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{category.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Priority *</label>
            <div className="space-y-2">
              {priorityLevels.map((priority) => (
                <label key={priority.id} className="flex items-start p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="priority"
                    value={priority.id}
                    checked={newRequest.priority === priority.id}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-0.5"
                    required
                  />
                  <div className="ml-3">
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${priority.color} mb-1`}>
                      {priority.label}
                    </div>
                    <div className="text-xs text-gray-600">{priority.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
          <textarea
            value={newRequest.description}
            onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Please provide detailed information about the issue, including location (room number), when it started, and any other relevant details..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-400 mb-2">📷</div>
              <div className="text-sm text-gray-600">Click to upload images or drag and drop</div>
              <div className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</div>
            </label>
            {newRequest.images.length > 0 && (
              <div className="mt-4 text-sm text-green-600">
                {newRequest.images.length} file(s) selected
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Preference</label>
            <select
              value={newRequest.contactPreference}
              onChange={(e) => setNewRequest(prev => ({ ...prev, contactPreference: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="email">Email Updates</option>
              <option value="sms">SMS Updates</option>
              <option value="both">Both Email & SMS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgent Contact Number (Optional)
            </label>
            <input
              type="tel"
              value={newRequest.urgentContact}
              onChange={(e) => setNewRequest(prev => ({ ...prev, urgentContact: e.target.value }))}
              placeholder="For emergency issues only"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Emergency issues will be addressed immediately</li>
            <li>• Regular maintenance requests are typically resolved within 2-3 business days</li>
            <li>• You will receive email updates about your request status</li>
            <li>• For urgent issues outside office hours, contact security at ext. 911</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );

  const renderContactTab = () => (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Support</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">🏢 Hostel Administration</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 font-medium">+91 1824-517-000</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-medium">hostel@lpu.co.in</span>
            </div>
            <div>
              <span className="text-gray-600">Office Hours:</span>
              <span className="ml-2 font-medium">9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className="text-gray-600">Location:</span>
              <span className="ml-2 font-medium">Admin Block, Ground Floor</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">🔧 Maintenance Team</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Emergency:</span>
              <span className="ml-2 font-medium text-red-600">Ext. 911</span>
            </div>
            <div>
              <span className="text-gray-600">General Issues:</span>
              <span className="ml-2 font-medium">Ext. 1234</span>
            </div>
            <div>
              <span className="text-gray-600">Available:</span>
              <span className="ml-2 font-medium">24/7 for emergencies</span>
            </div>
            <div>
              <span className="text-gray-600">Response Time:</span>
              <span className="ml-2 font-medium">2-4 hours (urgent)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">🛡️ Security</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Emergency:</span>
              <span className="ml-2 font-medium text-red-600">Ext. 100</span>
            </div>
            <div>
              <span className="text-gray-600">General:</span>
              <span className="ml-2 font-medium">Ext. 101</span>
            </div>
            <div>
              <span className="text-gray-600">Available:</span>
              <span className="ml-2 font-medium">24/7</span>
            </div>
            <div>
              <span className="text-gray-600">Location:</span>
              <span className="ml-2 font-medium">Main Gate & Each Block</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">📶 IT Support</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Help Desk:</span>
              <span className="ml-2 font-medium">Ext. 2000</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-medium">itsupport@lpu.co.in</span>
            </div>
            <div>
              <span className="text-gray-600">Hours:</span>
              <span className="ml-2 font-medium">8:00 AM - 8:00 PM</span>
            </div>
            <div>
              <span className="text-gray-600">Location:</span>
              <span className="ml-2 font-medium">IT Center, Block C</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-bold text-red-900 mb-2">🚨 Emergency Procedures</h4>
        <div className="text-sm text-red-800 space-y-1">
          <div><strong>Fire:</strong> Pull alarm, evacuate immediately, call Ext. 100</div>
          <div><strong>Medical:</strong> Call Ext. 102 (Medical Center) or 108 (Ambulance)</div>
          <div><strong>Security Threat:</strong> Call Ext. 100 immediately</div>
          <div><strong>Power Outage:</strong> Call Ext. 911 if affecting multiple rooms</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Maintenance & Support</h1>
            <Link
              href="/student/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-200 bg-white">
          {[
            { id: "requests", label: "My Requests", icon: "📋" },
            { id: "new", label: "New Request", icon: "➕" },
            { id: "contact", label: "Contact Info", icon: "📞" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "requests" && renderRequestsTab()}
        {activeTab === "new" && renderNewRequestTab()}
        {activeTab === "contact" && renderContactTab()}
      </div>
    </div>
  );
}