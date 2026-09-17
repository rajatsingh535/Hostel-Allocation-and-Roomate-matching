'use client';

export default function Maintenance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Maintenance & Tickets</h1>
        <p className="text-gray-500 text-sm mt-1">Module 7: Report room issues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Report an Issue</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category</label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-lpu-navy">
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Furniture</option>
                <option>Cleaning</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lpu-navy" rows="4" placeholder="Describe the problem..."></textarea>
            </div>
            <button type="button" className="w-full bg-lpu-navy text-white font-semibold py-2 rounded-lg hover:bg-lpu-blue">
              Submit Ticket
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">My Tickets</h2>
          <div className="space-y-3">
            {[ 
              { id: 'TKT-1021', type: 'Electrical', status: 'In Progress', date: 'Oct 12' },
              { id: 'TKT-0984', type: 'Plumbing', status: 'Resolved', date: 'Sep 28' }
            ].map(t => (
               <div key={t.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                 <div>
                   <p className="font-bold text-gray-900">{t.type} Issue <span className="text-xs text-gray-500 font-normal ml-2">{t.id} • {t.date}</span></p>
                 </div>
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                   t.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                 }`}>
                   {t.status}
                 </span>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
