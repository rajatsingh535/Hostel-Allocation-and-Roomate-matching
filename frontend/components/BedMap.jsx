// frontend/app/components/BedMap.jsx — M1: Visual Bed Map Component
// Rajat is responsible for this component (Week 5, M1)
//
// This component takes a list of rooms (each with beds) as a prop and
// renders a visual grid showing which beds are occupied vs available.
//
// In later weeks (M7 - Warden Review), this will support drag-to-reassign.
// For Week 5, it renders mock data to satisfy the Foundation Review criteria.

"use client"; // This is a Client Component because it handles user interaction

export default function BedMap({ rooms }) {
  // If no rooms data is passed in, show a placeholder message
  if (!rooms || rooms.length === 0) {
    return (
      <p style={{ color: '#888', fontStyle: 'italic' }}>
        No rooms to display. Add rooms to this hostel first.
      </p>
    );
  }

  return (
    <div>
      {/* Legend — helps wardens understand the colour coding at a glance */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <span style={legendStyle('#d4edda', '#28a745')}>🟢 Available</span>
        <span style={legendStyle('#f8d7da', '#dc3545')}>🔴 Occupied</span>
        <span style={legendStyle('#fff3cd', '#856404')}>🟡 Maintenance</span>
      </div>

      {/* Room grid — one card per room */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            {/* Room header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <strong>Room {room.roomNumber}</strong>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>{room.roomType}</span>
            </div>

            {/* Bed boxes — one per bed in the room */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {room.beds.map((bed) => (
                <div
                  key={bed.id}
                  title={bed.occupied ? 'Occupied' : 'Available'}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'default',
                    // Red for occupied, green for free
                    background: bed.occupied ? '#f8d7da' : '#d4edda',
                    color: bed.occupied ? '#842029' : '#0f5132',
                    border: `1px solid ${bed.occupied ? '#f5c2c7' : '#badbcc'}`,
                  }}
                >
                  Bed {bed.id}
                </div>
              ))}
            </div>

            {/* Show a badge if all beds in the room are full */}
            {room.beds.every((b) => b.occupied) && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#dc3545' }}>
                Room Full
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper to generate the legend item style
function legendStyle(bg, color) {
  return {
    background: bg,
    color: color,
    padding: '0.3rem 0.7rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 600,
  };
}
