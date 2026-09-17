'use client';

export default function PendingRequests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Room Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Module 4: Manage room allocations and approvals</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Student</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Requested Room</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: 1, name: 'Rajat Singh', regNo: '22BCE1234', room: 'BH1 - 101', status: 'Pending' },
              { id: 2, name: 'Amit Kumar', regNo: '22BCE9876', room: 'BH1 - 102', status: 'Pending' },
            ].map(req => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{req.name}</p>
                  <p className="text-xs text-gray-500">{req.regNo}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{req.room}</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1.5 rounded font-semibold text-xs hover:bg-green-700">Approve</button>
                  <button className="bg-red-100 text-red-700 px-3 py-1.5 rounded font-semibold text-xs hover:bg-red-200">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
