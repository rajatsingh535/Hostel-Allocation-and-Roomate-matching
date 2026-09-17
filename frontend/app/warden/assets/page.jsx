'use client';

export default function AssetInventory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Module 6: Manage physical hostel assets</p>
        </div>
        <button className="bg-lpu-navy text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-lpu-blue">
          + Add New Asset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
         {['Beds', 'Mattresses', 'Tables', 'Chairs'].map(item => (
            <div key={item} className="bg-white border p-4 rounded-xl shadow-sm text-center">
              <h3 className="text-gray-500 font-semibold text-sm">{item}</h3>
              <p className="text-2xl font-bold mt-1">160 <span className="text-xs text-green-500 font-normal">Available</span></p>
            </div>
         ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Item Name</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Assigned Room</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Condition</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 'INV-101', name: 'Study Table', room: 'BH1 - 101', condition: 'Good' },
              { id: 'INV-102', name: 'Ceiling Fan', room: 'BH1 - 102', condition: 'Damaged' },
            ].map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.id}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{item.room}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.condition === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-lpu-navy hover:underline text-xs font-semibold">Edit / Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
