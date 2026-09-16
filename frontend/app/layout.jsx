// frontend/app/layout.jsx — Global Layout (Team Member 2 owns this)
// This wraps every page in the app with a navigation bar.
// Next.js 13+ App Router requires this file in the /app directory.

export const metadata = {
  title: 'Hostel Allocation System',
  description: 'Policy-Driven Hostel Allocation Engine — Week 5 Foundation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Basic responsive meta tag for mobile-first design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7fa; color: #1a1a2e; }
          nav { background: #1a1a2e; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
          nav h1 { color: #fff; font-size: 1.1rem; font-weight: 700; }
          nav ul { display: flex; gap: 1.5rem; list-style: none; }
          nav ul a { color: #ccc; text-decoration: none; font-size: 0.9rem; }
          nav ul a:hover { color: #fff; }
          main { max-width: 1100px; margin: 2rem auto; padding: 0 1rem; }
        `}</style>
      </head>
      <body>
        {/* Navigation bar — Team Member 2 will style this properly */}
        <nav>
          <h1>🏠 Hostel Allocation System</h1>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/application">Apply (M2)</a></li>
            <li><a href="/inventory">Inventory (M1)</a></li>
          </ul>
        </nav>

        {/* Each page renders inside here */}
        <main>{children}</main>
      </body>
    </html>
  );
}
