'use client';

const HOSTELS = ['BH1', 'BH2', 'BH3', 'BH4', 'BH5', 'BH6', 'BH7', 'BH8', 'BH9', 'BH10'];

export default function StudentHostels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Hostels</h1>
        <p className="text-gray-500 text-sm mt-1">Module 2: Student Hostel & Room Browsing</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {HOSTELS.map(h => (
          <div key={h} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md cursor-pointer transition-all">
            <div className="text-3xl mb-2">🏢</div>
            <h3 className="font-bold text-gray-900">{h}</h3>
            <p className="text-xs text-green-600 font-medium">Beds Available</p>
          </div>
        ))}
      </div>
      
      {/* Mocking a selected hostel view */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-8">
        <h2 className="text-lg font-bold mb-4">BH1 - Available Rooms</h2>
        <div className="space-y-3">
          {[101, 102, 103].map(room => (
             <div key={room} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-bold">Room {room}</p>
                  <p className="text-xs text-gray-500">Double Occupancy • 1 Bed Available</p>
                </div>
                <button className="bg-lpu-navy text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-lpu-blue">
                  Apply for Room
                </button>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
