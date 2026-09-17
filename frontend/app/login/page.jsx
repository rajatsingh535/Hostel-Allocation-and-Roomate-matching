'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access your hostel application, browse BH1-BH10, find roommates, and manage requests',
    icon: '🎓',
    redirect: '/student/dashboard'
  },
  {
    id: 'warden',
    title: 'Warden',
    description: 'Manage hostel inventory, review applications, allocate beds, and oversee operations',
    icon: '🏠',
    redirect: '/warden/dashboard'
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Configure system settings, manage allocation cycles, and monitor analytics',
    icon: '👨‍💼',
    redirect: '/admin/dashboard'
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    registrationNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For Week 5 demo - accept any credentials
    const roleData = ROLES.find(r => r.id === selectedRole);
    
    // Store session data in localStorage for demo
    localStorage.setItem('user', JSON.stringify({
      id: Date.now(),
      email: formData.email,
      role: selectedRole,
      name: formData.email.split('@')[0],
      registrationNumber: formData.registrationNumber || 'REG' + Date.now()
    }));

    // Redirect to appropriate dashboard
    router.push(roleData.redirect);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-lpu-gold rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">LPU</span>
          </div>
          <h1 className="text-2xl font-bold text-lpu-navy mb-2">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-gray-600 text-sm">
            Access your hostel allocation portal
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 gap-2">
            {ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedRole === role.id
                    ? 'border-lpu-gold bg-lpu-gold/5 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {role.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {role.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === role.id 
                      ? 'border-lpu-gold bg-lpu-gold' 
                      : 'border-gray-300'
                  }`}>
                    {selectedRole === role.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@lpu.in"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          {/* Registration Number (for students) */}
          {selectedRole === 'student' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="12345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none transition-all text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white text-sm transition-all shadow-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-lpu-gold hover:bg-lpu-gold/90 active:transform active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing In...
              </div>
            ) : (
              `Continue as ${ROLES.find(r => r.id === selectedRole)?.title}`
            )}
          </button>

        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-lpu-navy hover:text-lpu-gold font-medium transition-colors"
          >
            {isRegistering 
              ? 'Already have an account? Sign In' 
              : 'Need an account? Register'
            }
          </button>
          
          <div className="text-xs text-gray-500 border-t pt-4">
            <p className="mb-1">Week 5 Demo - Use any credentials to continue</p>
            <p>🎓 Architecture & Design + 🔗 React.js Routing Implementation</p>
          </div>
        </div>

      </div>
    </div>
  );
}
