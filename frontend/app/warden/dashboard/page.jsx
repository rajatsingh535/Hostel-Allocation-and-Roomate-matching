'use client';

const WARDEN_MODULES = [
  { name: 'Room Management', path: '/warden/rooms', icon: '🏢', desc: 'Manage hostel structure (Module 3)' },
  { name: 'Pending Requests', path: '/warden/requests', icon: '📝', desc: 'Approve room requests (Module 4)' },
  { name: 'Asset Inventory', path: '/warden/assets', icon: '🪑', desc: 'Manage furniture (Module 6)' }
];

export default function WardenDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warden Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Module 8: Dashboard & Data</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lpu-navy">Admin Warden</p>
          <p className="text-xs text-gray-500">BH1 Administrator</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border p-4 rounded-xl shadow-sm">
          <p className="text-xs text-gray-500 font-bold uppercase">Total Beds</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">160</p>
        </div>
        <div className="bg-white border border-red-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs text-red-500 font-bold uppercase">Allocated</p>
          <p className="text-3xl font-extrabold text-red-700 mt-1">90</p>
        </div>
        <div className="bg-white border border-green-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs text-green-500 font-bold uppercase">Available</p>
          <p className="text-3xl font-extrabold text-green-700 mt-1">60</p>
        </div>
        <div className="bg-white border border-yellow-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs text-yellow-600 font-bold uppercase">Maintenance</p>
          <p className="text-3xl font-extrabold text-yellow-700 mt-1">10</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {WARDEN_MODULES.map((mod) => (
          <a key={mod.path} href={mod.path} className="block group">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all h-full">
              <div className="text-4xl mb-4">{mod.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-lpu-navy">{mod.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{mod.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
