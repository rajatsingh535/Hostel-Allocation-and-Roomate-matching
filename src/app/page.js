import Link from "next/link";
import { mockStudents, mockStats } from "@/lib/mockStudents";

// Real hostel blocks at LPU
const hostelBlocks = [
  { name: "Block A", capacity: 200, occupied: 185, image: "🏢", type: "Boys", features: ["WiFi", "Mess", "Laundry", "Security"] },
  { name: "Block B", capacity: 180, occupied: 165, image: "🏠", type: "Boys", features: ["WiFi", "Mess", "Gym", "Security"] },
  { name: "Block C", capacity: 220, occupied: 198, image: "🏘️", type: "Girls", features: ["WiFi", "Mess", "Library", "Security"] },
  { name: "Block D", capacity: 200, occupied: 175, image: "🏛️", type: "Girls", features: ["WiFi", "Mess", "Recreation", "Security"] },
];

const quickActions = [
  { title: "Apply for Hostel", desc: "Submit your hostel application", icon: "📝", href: "/student/application", color: "bg-blue-500" },
  { title: "Find Roommate", desc: "Browse compatible students", icon: "👥", href: "/student/roommate", color: "bg-green-500" },
  { title: "Check Status", desc: "View application status", icon: "📊", href: "/student/dashboard", color: "bg-purple-500" },
  { title: "Contact Warden", desc: "Reach hostel administration", icon: "📞", href: "/student/maintenance", color: "bg-orange-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Professional University Style */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              LPU Hostel Allocation
              <span className="block text-yellow-400">& Roommate Matching</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Find your perfect roommate and secure your hostel accommodation at Lovely Professional University
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-xl hover:bg-yellow-400 transition-all transform hover:scale-105"
              >
                🎓 Student Portal
              </Link>
              <Link
                href="/warden/dashboard"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                🏛️ Warden Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Dashboard */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Hostel Statistics</h2>
            <p className="text-gray-600">Real-time data from our hostel management system</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="text-2xl font-bold text-blue-600">{mockStats.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-2xl font-bold text-green-600">{mockStats.allocated}</div>
              <div className="text-sm text-gray-600">Rooms Allocated</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-2">⏳</div>
              <div className="text-2xl font-bold text-orange-600">{mockStats.pending}</div>
              <div className="text-sm text-gray-600">Pending Applications</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="text-3xl mb-2">🤝</div>
              <div className="text-2xl font-bold text-purple-600">{mockStats.matched}</div>
              <div className="text-sm text-gray-600">Successful Matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions for Students */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-gray-600 text-lg">Get started with hostel allocation in just a few clicks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                className="group block bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${action.color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Available Hostel Blocks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Hostel Blocks</h2>
            <p className="text-gray-600 text-lg">Choose from our modern, well-equipped hostel facilities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostelBlocks.map((block, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{block.image}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      block.type === 'Boys' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                    }`}>
                      {block.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{block.name}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Occupancy</span>
                      <span>{block.occupied}/{block.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (block.occupied / block.capacity) > 0.9 ? 'bg-red-500' : 
                          (block.occupied / block.capacity) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{width: `${(block.occupied / block.capacity) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {block.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Successful Matches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Successful Matches</h2>
            <p className="text-gray-600 text-lg">Students who found their perfect roommates this week</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStudents.slice(0, 3).map((student) => (
              <div key={student.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.department}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">Room:</span>
                    <span className="font-medium">Block {student.roomPref}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">Year:</span>
                    <span className="font-medium">{student.year}rd Year</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {student.interests.slice(0, 2).map((interest, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/student/roommate"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Find Your Roommate
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Hostel Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of LPU students who have found their perfect hostel accommodation and roommates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Apply for Hostel Now
            </Link>
            <Link
              href="/student/hostels"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Hostels
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
