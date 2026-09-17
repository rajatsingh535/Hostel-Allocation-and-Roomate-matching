'use client';

import { useState } from 'react';

// Mock hostel data with comprehensive details
const HOSTELS = [
  {
    id: 'BH1',
    name: 'Boys Hostel 1',
    description: 'Modern facilities with AC rooms and high-speed WiFi',
    totalRooms: 120,
    availableBeds: 45,
    totalBeds: 240,
    roomTypes: ['Single AC', 'Double AC'],
    amenities: ['AC', 'WiFi', 'Gym', 'Mess', 'Laundry'],
    location: 'North Campus',
    distance: '0.5 km from main building',
    image: '🏢',
    priceRange: '₹80,000 - ₹120,000/year',
    rating: 4.5,
    features: ['24/7 Security', 'Backup Power', 'Hot Water']
  },
  {
    id: 'BH2',
    name: 'Boys Hostel 2',
    description: 'Budget-friendly accommodation with essential amenities',
    totalRooms: 150,
    availableBeds: 28,
    totalBeds: 300,
    roomTypes: ['Double Non-AC', 'Triple Non-AC'],
    amenities: ['WiFi', 'Mess', 'Common Room', 'Laundry'],
    location: 'South Campus',
    distance: '0.8 km from main building',
    image: '🏠',
    priceRange: '₹45,000 - ₹65,000/year',
    rating: 4.2,
    features: ['Study Hall', 'Recreation Room', 'Parking']
  },
  {
    id: 'BH3',
    name: 'Boys Hostel 3',
    description: 'Premium hostel with luxury amenities and spacious rooms',
    totalRooms: 80,
    availableBeds: 12,
    totalBeds: 160,
    roomTypes: ['Single AC Deluxe', 'Double AC Premium'],
    amenities: ['AC', 'WiFi', 'Gym', 'Swimming Pool', 'Mess', 'Laundry'],
    location: 'East Campus',
    distance: '0.3 km from main building',
    image: '🏨',
    priceRange: '₹100,000 - ₹150,000/year',
    rating: 4.8,
    features: ['Elevator', 'Balcony', 'Mini Fridge', 'Study Desk']
  },
  {
    id: 'BH4',
    name: 'Boys Hostel 4',
    description: 'Eco-friendly hostel with sustainable living practices',
    totalRooms: 100,
    availableBeds: 67,
    totalBeds: 200,
    roomTypes: ['Double AC', 'Triple AC'],
    amenities: ['AC', 'WiFi', 'Solar Power', 'Organic Mess', 'Laundry'],
    location: 'West Campus',
    distance: '1.0 km from main building',
    image: '🌱',
    priceRange: '₹70,000 - ₹95,000/year',
    rating: 4.3,
    features: ['Solar Panels', 'Rainwater Harvesting', 'Garden View']
  },
  {
    id: 'BH5',
    name: 'Boys Hostel 5',
    description: 'Technology-focused hostel with smart room features',
    totalRooms: 90,
    availableBeds: 23,
    totalBeds: 180,
    roomTypes: ['Single Smart', 'Double Smart AC'],
    amenities: ['Smart AC', 'High-Speed WiFi', 'Tech Lab', 'Mess', 'Laundry'],
    location: 'Tech Park',
    distance: '0.7 km from main building',
    image: '💻',
    priceRange: '₹90,000 - ₹130,000/year',
    rating: 4.6,
    features: ['Smart Locks', 'IoT Integration', 'Tech Support 24/7']
  }
];

const ROOM_TYPES = ['All Types', 'Single AC', 'Double AC', 'Triple AC', 'Non-AC'];
const PRICE_RANGES = ['All Prices', '₹40,000 - ₹60,000', '₹60,000 - ₹90,000', '₹90,000+'];

export default function HostelBrowsingPage() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [filters, setFilters] = useState({
    roomType: 'All Types',
    priceRange: 'All Prices',
    amenities: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter hostels based on search and filters
  const filteredHostels = HOSTELS.filter(hostel => {
    const matchesSearch = hostel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hostel.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRoomType = filters.roomType === 'All Types' || 
                           hostel.roomTypes.some(type => type.includes(filters.roomType.replace(' AC', '').replace(' Non-AC', '')));
    
    return matchesSearch && matchesRoomType;
  });

  const handleApplyToHostel = (hostel) => {
    // Simulate application process
    alert(`Application submitted for ${hostel.name}! You'll be redirected to complete your application.`);
    // In real app: router.push('/student/application?hostel=' + hostel.id);
  };

  const getAvailabilityStatus = (availableBeds, totalBeds) => {
    const percentage = (availableBeds / totalBeds) * 100;
    if (percentage > 50) return { status: 'High', color: 'text-green-600 bg-green-50 border-green-200' };
    if (percentage > 20) return { status: 'Medium', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    return { status: 'Low', color: 'text-red-600 bg-red-50 border-red-200' };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Browse Hostels</h1>
            <p className="text-gray-600">
              Explore BH1-BH10 hostels, compare amenities, and submit your preferences
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 2:</span>
            <span>Student Hostel & Room Browsing</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Hostels
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or features..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Room Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={filters.roomType}
              onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              {ROOM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              {PRICE_RANGES.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ roomType: 'All Types', priceRange: 'All Prices', amenities: [] });
                setSearchQuery('');
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
          Showing <span className="font-semibold">{filteredHostels.length}</span> hostels
          {searchQuery && (
            <span> matching "<span className="font-semibold">{searchQuery}</span>"</span>
          )}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High Availability</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Hostel Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHostels.map((hostel) => {
          const availability = getAvailabilityStatus(hostel.availableBeds, hostel.totalBeds);
          
          return (
            <div
              key={hostel.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              
              {/* Hostel Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{hostel.image}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{hostel.name}</h3>
                      <p className="text-sm text-gray-600">{hostel.location} • {hostel.distance}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${availability.color}`}>
                    {availability.status} Availability
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{hostel.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-lpu-navy">{hostel.availableBeds}</p>
                    <p className="text-xs text-gray-500">Available Beds</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-lpu-navy">{hostel.totalRooms}</p>
                    <p className="text-xs text-gray-500">Total Rooms</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-lpu-navy">★ {hostel.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>

              {/* Hostel Details */}
              <div className="p-6">
                
                {/* Room Types */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Room Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {hostel.roomTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {hostel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Price Range:</p>
                  <p className="text-lg font-bold text-lpu-gold">{hostel.priceRange}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedHostel(hostel)}
                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApplyToHostel(hostel)}
                    disabled={hostel.availableBeds === 0}
                    className={`flex-1 px-4 py-2 font-semibold rounded-lg text-sm transition-colors ${
                      hostel.availableBeds === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-lpu-gold hover:bg-lpu-gold/90 text-white'
                    }`}
                  >
                    {hostel.availableBeds === 0 ? 'Full' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredHostels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No hostels found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more options.
          </p>
          <button
            onClick={() => {
              setFilters({ roomType: 'All Types', priceRange: 'All Prices', amenities: [] });
              setSearchQuery('');
            }}
            className="px-6 py-2 bg-lpu-gold text-white font-semibold rounded-lg hover:bg-lpu-gold/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Hostel Details Modal */}
      {selectedHostel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{selectedHostel.image}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedHostel.name}</h2>
                    <p className="text-gray-600">{selectedHostel.location} • {selectedHostel.distance}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHostel(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedHostel.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Special Features</h3>
                <ul className="space-y-1">
                  {selectedHostel.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-700">
                      <span className="w-1.5 h-1.5 bg-lpu-gold rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Capacity</h3>
                  <p className="text-gray-700">{selectedHostel.totalBeds} beds in {selectedHostel.totalRooms} rooms</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
                  <p className="text-gray-700">{selectedHostel.availableBeds} beds currently available</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedHostel(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyToHostel(selectedHostel);
                    setSelectedHostel(null);
                  }}
                  disabled={selectedHostel.availableBeds === 0}
                  className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                    selectedHostel.availableBeds === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-lpu-gold hover:bg-lpu-gold/90 text-white'
                  }`}
                >
                  {selectedHostel.availableBeds === 0 ? 'Hostel Full' : 'Apply to This Hostel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}