export const metadata = {
  title: 'Hostel Allocation Engine',
  description: 'Policy-Driven Hostel Allocation Engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
          <h1>Hostel Allocation System</h1>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li><a href="/">Home</a></li>
            <li><a href="/application">Student Application (M2)</a></li>
            <li><a href="/inventory">Warden Inventory (M1)</a></li>
          </ul>
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
