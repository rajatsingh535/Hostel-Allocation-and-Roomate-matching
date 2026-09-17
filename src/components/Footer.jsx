import Link from "next/link";

/**
 * Footer.jsx — LPU HostelMatch footer.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-xs">L</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-yellow-400 font-extrabold text-sm">LPU HostelMatch</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-2">
              Official hostel allocation and roommate matching portal for
              <span className="text-yellow-400 font-medium"> Lovely Professional University</span>,
              Phagwara, Punjab.
            </p>
            <p className="text-xs text-gray-500">Campus: Jalandhar - Delhi G.T. Road, Phagwara, Punjab – 144411</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/dashboard/matches" className="hover:text-white transition-colors">Find Matches</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Panel</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Student Login</Link></li>
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Tech Stack</h3>
            <ul className="space-y-2 text-sm">
              <li>Week 5 Evaluation — Architecture & Routing</li>
              <li>Next.js 16 App Router</li>
              <li>React 19 + Tailwind CSS v4</li>
              <li>MongoDB Atlas (Week 9 integration)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} LPU HostelMatch — Lovely Professional University Hostel Management System.
          Built for academic evaluation purposes.
        </div>
      </div>
    </footer>
  );
}
