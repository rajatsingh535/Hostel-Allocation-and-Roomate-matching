// frontend/components/ApplicationForm.jsx — M2: Multi-Step Student Application Form
// Rajat is responsible for this component (Week 5, M2)
//
// Features:
//   - 4-step form: Personal → Academic → Preferences → Review & Submit
//   - Progress indicator with step labels
//   - Controlled React inputs with inline validation
//   - Auto-saves draft to localStorage on every change
//   - Real POST to /api/cycles/:id/applications on submit
//   - Loading/success/error feedback
//
// Props:
//   cycleId (string) — MongoDB _id of the active allocation cycle

'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const DRAFT_KEY = 'hostel_application_draft';

// ── Step definitions ───────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Personal',     icon: '👤' },
  { id: 2, label: 'Academic',     icon: '🎓' },
  { id: 3, label: 'Preferences',  icon: '🏠' },
  { id: 4, label: 'Review',       icon: '✅' },
];

// ── Initial form state ─────────────────────────────────────────────────────────
const INITIAL_FORM = {
  // Step 1 — Personal
  studentId:   '',
  studentName: '',
  email:       '',
  phone:       '',
  gender:      '',
  // Step 2 — Academic
  programme:    '',
  yearOfStudy:  '',
  cgpa:         '',
  feeCategory:  '',
  // Step 3 — Preferences
  hostelPreference:   'No preference',
  roomTypePreference: 'Double',
  specialRequirement: '',
};

// ── Progress indicator component ──────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, idx) => {
        const done    = step.id < current;
        const active  = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${done   ? 'bg-green-500 text-white shadow-sm'
                  : active ? 'bg-lpu-navy text-white shadow-md ring-4 ring-lpu-navy/20'
                           : 'bg-gray-100 text-gray-400 border border-gray-200'}`}
              >
                {done ? '✓' : step.icon}
              </div>
              <span className={`text-xs font-medium hidden sm:block
                ${active ? 'text-lpu-navy' : done ? 'text-green-600' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>

            {/* Connector line (not after last step) */}
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-colors ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Reusable field wrapper ────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputCls = `w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
  focus:outline-none focus:ring-2 focus:ring-lpu-navy/30 focus:border-lpu-navy
  placeholder:text-gray-400 transition-all`;

const selectCls = `${inputCls} bg-white`;

// ── Main Form Component ───────────────────────────────────────────────────────
export default function ApplicationForm({ cycleId }) {
  const [step,       setStep]     = useState(1);
  const [form,       setForm]     = useState(INITIAL_FORM);
  const [errors,     setErrors]   = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle|loading|success|error
  const [submitError,  setSubmitError]  = useState('');

  // ── Auto-load draft from localStorage ────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // ── Auto-save draft on every change ──────────────────────────────────────
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(form)); } catch { /* ignore */ }
  }, [form]);

  // ── Field change handler ──────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ── Per-step validation ───────────────────────────────────────────────────
  const validate = (stepNum) => {
    const errs = {};
    if (stepNum === 1) {
      if (!form.studentId.trim())   errs.studentId   = 'Student ID is required';
      if (!form.studentName.trim()) errs.studentName = 'Full name is required';
      if (!form.email.trim())       errs.email       = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
      if (!form.gender)             errs.gender      = 'Please select gender';
    }
    if (stepNum === 2) {
      if (!form.programme)          errs.programme   = 'Please select your programme';
      if (!form.yearOfStudy)        errs.yearOfStudy = 'Please select year of study';
      if (!form.feeCategory)        errs.feeCategory = 'Please select fee category';
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validate(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Final submit ──────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitStatus('loading');
    setSubmitError('');

    const payload = {
      ...form,
      yearOfStudy: Number(form.yearOfStudy),
    };

    try {
      const id = cycleId || 'demo';
      const res = await fetch(`${API_BASE}/api/cycles/${id}/applications`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error?.message || `Server error ${res.status}`);
      }

      setSubmitStatus('success');
      localStorage.removeItem(DRAFT_KEY);   // Clear saved draft
      setForm(INITIAL_FORM);
      setStep(1);

    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err.message);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 max-w-2xl animate-fade-in">

      <StepIndicator current={step} />

      {/* ── Step 1: Personal Information ─────────────────────────────── */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <SectionTitle icon="👤" title="Personal Information" subtitle="Your basic identity details" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Student ID" required error={errors.studentId}>
              <input className={inputCls} name="studentId" placeholder="e.g. 22BCE1234"
                     value={form.studentId} onChange={handleChange} />
            </Field>

            <Field label="Full Name" required error={errors.studentName}>
              <input className={inputCls} name="studentName" placeholder="e.g. Rajat Singh"
                     value={form.studentName} onChange={handleChange} />
            </Field>

            <Field label="Email Address" required error={errors.email}>
              <input className={inputCls} type="email" name="email" placeholder="student@lpu.in"
                     value={form.email} onChange={handleChange} />
            </Field>

            <Field label="Phone Number" error={errors.phone}>
              <input className={inputCls} type="tel" name="phone" placeholder="10-digit mobile"
                     value={form.phone} onChange={handleChange} />
            </Field>

            <Field label="Gender" required error={errors.gender}>
              <select className={selectCls} name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other / Prefer not to say</option>
              </select>
            </Field>
          </div>
        </div>
      )}

      {/* ── Step 2: Academic Information ─────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <SectionTitle icon="🎓" title="Academic Information" subtitle="Your current enrolment details" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Programme" required error={errors.programme}>
              <select className={selectCls} name="programme" value={form.programme} onChange={handleChange}>
                <option value="">Select programme</option>
                {['B.Tech CSE','B.Tech ECE','B.Tech ME','B.Tech Civil','M.Tech AI',
                  'M.Tech CSE','MBA','BCA','MCA','PhD'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field label="Year of Study" required error={errors.yearOfStudy}>
              <select className={selectCls} name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange}>
                <option value="">Select year</option>
                {[1,2,3,4,5].map((y) => <option key={y} value={y}>{y === 5 ? '5th (Dual Degree)' : `${y}${['st','nd','rd','th'][y-1] || 'th'} Year`}</option>)}
              </select>
            </Field>

            <Field label="CGPA" error={errors.cgpa}>
              <input className={inputCls} type="number" min="0" max="10" step="0.01"
                     name="cgpa" placeholder="e.g. 8.75"
                     value={form.cgpa} onChange={handleChange} />
            </Field>

            <Field label="Fee Category" required error={errors.feeCategory}>
              <select className={selectCls} name="feeCategory" value={form.feeCategory} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="General">General</option>
                <option value="SC/ST">SC / ST</option>
                <option value="OBC">OBC</option>
                <option value="EWS">EWS</option>
                <option value="PWD">PWD (Differently Abled)</option>
              </select>
            </Field>
          </div>
        </div>
      )}

      {/* ── Step 3: Hostel Preferences ───────────────────────────────── */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <SectionTitle icon="🏠" title="Hostel Preferences" subtitle="Your accommodation preferences (used for allocation scoring)" />

          <Field label="Preferred Hostel">
            <select className={selectCls} name="hostelPreference" value={form.hostelPreference} onChange={handleChange}>
              <option value="No preference">No preference</option>
              <option value="Saraswati Hostel">Saraswati Hostel</option>
              <option value="Tagore Hostel">Tagore Hostel</option>
              <option value="Gandhi Hostel">Gandhi Hostel</option>
              <option value="Patel Hostel">Patel Hostel</option>
              <option value="Nehru Hostel">Nehru Hostel</option>
            </select>
          </Field>

          <Field label="Preferred Room Type">
            <select className={selectCls} name="roomTypePreference" value={form.roomTypePreference} onChange={handleChange}>
              <option value="Single">Single occupancy</option>
              <option value="Double">Double occupancy (shared)</option>
              <option value="Triple">Triple occupancy</option>
              <option value="Quad">Four-bed room</option>
            </select>
          </Field>

          <Field label="Special Requirements / Accessibility Needs">
            <textarea className={`${inputCls} resize-none`} name="specialRequirement" rows={3}
                      placeholder="e.g. wheelchair access, ground floor, near elevator..."
                      value={form.specialRequirement} onChange={handleChange} />
          </Field>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800">
            <strong>📌 Note:</strong> Preferences are used for scoring during allocation but are not guaranteed.
            Hard constraints (eligibility, capacity, gender policy) always take priority.
          </div>
        </div>
      )}

      {/* ── Step 4: Review & Submit ─────────────────────────────────── */}
      {step === 4 && (
        <div className="space-y-5 animate-fade-in">
          <SectionTitle icon="✅" title="Review & Submit" subtitle="Check your details before submitting" />

          <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-100 text-sm">
            <ReviewRow label="Student ID"     value={form.studentId} />
            <ReviewRow label="Full Name"      value={form.studentName} />
            <ReviewRow label="Email"          value={form.email} />
            <ReviewRow label="Gender"         value={form.gender} />
            <ReviewRow label="Programme"      value={form.programme} />
            <ReviewRow label="Year of Study"  value={form.yearOfStudy ? `Year ${form.yearOfStudy}` : '—'} />
            <ReviewRow label="CGPA"           value={form.cgpa || '—'} />
            <ReviewRow label="Fee Category"   value={form.feeCategory} />
            <ReviewRow label="Hostel Pref."   value={form.hostelPreference} />
            <ReviewRow label="Room Type"      value={form.roomTypePreference} />
            {form.specialRequirement && (
              <ReviewRow label="Special Req." value={form.specialRequirement} />
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800">
            <strong>⚠️ By submitting you confirm:</strong> All information is accurate. False information may lead to application rejection.
          </div>

          {/* Submit feedback */}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              ❌ {submitError || 'Submission failed. Please try again.'}
            </div>
          )}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
              ✅ Application submitted! Your eligibility will be reviewed within 2 working days.
            </div>
          )}
        </div>
      )}

      {/* ── Navigation buttons ────────────────────────────────────────── */}
      <div className="flex justify-between mt-8 pt-5 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-600
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Back
        </button>

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-lpu-navy text-white
                       hover:bg-lpu-blue transition-all shadow-sm"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitStatus === 'loading' || submitStatus === 'success'}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-green-600 text-white
                       hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {submitStatus === 'loading' ? '⏳ Submitting…' : '🚀 Submit Application'}
          </button>
        )}
      </div>

      {/* Auto-save indicator */}
      <p className="text-center text-xs text-gray-400 mt-3">
        💾 Draft auto-saved locally
      </p>
    </div>
  );
}

// ── Mini sub-components ───────────────────────────────────────────────────────
function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-2">
      <h2 className="text-lg font-bold text-gray-900">{icon} {title}</h2>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between px-4 py-2.5">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold text-right max-w-xs truncate">{value || '—'}</span>
    </div>
  );
}
