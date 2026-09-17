'use client';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500">Module 1: Authentication & Role Management</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email / User ID</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lpu-navy focus:outline-none" placeholder="Enter your ID" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lpu-navy focus:outline-none" placeholder="••••••••" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-lpu-navy focus:outline-none bg-white">
            <option>Student</option>
            <option>Warden</option>
          </select>
        </div>
        
        <button className="w-full mt-4 bg-lpu-navy text-white font-semibold py-2.5 rounded-lg hover:bg-lpu-blue transition-colors">
          Login
        </button>
      </div>
    </div>
  );
}
