'use client';

export default function RoommateMatching() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Roommate Matching</h1>
        <p className="text-gray-500 text-sm mt-1">Module 5: Find your compatible roommate</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">My Compatibility Profile</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Sleep Schedule</span>
              <span className="font-semibold">Late Night (after 12 AM)</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Cleanliness</span>
              <span className="font-semibold">Very Neat</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Study Environment</span>
              <span className="font-semibold">Absolute Silence</span>
            </div>
            <button className="w-full mt-2 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Top Matches</h2>
          <div className="space-y-4">
            {[ 
               { name: 'Amit Kumar', match: '95%', habits: 'Late Night • Neat' },
               { name: 'Rahul Sharma', match: '88%', habits: 'Early Bird • Neat' }
            ].map(m => (
              <div key={m.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="font-bold text-gray-900">{m.name} <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-1">{m.match} Match</span></p>
                  <p className="text-xs text-gray-500 mt-1">{m.habits}</p>
                </div>
                <button className="bg-lpu-navy text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-lpu-blue">
                  Send Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
