import Link from "next/link";

/**
 * HeroSection.jsx — LPU HostelMatch landing hero.
 * LPU brand colours: Yellow (#F5A623) on dark navy/charcoal.
 */
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Lovely Professional University — Official Hostel Portal
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Find Your Perfect{" "}
            <span className="text-yellow-400">LPU Roommate</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 max-w-2xl">
            The official hostel allocation and roommate matching system for
            <strong className="text-yellow-300"> Lovely Professional University</strong> students.
            Match based on sleep schedules, study habits, interests, and cleanliness preferences.
          </p>

          <p className="text-sm text-gray-400 mb-10 flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Jalandhar - Delhi G.T. Road, Phagwara, Punjab – 144411
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/matches"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Browse LPU Matches
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
            >
              Login with Reg. No.
            </Link>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative h-16 overflow-hidden">
        <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,64 C360,0 1080,0 1440,64 L1440,64 L0,64 Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  );
}
