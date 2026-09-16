// frontend/app/page.jsx — Home / Landing Page (Team Member 2 owns this)
// This is the first thing a user sees at http://localhost:3000

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        Welcome to the Hostel Allocation Engine
      </h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Week 5 Foundation — M1 & M2 are implemented. Choose your role below.
      </p>

      {/* Two role-based entry points */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Student card */}
        <a href="/application" style={{ textDecoration: 'none' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '3rem' }}>🎓</div>
            <h3 style={{ margin: '0.5rem 0' }}>I am a Student</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Apply for hostel accommodation
            </p>
          </div>
        </a>

        {/* Warden card */}
        <a href="/inventory" style={{ textDecoration: 'none' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '3rem' }}>🏠</div>
            <h3 style={{ margin: '0.5rem 0' }}>I am a Warden</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              View hostel inventory and bed map
            </p>
          </div>
        </a>
      </div>

      <p style={{ marginTop: '3rem', color: '#aaa', fontSize: '0.8rem' }}>
        P03 — Policy-Driven Hostel Allocation Engine · Week 5 Foundation Review
      </p>
    </div>
  );
}

// Inline style object for the cards (reused for both)
const cardStyle = {
  background: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  padding: '2rem',
  width: '200px',
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};
