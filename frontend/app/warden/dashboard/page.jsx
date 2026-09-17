'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DASHBOARD_STATS = [
  {
    icon: '🏢',
    title: 'Total Hostels',
    value: '10',
    description: 'BH1-BH10 under management',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
    trend: '+2 this year'
  },
  {
    icon: '🛏️',
    title: 'Total Beds',
    value: '2,450',
    description: 'Across all hostel blocks',
    color: 'bg-green-50 border-green-200 text-green-900',
    trend: '1,987 occupied'
  },
  {
    icon: '📋',
    title: 'Pending Applications',
    value: '127',
    description: 'Awaiting review',
    color: 'bg-orange-50 border-orange-200 text-orange-900',
    trend: '+15 today'
  },
  {
    icon: '⚡',
    title: 'Urgent Issues',
    value: '8',
    description: 'Maintenance requests',
    color: 'bg-red-50 border-red-200 text-red-900',
    trend: '3 critical'
  }
];

const QUICK_ACTIONS = [
  {
    title: 'Review Applications',
    description: 'Process pending student applications',
    icon: '📋',
    href: '/warden/requests',
    color: 'bg-blue-500',
    count: '127 pending'
  },
  {
    title: 'Manage Rooms',
    description: 'Update room status and bed allocations',
    icon: '🏠',
    href: '/warden/rooms/inventory',
    color: 'bg-green-500',
    count: '463 available'
  },
  {
    title: 'Asset Management',
    description: 'Track hostel furniture and equipment',
    icon: '🪑',
    href: '/warden/assets',
    color: 'bg-purple-500',
    count: '12 issues'
  },
  {
    title: 'Generate Reports',
    description: 'Create allocation and occupancy reports',
    icon: '📊',
    href: '/warden/reports',
    color: 'bg-orange-500',
    count: 'Monthly due'
  }
];

export default function WardenDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role !== 'warden' && parsedUser.role !== 'admin') {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-lpu-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading warden dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">
              Warden Control Panel
            </h1>
            <p className="text-gray-600">
              Hostel Administration • Welcome back, {user.name || 'Warden'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Access Level</p>
            <p className="font-semibold text-lg text-lpu-navy">Hostel Administrator</p>
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-6 ${stat.color} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">{stat.title}</h3>
            <p className="text-xs opacity-80 mb-2">{stat.description}</p>
            <p className="text-xs font-semibold">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Management Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {QUICK_ACTIONS.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-lpu-gold hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${action.color} text-white`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {action.count}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <span className="text-sm font-semibold text-lpu-navy group-hover:text-lpu-gold">
                Manage →
              </span>
            </a>
          ))}

        </div>
      </div>

      {/* Hostel Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Hostel Overview</h2>
          <a
            href="/warden/rooms/inventory"
            className="text-sm font-semibold text-lpu-navy hover:text-lpu-gold"
          >
            Detailed View →
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['BH-1', 'BH-2', 'BH-3', 'BH-4', 'BH-5'].map((hostel) => {
            const occupancy = Math.floor(Math.random() * 40) + 60; // Random occupancy 60-100%
            return (
              <div key={hostel} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{hostel}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${
                      occupancy > 90 ? 'bg-red-500' :
                      occupancy > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{width: `${occupancy}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{occupancy}% occupied</p>
                <p className="text-xs font-semibold text-gray-900 mt-1">
                  {Math.floor(245 * (100 - occupancy) / 100)} beds available
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}