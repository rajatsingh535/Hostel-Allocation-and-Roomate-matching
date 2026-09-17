'use client';

import { useState } from 'react';

// Mock room inventory data
const HOSTEL_INVENTORY = {
  'BH1': {
    name: 'Boys Hostel 1',
    blocks: {
      'A': {
        floors: {
          '1': {
            rooms: {
              '101': { beds: [{ id: 'A101B1', status: 'ALLOCATED', student: 'Rajat Singh' }, { id: 'A101B2', status: 'AVAILABLE' }] },
              '102': { beds: [{ id: 'A102B1', status: 'AVAILABLE' }, { id: 'A102B2', status: 'MAINTENANCE' }] },
              '103': { beds: [{ id: 'A103B1', status: 'ALLOCATED', student: 'Arjun Kumar' }, { id: 'A103B2', status: 'RESERVED' }] }
            }
          },
          '2': {
            rooms: {
              '201': { beds: [{ id: 'A201B1', status: 'AVAILABLE' }, { id: 'A201B2', status: 'AVAILABLE' }] },
              '202': { beds: [{ id: 'A202B1', status: 'ALLOCATED', student: 'Vikram Shah' }, { id: 'A202B2', status: 'BLOCKED' }] }
            }
          }
        }
      },
      'B': {
        floors: {
          '1': {
            rooms: {
              '101': { beds: [{ id: 'B101B1', status: 'ALLOCATED', student: 'Rohit Sharma' }, { id: 'B101B2', status: 'AVAILABLE' }] },
              '102': { beds: [{ id: 'B102B1', status: 'AVAILABLE' }, { id: 'B102B2', status: 'AVAILABLE' }] }
            }
          }
        }
      }
    }
  },
  'BH2': {
    name: 'Boys Hostel 2',
    blocks: {
      'A': {
        floors: {
          '1': {
            rooms: {
              '101': { beds: [{ id: 'BH2A101B1', status: 'ALLOCATED', student: 'Amit Patel' }, { id: 'BH2A101B2', status: 'ALLOCATED', student: 'Suresh Kumar' }] }
            }
          }
        }
      }
    }
  }
};

const BED_STATUS = {
  'AVAILABLE': { color: 'bg-green-500', label: 'Available', textColor: 'text-green-700' },
  'ALLOCATED': { color: 'bg-red-500', label: 'Allocated', textColor: 'text-red-700' },
  'RESERVED': { color: 'bg-yellow-500', label: 'Reserved', textColor: 'text-yellow-700' },
  'MAINTENANCE': { color: 'bg-orange-500', label: 'Maintenance', textColor: 'text-orange-700' },
  'BLOCKED': { color: 'bg-gray-500', label: 'Blocked', textColor: 'text-gray-700' }
};

export default function RoomInventoryPage() {
  const [selectedHostel, setSelectedHostel] = useState('BH1');
  const [selectedBlock, setSelectedBlock] = useState('A');
  const [selectedFloor, setSelectedFloor] = useState('1');
  const [editingBed, setEditingBed] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const currentInventory = HOSTEL_INVENTORY[selectedHostel];
  const currentBlock = currentInventory?.blocks[selectedBlock];
  const currentFloor = currentBlock?.floors[selectedFloor];

  const handleStatusChange = (bedId, status) => {
    // In real app, this would make API call
    console.log(`Changing bed ${bedId} to status ${status}`);
    setEditingBed(null);
    setNewStatus('');
  };

  const getBedStats = () => {
    const stats = { AVAILABLE: 0, ALLOCATED: 0, RESERVED: 0, MAINTENANCE: 0, BLOCKED: 0 };
    
    Object.values(HOSTEL_INVENTORY).forEach(hostel => {
      Object.values(hostel.blocks).forEach(block => {
        Object.values(block.floors).forEach(floor => {
          Object.values(floor.rooms).forEach(room => {
            room.beds.forEach(bed => {
              stats[bed.status]++;
            });
          });
        });
      });
    });

    return stats;
  };

  const bedStats = getBedStats();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Room & Bed Inventory</h1>
            <p className="text-gray-600">
              Manage hostel hierarchy: Hostel → Block → Floor → Room → Bed
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 3:</span>
            <span>Warden Hostel & Room Management</span>
          </div>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(bedStats).map(([status, count]) => {
          const config = BED_STATUS[status];
          return (
            <div key={status} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className={`w-8 h-8 ${config.color} rounded-full mx-auto mb-2`}></div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-600">{config.label}</p>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Hostel Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Hostel
            </label>
            <select
              value={selectedHostel}
              onChange={(e) => {
                setSelectedHostel(e.target.value);
                setSelectedBlock('A');
                setSelectedFloor('1');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              {Object.entries(HOSTEL_INVENTORY).map(([id, hostel]) => (
                <option key={id} value={id}>{hostel.name}</option>
              ))}
            </select>
          </div>

          {/* Block Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Block
            </label>
            <select
              value={selectedBlock}
              onChange={(e) => {
                setSelectedBlock(e.target.value);
                setSelectedFloor('1');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              {currentInventory && Object.keys(currentInventory.blocks).map(blockId => (
                <option key={blockId} value={blockId}>Block {blockId}</option>
              ))}
            </select>
          </div>

          {/* Floor Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Floor
            </label>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none text-sm bg-white"
            >
              {currentBlock && Object.keys(currentBlock.floors).map(floorId => (
                <option key={floorId} value={floorId}>Floor {floorId}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Room Layout */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {currentInventory?.name} - Block {selectedBlock} - Floor {selectedFloor}
          </h2>
          <div className="flex items-center gap-4 text-xs">
            {Object.entries(BED_STATUS).map(([status, config]) => (
              <div key={status} className="flex items-center gap-1">
                <div className={`w-3 h-3 ${config.color} rounded-full`}></div>
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        {currentFloor ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(currentFloor.rooms).map(([roomId, room]) => (
              <div key={roomId} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">
                  Room {roomId}
                </h3>
                
                <div className="space-y-3">
                  {room.beds.map((bed) => {
                    const statusConfig = BED_STATUS[bed.status];
                    
                    return (
                      <div
                        key={bed.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 ${statusConfig.color} rounded-full`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {bed.id}
                            </p>
                            {bed.student && (
                              <p className="text-xs text-gray-600">{bed.student}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${statusConfig.textColor}`}>
                            {statusConfig.label}
                          </span>
                          <button
                            onClick={() => {
                              setEditingBed(bed.id);
                              setNewStatus(bed.status);
                            }}
                            className="text-xs bg-lpu-navy text-white px-2 py-1 rounded hover:bg-lpu-gold transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600">
              No rooms available for the selected hostel, block, and floor.
            </p>
          </div>
        )}
      </div>

      {/* Status Change Modal */}
      {editingBed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Update Bed Status
            </h2>
            <p className="text-gray-600 mb-4">
              Changing status for bed: <span className="font-semibold">{editingBed}</span>
            </p>
            
            <div className="space-y-3 mb-6">
              {Object.entries(BED_STATUS).map(([status, config]) => (
                <label key={status} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newStatus === status}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="text-lpu-gold focus:ring-lpu-gold"
                  />
                  <div className={`w-4 h-4 ${config.color} rounded-full`}></div>
                  <span className="font-medium">{config.label}</span>
                </label>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setEditingBed(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(editingBed, newStatus)}
                className="flex-1 px-4 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white font-semibold rounded-lg transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}