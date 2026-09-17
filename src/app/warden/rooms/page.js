"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const mockRooms = [
  {
    id: 1,
    number: "A-101",
    block: "A",
    floor: 1,
    type: "Double",
    capacity: 2,
    occupied: 2,
    status: "occupied",
    students: [
      { name: "Arjun Kumar", rollNo: "2022CS001", checkIn: "2024-01-15" },
      { name: "Ravi Sharma", rollNo: "2022CS002", checkIn: "2024-01-16" }
    ],
    amenities: ["Wi-Fi", "AC", "Study Table", "Wardrobe"],
    lastMaintenance: "2024-02-15",
    monthlyRent: 6000
  },
  {
    id: 2,
    number: "A-102",
    block: "A", 
    floor: 1,
    type: "Double",
    capacity: 2,
    occupied: 1,
    status: "partial",
    students: [
      { name: "Priya Singh", rollNo: "2022EC001", checkIn: "2024-01-20" }
    ],
    amenities: ["Wi-Fi", "AC", "Study Table", "Wardrobe"],
    lastMaintenance: "2024-02-10",
    monthlyRent: 6000
  },
  {
    id: 3,
    number: "A-103",
    block: "A",
    floor: 1,
    type: "Single",
    capacity: 1,
    occupied: 1,
    status: "occupied",
    students: [
      { name: "Rahul Gupta", rollNo: "2022ME001", checkIn: "2024-01-18" }
    ],
    amenities: ["Wi-Fi", "AC", "Study Table", "Wardrobe", "Mini Fridge"],
    lastMaintenance: "2024-02-20",
    monthlyRent: 8000
  },
  {
    id: 4,
    number: "A-104",
    block: "A",
    floor: 1,
    type: "Double",
    capacity: 2,
    occupied: 0,
    status: "available",
    students: [],
    amenities: ["Wi-Fi", "AC", "Study Table", "Wardrobe"],
    lastMaintenance: "2024-03-01",
    monthlyRent: 6000
  },
  {
    id: 5,
    number: "A-105",
    block: "A",
    floor: 1,
    type: "Double",
    capacity: 2,
    occupied: 0,
    status: "maintenance",
    students: [],
    amenities: ["Wi-Fi", "Study Table", "Wardrobe"],
    lastMaintenance: "2024-03-10",
    monthlyRent: 6000,
    maintenanceIssue: "AC repair required"
  }
];

const statusConfig = {
  available: { label: "Available", color: "bg-green-100 text-green-800", icon: "✅" },
  occupied: { label: "Fully Occupied", color: "bg-blue-100 text-blue-800", icon: "👥" },
  partial: { label: "Partially Occupied", color: "bg-yellow-100 text-yellow-800", icon: "👤" },
  maintenance: { label: "Under Maintenance", color: "bg-red-100 text-red-800", icon: "🔧" },
  reserved: { label: "Reserved", color: "bg-purple-100 text-purple-800", icon: "📝" }
};

const RoomCard = ({ room, onAssignStudent, onViewDetails, onChangeStatus }) => {
  const status = statusConfig[room.status];
  const occupancyRate = Math.round((room.occupied / room.capacity) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Room {room.number}</h3>
          <p className="text-gray-600">Block {room.block} • Floor {room.floor} • {room.type} Room</p>
          <p className="text-sm text-gray-500">₹{room.monthlyRent}/month</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.icon} {status.label}
          </span>
          <div className="text-right text-sm">
            <div className="font-medium text-gray-900">{room.occupied}/{room.capacity}</div>
            <div className="text-gray-500">Occupancy</div>
          </div>
        </div>
      </div>

      {/* Occupancy Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Room Occupancy</span>
          <span>{occupancyRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              occupancyRate === 100 ? 'bg-blue-500' :
              occupancyRate > 0 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{width: `${occupancyRate}%`}}
          ></div>
        </div>
      </div>

      {/* Current Students */}
      {room.students.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Current Residents</h4>
          <div className="space-y-2">
            {room.students.map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{student.name}</div>
                  <div className="text-xs text-gray-600">{student.rollNo}</div>
                </div>
                <div className="text-xs text-gray-500">
                  Since: {student.checkIn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance Issue */}
      {room.status === 'maintenance' && room.maintenanceIssue && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-red-800 text-sm">
            🔧 <strong>Issue:</strong> {room.maintenanceIssue}
          </div>
        </div>
      )}

      {/* Amenities */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
        <div className="flex flex-wrap gap-1">
          {room.amenities.map((amenity, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              ✓ {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Last maintenance: {room.lastMaintenance}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(room)}
            className="px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Details
          </button>
          {room.status === 'available' && (
            <button
              onClick={() => onAssignStudent(room)}
              className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Assign Student
            </button>
          )}
          {room.status === 'partial' && (
            <button
              onClick={() => onAssignStudent(room)}
              className="px-3 py-1 text-sm text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Add Roommate
            </button>
          )}
          <select
            value={room.status}
            onChange={(e) => onChangeStatus(room.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="partial">Partial</option>
            <option value="maintenance">Maintenance</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const AssignmentModal = ({ room, onClose, onAssign }) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock available students
  const availableStudents = [
    { name: "Neha Sharma", rollNo: "2022CS023", department: "CSE" },
    { name: "Vikash Kumar", rollNo: "2022ME015", department: "Mechanical" },
    { name: "Anjali Gupta", rollNo: "2022EC018", department: "Electronics" }
  ];

  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!room) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Assign Student to Room {room.number}
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Student
            </label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6 max-h-60 overflow-y-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Student
            </label>
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <label key={student.rollNo} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="student"
                    value={student.rollNo}
                    checked={selectedStudent === student.rollNo}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.rollNo} • {student.department}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedStudent) {
                  const student = availableStudents.find(s => s.rollNo === selectedStudent);
                  onAssign(room.id, student);
                }
              }}
              disabled={!selectedStudent}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Assign Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WardenRooms() {
  const [rooms, setRooms] = useState(mockRooms);
  const [filters, setFilters] = useState({
    block: "all",
    status: "all",
    type: "all",
    floor: "all"
  });
  const [sortBy, setSortBy] = useState("number");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [assignmentRoom, setAssignmentRoom] = useState(null);

  const filteredRooms = useMemo(() => {
    let result = rooms.filter(room => {
      if (filters.block !== "all" && room.block !== filters.block) return false;
      if (filters.status !== "all" && room.status !== filters.status) return false;
      if (filters.type !== "all" && room.type !== filters.type) return false;
      if (filters.floor !== "all" && room.floor.toString() !== filters.floor) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "number") return a.number.localeCompare(b.number);
      if (sortBy === "occupancy") return b.occupied - a.occupied;
      if (sortBy === "rent") return b.monthlyRent - a.monthlyRent;
      return 0;
    });

    return result;
  }, [rooms, filters, sortBy]);

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const handleAssignStudent = (roomId, student) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        const newStudents = [...room.students, {
          ...student,
          checkIn: new Date().toISOString().split('T')[0]
        }];
        const newOccupied = newStudents.length;
        const newStatus = newOccupied === room.capacity ? 'occupied' : 'partial';
        
        return {
          ...room,
          students: newStudents,
          occupied: newOccupied,
          status: newStatus
        };
      }
      return room;
    }));
    setAssignmentRoom(null);
  };

  const blocks = ["all", ...Array.from(new Set(rooms.map(room => room.block)))];
  const floors = ["all", ...Array.from(new Set(rooms.map(room => room.floor.toString())))];

  const statsData = {
    total: rooms.length,
    available: rooms.filter(room => room.status === 'available').length,
    occupied: rooms.filter(room => room.status === 'occupied').length,
    partial: rooms.filter(room => room.status === 'partial').length,
    maintenance: rooms.filter(room => room.status === 'maintenance').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
              <p className="text-gray-600 mt-1">Manage hostel room allocations and occupancy</p>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{statsData.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                🏠
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{statsData.available}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                ✅
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-blue-600">{statsData.occupied}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                👥
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Partial</p>
                <p className="text-2xl font-bold text-yellow-600">{statsData.partial}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl">
                👤
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-red-600">{statsData.maintenance}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl">
                🔧
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Block</label>
              <select
                value={filters.block}
                onChange={(e) => setFilters(prev => ({ ...prev, block: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Blocks</option>
                {blocks.filter(b => b !== "all").map(block => (
                  <option key={block} value={block}>Block {block}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="partial">Partial</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <select
                value={filters.floor}
                onChange={(e) => setFilters(prev => ({ ...prev, floor: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Floors</option>
                {floors.filter(f => f !== "all").map(floor => (
                  <option key={floor} value={floor}>Floor {floor}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="number">Room Number</option>
                <option value="occupancy">Occupancy</option>
                <option value="rent">Rent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
          <button
            onClick={() => setFilters({
              block: "all",
              status: "all",
              type: "all",
              floor: "all"
            })}
            className="text-blue-600 hover:underline text-sm"
          >
            Clear Filters
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more rooms</p>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onAssignStudent={setAssignmentRoom}
                onViewDetails={setSelectedRoom}
                onChangeStatus={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {assignmentRoom && (
        <AssignmentModal
          room={assignmentRoom}
          onClose={() => setAssignmentRoom(null)}
          onAssign={handleAssignStudent}
        />
      )}
    </div>
  );
}