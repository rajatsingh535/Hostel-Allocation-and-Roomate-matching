'use client';

import { useState } from 'react';

const APPLICATION_STEPS = [
  { id: 1, title: 'Personal Info', icon: '👤' },
  { id: 2, title: 'Academic Info', icon: '🎓' },
  { id: 3, title: 'Hostel Preferences', icon: '🏠' },
  { id: 4, title: 'Documents', icon: '📄' },
  { id: 5, title: 'Review & Submit', icon: '✓' }
];

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    academic: {
      course: '',
      year: '',
      rollNumber: '',
      cgpa: '',
      department: ''
    },
    preferences: {
      hostels: [],
      roomType: '',
      specialRequirements: ''
    },
    documents: {
      photo: null,
      idProof: null,
      academicRecords: null,
      medicalCertificate: null
    }
  });

  const updateFormData = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < APPLICATION_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = () => {
    console.log('Submitting application:', formData);
    alert('Application submitted successfully!');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lpu-navy mb-2">Hostel Application</h1>
            <p className="text-gray-600">
              Complete your hostel allocation application in 5 simple steps
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Module 8:</span>
            <span>Application Form</span>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {APPLICATION_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step.id
                    ? 'bg-lpu-gold text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span className="text-xs text-gray-600 mt-2 text-center">
                  {step.title}
                </span>
              </div>
              {index < APPLICATION_STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-lpu-gold' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={(e) => updateFormData('personal', 'fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => updateFormData('personal', 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                  placeholder="your.email@lpu.in"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.personal.phone}
                  onChange={(e) => updateFormData('personal', 'phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.personal.dateOfBirth}
                  onChange={(e) => updateFormData('personal', 'dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  value={formData.personal.gender}
                  onChange={(e) => updateFormData('personal', 'gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Permanent Address *
              </label>
              <textarea
                value={formData.personal.address}
                onChange={(e) => updateFormData('personal', 'address', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                placeholder="Enter your complete permanent address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  value={formData.personal.emergencyContact}
                  onChange={(e) => updateFormData('personal', 'emergencyContact', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                  placeholder="Parent/Guardian name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  value={formData.personal.emergencyPhone}
                  onChange={(e) => updateFormData('personal', 'emergencyPhone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lpu-gold focus:border-transparent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>
        )}
        {/* Step 4: Documents & Step 5: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'photo', label: 'Passport Size Photo', required: true },
                { key: 'idProof', label: 'ID Proof (Aadhar/Passport)', required: true },
                { key: 'academicRecords', label: 'Academic Records', required: true },
                { key: 'medicalCertificate', label: 'Medical Certificate', required: false }
              ].map((doc) => (
                <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {doc.label} {doc.required && '*'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => updateFormData('documents', doc.key, e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lpu-gold file:text-white hover:file:bg-lpu-gold/90"
                  />
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Review & Submit</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Application Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.personal.fullName}</p>
                <p><span className="font-medium">Course:</span> {formData.academic.course}</p>
                <p><span className="font-medium">Hostel Preferences:</span> {formData.preferences.hostels.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="text-lpu-gold focus:ring-lpu-gold" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the terms and conditions and hostel rules
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-semibold ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Previous
          </button>
          
          {currentStep < APPLICATION_STEPS.length ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white rounded-lg font-semibold"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={submitApplication}
              className="px-6 py-2 bg-lpu-gold hover:bg-lpu-gold/90 text-white rounded-lg font-semibold"
            >
              Submit Application
            </button>
          )}
        </div>

      </div>
    </div>
  );
}