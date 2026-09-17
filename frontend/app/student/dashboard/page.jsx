'use client';

const STUDENT_MODULES = [
  { name: 'Hostels & Rooms', path: '/student/hostels', icon: '🏢', desc: 'Browse BH1-BH10 and apply (Module 2)' },
  { name: 'Roommate Matching', path: '/student/roommate', icon: '🤝', desc: 'Find your perfect roommate (Module 5)' },
  { name: 'Maintenance', path: '/student/maintenance', icon: '🔧', desc: 'Report room issues (Module 7)' }
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Module 8: Dashboard & Data</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lpu-navy">Rajat Singh</p>
          <p className="text-xs text-gray-500">22BCE1234 • B.Tech CSE</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STUDENT_MODULES.map((mod) => (
          <a key={mod.path} href={mod.path} className="block group">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all h-full">
              <div className="text-4xl mb-4">{mod.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-lpu-navy">{mod.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{mod.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
        <h3 className="font-bold text-blue-900 mb-2">Current Application Status (Module 4)</h3>
        <p className="text-sm text-blue-800">You have a pending request for BH1 - Room 101. Awaiting Warden approval.</p>
      </div>
    </div>
  );
}
