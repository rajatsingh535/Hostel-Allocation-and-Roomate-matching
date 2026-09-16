import React, { useState } from 'react';

/**
 * M2 Module: Student Application Form Component (Frontend)
 * This fulfills part of the Week 5 requirement for the mobile-first student application.
 * Team Member 4 is assigned to expand this!
 */
export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    studentId: '',
    cycleId: 'cycle-fall-2024',
    documentsUploaded: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In Week 5, Team Member 4 will connect this to Team Member 3's backend API
    console.log('Submitting application data to backend:', formData);
    alert('Application drafted successfully! (Backend integration pending)');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Hostel Allocation Application</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Student ID Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Student ID</label>
          <input 
            type="text" 
            className="border border-gray-300 rounded w-full p-2"
            placeholder="e.g. STU12345"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
          />
        </div>

        {/* Allocation Cycle Read-Only Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Allocation Cycle</label>
          <input 
            type="text" 
            className="border border-gray-300 rounded w-full p-2 bg-gray-100"
            value="Fall 2024 Allocation"
            disabled
          />
        </div>

        {/* Placeholder for Document Upload (M2 Requirement) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Eligibility Documents</label>
          <input 
            type="file" 
            className="border border-gray-300 rounded w-full p-2"
            onChange={() => setFormData({ ...formData, documentsUploaded: true })}
          />
          <small className="text-gray-500">Upload fee receipt or required docs.</small>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Draft Application
        </button>

      </form>
    </div>
  );
}
