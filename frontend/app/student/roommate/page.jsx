'use client';

import { useState } from 'react';

// Mock roommate data with compatibility scores
const POTENTIAL_ROOMMATES = [
  {
    id: 'STUDENT-001',
    name: 'Arjun Kumar',
    regNumber: '12345679',
    course: 'B.Tech ECE',
    year: '2nd Year',
    profileImage: '👨‍💻',
    compatibilityScore: 92,
    commonInterests: ['Coding', 'Gaming', 'Music'],
    lifestyle: {
      sleepSchedule: 'Early Bird (10 PM - 6 AM)',
      studyHours: 'Evening (6 PM - 10 PM)',
      cleanliness: 'Very Clean',
      noiseLevel: 'Quiet',
      socialLevel: 'Moderate'
    },
    preferences: {
      hostel: 'BH-7',
      roomType: 'Double AC'
    },
    status: 'available',
    lastActive: '2 hours ago'
  },
  {
    id: 'STUDENT-002',
    name: 'Vikram Shah',
    regNumber: '12345680',
    course: 'BCA',
    year: '1st Year',
    profileImage: '👨‍🎓',
    compatibilityScore: 87,
    commonInterests: ['Sports', 'Movies', 'Photography'],
    lifestyle: {
      sleepSchedule: 'Night Owl (12 AM - 8 AM)',
      studyHours: 'Late Night (10 PM - 2 AM)',
      cleanliness: 'Moderately Clean',
      noiseLevel: 'Moderate',
      socialLevel: 'Very Social'
    },
    preferences: {
      hostel: 'BH-5',
      roomType: 'Double AC'
    },
    status: 'available',
    lastActive: '1 day ago'
  },
  {
    id: 'STUDENT-003',
    name: 'Rohit Sharma',
    regNumber: '12345681',
    course: 'B.Tech ME',
    year: '3rd Year',
    profileImage: '👨‍🔬',
    compatibilityScore: 78,
    commonInterests: ['Reading', 'Fitness', 'Cooking'],
    lifestyle: {
      sleepSchedule: 'Regular (11 PM - 7 AM)',
      studyHours: 'Morning (6 AM - 9 AM)',
      cleanliness: 'Extremely Clean',
      noiseLevel: 'Very Quiet',
      socialLevel: 'Introverted'
    },
    preferences: {
      hostel: 'BH-3',
      roomType: 'Single AC'
    },
    status: 'busy',
    lastActive: '5 hours ago'
  }
];

const SENT_REQUESTS = [
  {
    id: 'REQ-001',
    studentName: 'Arjun Kumar',
    sentDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: 'REQ-002',
    studentName: 'Suresh Kumar',
    sentDate: '2024-01-14',
    status: 'accepted'
  }
];

const RECEIVED_REQUESTS = [
  {
    id: 'REQ-003',
    studentName: 'Karan Singh',
    regNumber: '12345690',
    receivedDate: '2024-01-16',
    status: 'pending',
    compatibilityScore: 89
  }
];

export default function RoommatePage() {
  const [selectedTab, setSelectedTab] = useState('discover');
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const sendRoommateRequest = (studentId) => {
    console.log('Sending roommate request to:', studentId);
    alert('Roommate request sent successfully!');
    setShowRequestModal(false);
    setRequestMessage('');
    setSelectedRoommate(null);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Roommate Matching</h1>
            <p className="text-gray-600">
              Find compatible roommates based on lifestyle preferences and study habits
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 5:</span>
            <span>Roommate Matching</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex space-x-2">
          {[
            { id: 'discover', label: 'Discover', icon: '🔍' },
            { id: 'sent', label: 'Sent', icon: '📤', count: SENT_REQUESTS.length },
            { id: 'received', label: 'Received', icon: '📥', count: RECEIVED_REQUESTS.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                selectedTab === tab.id
                  ? 'bg-lpu-gold text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.count && (
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedTab === tab.id ? 'bg-white/20' : 'bg-lpu-gold text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Discover Tab */}
      {selectedTab === 'discover' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {POTENTIAL_ROOMMATES.map((roommate) => (
            <div
              key={roommate.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{roommate.profileImage}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{roommate.name}</h3>
                      <p className="text-sm text-gray-600">{roommate.regNumber}</p>
                      <p className="text-sm text-gray-600">{roommate.course} - {roommate.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full border text-sm font-bold ${getCompatibilityColor(roommate.compatibilityScore)}`}>
                      {roommate.compatibilityScore}% Match
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                
                {/* Common Interests */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Common Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {roommate.commonInterests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Overview */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Lifestyle:</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p><span className="font-medium">Sleep:</span> {roommate.lifestyle.sleepSchedule}</p>
                    <p><span className="font-medium">Study:</span> {roommate.lifestyle.studyHours}</p>
                    <p><span className="font-medium">Cleanliness:</span> {roommate.lifestyle.cleanliness}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRoommate(roommate)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRoommate(roommate);
                      setShowRequestModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg text-sm transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sent Requests Tab */}
      {selectedTab === 'sent' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sent Requests</h2>
          <div className="space-y-4">
            {SENT_REQUESTS.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{request.studentName}</p>
                  <p className="text-xs text-gray-500 mt-2">Sent on {new Date(request.sentDate).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Received Requests Tab */}
      {selectedTab === 'received' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Received Requests</h2>
          <div className="space-y-4">
            {RECEIVED_REQUESTS.map((request) => (
              <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{request.studentName}</p>
                    <p className="text-sm text-gray-600">{request.regNumber}</p>
                    <div className={`inline-block px-2 py-1 rounded border text-xs font-bold mt-1 ${getCompatibilityColor(request.compatibilityScore)}`}>
                      {request.compatibilityScore}% Compatible
                    </div>
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-colors">
                      Decline
                    </button>
                    <button className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg text-sm transition-colors">
                      Accept
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedRoommate && !showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-6xl">{selectedRoommate.profileImage}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRoommate.name}</h2>
                    <p className="text-gray-600">{selectedRoommate.regNumber}</p>
                    <p className="text-gray-600">{selectedRoommate.course} - {selectedRoommate.year}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRoommate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Detailed Lifestyle Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedRoommate.lifestyle).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedRoommate(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg transition-colors"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedRoommate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Send Roommate Request
            </h2>
            <p className="text-gray-600 mb-4">
              Sending request to: <span className="font-semibold">{selectedRoommate.name}</span>
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Personal Message
              </label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Hi! I think we would be great roommates..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedRoommate(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => sendRoommateRequest(selectedRoommate.id)}
                className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}