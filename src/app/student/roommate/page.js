"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockStudents } from "@/lib/mockStudents";

const compatibilityFactors = {
  sleepSchedule: { weight: 25, label: "Sleep Schedule" },
  studyHabits: { weight: 20, label: "Study Habits" },
  cleanliness: { weight: 20, label: "Cleanliness" },
  interests: { weight: 15, label: "Common Interests" },
  department: { weight: 10, label: "Same Department" },
  year: { weight: 10, label: "Same Year" }
};

const calculateDetailedCompatibility = (student1, student2) => {
  const scores = {};
  let totalScore = 0;
  
  // Sleep Schedule
  const sleepMatch = student1.sleepSchedule === student2.sleepSchedule;
  scores.sleepSchedule = sleepMatch ? 100 : 30;
  totalScore += scores.sleepSchedule * compatibilityFactors.sleepSchedule.weight / 100;
  
  // Study Habits
  const studyMatch = student1.studyHabits === student2.studyHabits;
  scores.studyHabits = studyMatch ? 100 : 40;
  totalScore += scores.studyHabits * compatibilityFactors.studyHabits.weight / 100;
  
  // Cleanliness
  const cleanMatch = student1.cleanliness === student2.cleanliness;
  scores.cleanliness = cleanMatch ? 100 : 50;
  totalScore += scores.cleanliness * compatibilityFactors.cleanliness.weight / 100;
  
  // Common Interests
  const commonInterests = student1.interests.filter(i => student2.interests.includes(i));
  scores.interests = Math.min(100, (commonInterests.length / Math.max(student1.interests.length, student2.interests.length)) * 100);
  totalScore += scores.interests * compatibilityFactors.interests.weight / 100;
  
  // Same Department
  scores.department = student1.department === student2.department ? 100 : 0;
  totalScore += scores.department * compatibilityFactors.department.weight / 100;
  
  // Same Year
  scores.year = student1.year === student2.year ? 100 : 70;
  totalScore += scores.year * compatibilityFactors.year.weight / 100;
  
  return { totalScore: Math.round(totalScore), breakdown: scores, commonInterests };
};

const RoommateCard = ({ student, currentUser, onSendRequest, onViewProfile }) => {
  const [requestStatus, setRequestStatus] = useState("idle"); // idle, sending, sent, matched, declined
  const compatibility = calculateDetailedCompatibility(currentUser, student);
  
  const handleSendRequest = async () => {
    setRequestStatus("sending");
    // Simulate API call
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.7) {
        setRequestStatus("matched");
      } else if (random > 0.3) {
        setRequestStatus("sent");
      } else {
        setRequestStatus("declined");
      }
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-blue-600 bg-blue-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRequestButton = () => {
    switch (requestStatus) {
      case "sending":
        return (
          <button disabled className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          </button>
        );
      case "sent":
        return (
          <button disabled className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg">
            ⏳ Request Sent
          </button>
        );
      case "matched":
        return (
          <button disabled className="w-full px-4 py-2 bg-green-500 text-white rounded-lg">
            ✅ Matched!
          </button>
        );
      case "declined":
        return (
          <button disabled className="w-full px-4 py-2 bg-red-500 text-white rounded-lg">
            ❌ Declined
          </button>
        );
      default:
        return (
          <button 
            onClick={handleSendRequest}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Request
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.department} • {student.year}rd Year</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(compatibility.totalScore)}`}>
            {compatibility.totalScore}% Match
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">CGPA:</span>
            <span className="ml-2 font-medium">{student.cgpa}</span>
          </div>
          <div>
            <span className="text-gray-500">From:</span>
            <span className="ml-2 font-medium">{student.hometown}</span>
          </div>
          <div>
            <span className="text-gray-500">Sleep:</span>
            <span className="ml-2 font-medium">{student.sleepSchedule}</span>
          </div>
          <div>
            <span className="text-gray-500">Study:</span>
            <span className="ml-2 font-medium">{student.studyHabits}</span>
          </div>
        </div>

        {/* Compatibility Breakdown */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Compatibility Factors</span>
            <button 
              onClick={() => onViewProfile(student, compatibility)}
              className="text-xs text-blue-600 hover:underline"
            >
              View Details
            </button>
          </div>
          <div className="space-y-1">
            {Object.entries(compatibility.breakdown).slice(0, 3).map(([key, score]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-gray-600 capitalize">{compatibilityFactors[key]?.label}</span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                    <div 
                      className={`h-1.5 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                      style={{width: `${score}%`}}
                    ></div>
                  </div>
                  <span className="w-8 text-right">{score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Interests */}
        {compatibility.commonInterests.length > 0 && (
          <div className="mb-4">
            <span className="text-xs font-medium text-gray-700 block mb-2">Common Interests</span>
            <div className="flex flex-wrap gap-1">
              {compatibility.commonInterests.map((interest, idx) => (
                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  ✓ {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* All Interests */}
        <div className="mb-6">
          <span className="text-xs font-medium text-gray-700 block mb-2">All Interests</span>
          <div className="flex flex-wrap gap-1">
            {student.interests.map((interest, idx) => (
              <span 
                key={idx} 
                className={`px-2 py-1 rounded-full text-xs ${
                  compatibility.commonInterests.includes(interest) 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {getRequestButton()}
      </div>
    </div>
  );
};

const ProfileModal = ({ student, compatibility, onClose, currentUser }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                <p className="text-gray-600">{student.department} • {student.year}rd Year</p>
                <p className="text-sm text-gray-500">Roll: {student.rollNo}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Overall Compatibility */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {compatibility.totalScore}%
              </div>
              <div className="text-sm text-blue-800">Overall Compatibility</div>
            </div>
          </div>

          {/* Detailed Compatibility Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compatibility Analysis</h3>
            <div className="space-y-4">
              {Object.entries(compatibility.breakdown).map(([key, score]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700 w-24">
                      {compatibilityFactors[key]?.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({compatibilityFactors[key]?.weight}% weight)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          score >= 80 ? 'bg-green-500' : 
                          score >= 60 ? 'bg-blue-500' : 
                          score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${score}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Comparison */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">You</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Sleep:</span> {currentUser.sleepSchedule}</div>
                  <div><span className="text-gray-500">Study:</span> {currentUser.studyHabits}</div>
                  <div><span className="text-gray-500">Cleanliness:</span> {currentUser.cleanliness}</div>
                  <div><span className="text-gray-500">CGPA:</span> {currentUser.cgpa}</div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">{student.name}</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Sleep:</span> {student.sleepSchedule}</div>
                  <div><span className="text-gray-500">Study:</span> {student.studyHabits}</div>
                  <div><span className="text-gray-500">Cleanliness:</span> {student.cleanliness}</div>
                  <div><span className="text-gray-500">CGPA:</span> {student.cgpa}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Common & Different Interests */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests Analysis</h3>
            
            {compatibility.commonInterests.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-green-700 mb-2">
                  ✓ Common Interests ({compatibility.commonInterests.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {compatibility.commonInterests.map((interest, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {currentUser.interests.map((interest, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-1 rounded-full text-xs ${
                        compatibility.commonInterests.includes(interest)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{student.name}'s Interests</h4>
                <div className="flex flex-wrap gap-1">
                  {student.interests.map((interest, idx) => (
                    <span 
                      key={idx} 
                      className={`px-2 py-1 rounded-full text-xs ${
                        compatibility.commonInterests.includes(interest)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send Match Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RoommateMatching() {
  const [filters, setFilters] = useState({
    department: "All",
    year: "All",
    sleepSchedule: "All",
    studyHabits: "All",
    minCompatibility: 0,
    search: ""
  });
  const [sortBy, setSortBy] = useState("compatibility");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Mock current user
  const currentUser = mockStudents[0];

  const filteredAndSortedStudents = useMemo(() => {
    let result = mockStudents.filter(student => student.id !== currentUser.id);

    // Apply filters
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.interests.some(i => i.toLowerCase().includes(q))
      );
    }

    if (filters.department !== "All") {
      result = result.filter(s => s.department === filters.department);
    }

    if (filters.year !== "All") {
      result = result.filter(s => s.year.toString() === filters.year);
    }

    if (filters.sleepSchedule !== "All") {
      result = result.filter(s => s.sleepSchedule === filters.sleepSchedule);
    }

    if (filters.studyHabits !== "All") {
      result = result.filter(s => s.studyHabits === filters.studyHabits);
    }

    // Calculate compatibility and filter by minimum
    result = result.map(student => ({
      ...student,
      calculatedCompatibility: calculateDetailedCompatibility(currentUser, student).totalScore
    })).filter(student => student.calculatedCompatibility >= filters.minCompatibility);

    // Sort
    if (sortBy === "compatibility") {
      result.sort((a, b) => b.calculatedCompatibility - a.calculatedCompatibility);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "cgpa") {
      result.sort((a, b) => b.cgpa - a.cgpa);
    }

    return result;
  }, [filters, sortBy, currentUser]);

  const departments = ["All", ...Array.from(new Set(mockStudents.map(s => s.department)))];
  const years = ["All", "1", "2", "3", "4"];
  const sleepSchedules = ["All", ...Array.from(new Set(mockStudents.map(s => s.sleepSchedule)))];
  const studyHabits = ["All", ...Array.from(new Set(mockStudents.map(s => s.studyHabits)))];

  const handleViewProfile = (student, compatibility) => {
    setSelectedProfile({ student, compatibility });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Roommate</h1>
              <p className="text-gray-600 mt-1">
                {filteredAndSortedStudents.length} compatible students found
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/student/dashboard"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Dashboard
              </Link>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-md text-sm ${viewMode === "grid" ? 'bg-white shadow' : ''}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-md text-sm ${viewMode === "list" ? 'bg-white shadow' : ''}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Find Your Match</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Name, department, interests..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="compatibility">Best Match</option>
                  <option value="name">Name</option>
                  <option value="cgpa">CGPA</option>
                </select>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year === "All" ? "All Years" : `${year}rd Year`}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Schedule</label>
                  <select
                    value={filters.sleepSchedule}
                    onChange={(e) => setFilters(prev => ({ ...prev, sleepSchedule: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {sleepSchedules.map(schedule => (
                      <option key={schedule} value={schedule}>{schedule}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Study Habits</label>
                  <select
                    value={filters.studyHabits}
                    onChange={(e) => setFilters(prev => ({ ...prev, studyHabits: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {studyHabits.map(habit => (
                      <option key={habit} value={habit}>{habit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Compatibility: {filters.minCompatibility}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={filters.minCompatibility}
                    onChange={(e) => setFilters(prev => ({ ...prev, minCompatibility: Number(e.target.value) }))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              <button
                onClick={() => setFilters({
                  department: "All",
                  year: "All", 
                  sleepSchedule: "All",
                  studyHabits: "All",
                  minCompatibility: 0,
                  search: ""
                })}
                className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredAndSortedStudents.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more potential roommates</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filteredAndSortedStudents.map((student) => (
                  <RoommateCard
                    key={student.id}
                    student={student}
                    currentUser={currentUser}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <ProfileModal
          student={selectedProfile.student}
          compatibility={selectedProfile.compatibility}
          currentUser={currentUser}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}