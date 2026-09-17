"use client";
import { useState } from "react";
import Link from "next/link";

const hostelBlocks = [
  {
    id: 1,
    name: "Block A",
    type: "Boys",
    capacity: 200,
    occupied: 185,
    available: 15,
    image: "🏢",
    features: ["Wi-Fi", "Mess Hall", "Laundry", "Security", "Study Room", "Recreation"],
    roomTypes: [
      { type: "Single", price: 8000, available: 5 },
      { type: "Double", price: 6000, available: 10 },
    ],
    floor: "Ground to 4th Floor",
    warden: "Mr. Rajesh Kumar",
    distance: "200m from Academic Block"
  },
  {
    id: 2,
    name: "Block B",
    type: "Boys", 
    capacity: 180,
    occupied: 165,
    available: 15,
    image: "🏠",
    features: ["Wi-Fi", "Mess Hall", "Gym", "Security", "Library", "Common Room"],
    roomTypes: [
      { type: "Single", price: 8500, available: 3 },
      { type: "Double", price: 6500, available: 12 },
    ],
    floor: "Ground to 3rd Floor",
    warden: "Mr. Suresh Patel",
    distance: "150m from Academic Block"
  },
  {
    id: 3,
    name: "Block C",
    type: "Girls",
    capacity: 220,
    occupied: 198,
    available: 22,
    image: "🏘️",
    features: ["Wi-Fi", "Mess Hall", "Library", "Security", "Medical Room", "Salon"],
    roomTypes: [
      { type: "Single", price: 8000, available: 8 },
      { type: "Double", price: 6000, available: 14 },
    ],
    floor: "Ground to 5th Floor",
    warden: "Mrs. Priya Sharma",
    distance: "250m from Academic Block"
  },
  {
    id: 4,
    name: "Block D", 
    type: "Girls",
    capacity: 200,
    occupied: 175,
    available: 25,
    image: "🏛️",
    features: ["Wi-Fi", "Mess Hall", "Recreation", "Security", "Study Hall", "Cafeteria"],
    roomTypes: [
      { type: "Single", price: 9000, available: 10 },
      { type: "Double", price: 7000, available: 15 },
    ],
    floor: "Ground to 4th Floor",
    warden: "Mrs. Anita Singh",
    distance: "180m from Academic Block"
  },
];

const filters = {
  gender: ["All", "Boys", "Girls"],
  roomType: ["All", "Single", "Double"],
  priceRange: ["All", "Under ₹6500", "₹6500-₹8000", "Above ₹8000"],
  availability: ["All", "High (20+)", "Medium (10-20)", "Low (Under 10)"]
};

export default function HostelSelection() {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "All",
    roomType: "All", 
    priceRange: "All",
    availability: "All"
  });
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const filteredBlocks = hostelBlocks.filter(block => {
    if (selectedFilters.gender !== "All" && block.type !== selectedFilters.gender) return false;
    if (selectedFilters.availability !== "All") {
      if (selectedFilters.availability === "High (20+)" && block.available < 20) return false;
      if (selectedFilters.availability === "Medium (10-20)" && (block.available < 10 || block.available > 20)) return false;
      if (selectedFilters.availability === "Low (Under 10)" && block.available >= 10) return false;
    }
    return true;
  });

  const getAvailabilityColor = (available, capacity) => {
    const ratio = available / capacity;
    if (ratio > 0.1) return "text-green-600 bg-green-100";
    if (ratio > 0.05) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getOccupancyColor = (occupied, capacity) => {
    const ratio = occupied / capacity;
    if (ratio > 0.9) return "bg-red-500";
    if (ratio > 0.7) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Available Hostels</h1>
              <p className="text-gray-600 mt-1">Choose your preferred hostel block and room type</p>
            </div>
            <Link
              href="/student/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Filter Hostels</h2>
              
              {Object.entries(filters).map(([category, options]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">
                    {category === "roomType" ? "Room Type" : category === "priceRange" ? "Price Range" : category}
                  </h3>
                  <div className="space-y-2">
                    {options.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name={category}
                          value={option}
                          checked={selectedFilters[category] === option}
                          onChange={(e) => handleFilterChange(category, e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedFilters({
                    gender: "All",
                    roomType: "All",
                    priceRange: "All", 
                    availability: "All"
                  })}
                  className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Hostel Blocks Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredBlocks.length} of {hostelBlocks.length} hostels
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">Available</span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full ml-4"></span>
                <span className="text-gray-600">Filling Fast</span>
                <span className="w-3 h-3 bg-red-500 rounded-full ml-4"></span>
                <span className="text-gray-600">Almost Full</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlocks.map((block) => (
                <div key={block.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Block Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{block.image}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{block.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            block.type === 'Boys' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                          }`}>
                            {block.type} Hostel
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(block.available, block.capacity)}`}>
                        {block.available} available
                      </span>
                    </div>

                    {/* Occupancy Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Occupancy</span>
                        <span>{block.occupied}/{block.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getOccupancyColor(block.occupied, block.capacity)}`}
                          style={{width: `${(block.occupied / block.capacity) * 100}%`}}
                        ></div>
                      </div>
                    </div>

                    {/* Block Details */}
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <span className="w-20">Warden:</span>
                        <span className="font-medium text-gray-900">{block.warden}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20">Floors:</span>
                        <span className="font-medium text-gray-900">{block.floor}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20">Distance:</span>
                        <span className="font-medium text-gray-900">{block.distance}</span>
                      </div>
                    </div>

                    {/* Room Types */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Available Room Types</h4>
                      <div className="space-y-2">
                        {block.roomTypes.map((room, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium text-gray-900">{room.type} Room</span>
                              <span className="text-sm text-gray-600 ml-2">({room.available} available)</span>
                            </div>
                            <span className="font-bold text-green-600">₹{room.price}/month</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {block.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedBlock(block)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBlock(block);
                          setShowApplicationModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                        disabled={block.available === 0}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlocks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hostels match your filters</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filter criteria to see more options</p>
                <button
                  onClick={() => setSelectedFilters({
                    gender: "All",
                    roomType: "All",
                    priceRange: "All",
                    availability: "All"
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for {selectedBlock.name}</h3>
            <p className="text-gray-600 mb-6">
              You are about to apply for accommodation in {selectedBlock.name}. 
              This will be added to your application preferences.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <Link
                href="/student/application"
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Application
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}