// frontend/app/page.jsx — Home / Landing Page
'use client';

const ROLES = [
  {
    href: '/student/dashboard',
    icon: '🎓',
    title: 'I am a Student',
    description: 'Submit your hostel application, browse BH1-BH10, match with roommates, and manage issues.',
    badge: 'Student Portal',
    badgeColor: 'bg-blue-100 text-blue-700',
    cta: 'Open Student Portal →',
    border: 'border-blue-200 hover:border-blue-400',
  },
  {
    href: '/warden/dashboard',
    icon: '🏠',
    title: 'I am a Warden',
    description: 'View hostel inventory, manage rooms and bed status, and approve room allocation requests.',
    badge: 'Warden Portal',
    badgeColor: 'bg-green-100 text-green-700',
    cta: 'Open Warden Portal →',
    border: 'border-green-200 hover:border-green-400',
  },
  {
    href: '/login',
    icon: '🔐',
    title: 'Authentication',
    description: 'Access role-based management, secure login, and system settings.',
    badge: 'Auth Portal',
    badgeColor: 'bg-purple-100 text-purple-700',
    cta: 'Sign In / Register →',
    border: 'border-purple-200 hover:border-purple-400',
  },
];

const MODULES_LIST = [
  { id: 'M1', label: 'Authentication & Role Management', lead: 'Rajat Singh', path: '/login', icon: '🔐' },
  { id: 'M2', label: 'Student Hostel & Room Browsing (BH1–BH10)', lead: 'Rajat Singh', path: '/student/hostels', icon: '🏢' },
  { id: 'M3', label: 'Warden Hostel & Room Management', lead: 'Member 2', path: '/warden/rooms/inventory', icon: '🗂️' },
  { id: 'M4', label: 'Room Allocation & Requests Workflow', lead: 'Member 2', path: '/warden/requests', icon: '📝' },
  { id: 'M5', label: 'Roommate Matching & Compatibility', lead: 'Member 3', path: '/student/roommate', icon: '🤝' },
  { id: 'M6', label: 'Hostel Asset & Inventory Tracking', lead: 'Member 3', path: '/warden/assets', icon: '🪑' },
  { id: 'M7', label: 'Maintenance Requests & Notifications', lead: 'Member 4', path: '/student/maintenance', icon: '🔧' },
  { id: 'M8', label: 'Central Analytics Dashboard & API', lead: 'Member 4', path: '/student/dashboard', icon: '📊' },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in space-y-10">
      {/* Hero */}
      <section className="relative bg-lpu-navy rounded-2xl overflow-hidden px-8 py-12 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-lpu-gold/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <span className="inline-block bg-lpu-gold/20 text-lpu-gold text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            P03 · Comprehensive Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            LPU Hostel Allocation &<br />
            <span className="text-lpu-gold">Roommate Matching Platform</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Policy-driven digital system managing hostel allocations, room browsing (BH1–BH10), 
            roommate compatibility scoring, asset inventory, and warden governance.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/student/dashboard"
              className="inline-flex items-center gap-2 bg-lpu-gold text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors shadow"
            >
              🎓 Student Portal
            </a>
            <a
              href="/warden/dashboard"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              🏠 Warden Portal
            </a>
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Select Portal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role) => (
            <a key={role.href} href={role.href} className="group block no-underline">
              <div
                className={`bg-white rounded-xl border-2 ${role.border} p-6 h-full flex flex-col gap-3 shadow-sm 
                              transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{role.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role.badgeColor}`}>
                    {role.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{role.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{role.description}</p>
                </div>
                <span className="mt-auto text-sm font-semibold text-lpu-navy group-hover:underline">
                  {role.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 8 Core Modules Overview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">System Modules</h2>
            <p className="text-xs text-gray-500">8 Core Modules assigned across team members</p>
          </div>
          <span className="text-xs font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">
            8 Modules Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MODULES_LIST.map((m) => (
            <a
              key={m.id}
              href={m.path}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-lpu-blue/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-lpu-navy bg-lpu-navy/10 px-2 py-0.5 rounded">
                      {m.id}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-lpu-blue">
                      {m.label}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Lead: {m.lead}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-lpu-navy group-hover:translate-x-1 transition-transform">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-800 mb-3">Technology Stack</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js',
            'React',
            'JavaScript',
            'Tailwind CSS',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Mongoose',
            'Redis & BullMQ',
            'JWT Auth',
            'Puppeteer PDF',
          ].map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium bg-lpu-navy/5 text-lpu-navy border border-lpu-navy/10 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
