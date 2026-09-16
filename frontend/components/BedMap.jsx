import React from 'react';

/**
 * M1 Module: Visual Bed Map Placeholder (Frontend)
 * This fulfills part of the Week 5 requirement for the Warden View.
 * It will eventually support drag-to-reassign.
 */
export default function BedMap({ rooms }) {
  // Mock data for visual demonstration
  const mockRooms = rooms || [
    { roomNumber: '101', beds: [{ id: 'A', occupied: true }, { id: 'B', occupied: false }] },
    { roomNumber: '102', beds: [{ id: 'A', occupied: false }, { id: 'B', occupied: false }] }
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Warden View: Floor Bed Map</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRooms.map((room) => (
          <div key={room.roomNumber} className="border rounded p-4 shadow-sm bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Room {room.roomNumber}</h3>
            <div className="flex gap-2">
              {room.beds.map((bed) => (
                <div 
                  key={bed.id} 
                  className={`p-3 rounded border text-center flex-1 cursor-pointer 
                    ${bed.occupied ? 'bg-red-200 border-red-400' : 'bg-green-200 border-green-400'}`}
                  title={bed.occupied ? 'Occupied' : 'Available'}
                >
                  Bed {bed.id}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        * Drag-and-drop reassignment will be implemented in later modules.
      </p>
    </div>
  );
}
