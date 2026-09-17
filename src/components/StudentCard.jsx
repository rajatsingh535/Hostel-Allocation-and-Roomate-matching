/**
 * StudentCard.jsx
 * LPU student profile card — shows Reg. No., School, Program, LPU hostel block.
 */

const statusColors = {
  Allocated: "bg-green-100 text-green-700",
  Pending:   "bg-yellow-100 text-yellow-700",
  Rejected:  "bg-red-100 text-red-700",
};

export default function StudentCard({ student }) {
  const {
    name,
    regNo,
    program,
    school,
    year,
    gender,
    cgpa,
    interests,
    roomPreference,
    allocationStatus,
    avatar,
    avatarColor,
    hostelBlock,
    roomNo,
  } = student;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header: avatar + name + reg no */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {avatar}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-400 font-mono">Reg: {regNo}</p>
        </div>
        <span
          className={`ml-auto shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[allocationStatus]}`}
        >
          {allocationStatus}
        </span>
      </div>

      {/* Program & School */}
      <p className="text-sm font-medium text-gray-700 mb-0.5 truncate">{program}</p>
      <p className="text-xs text-gray-400 mb-2 truncate">{school}</p>
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <span>Year {year}</span>
        <span>•</span>
        <span>{gender}</span>
        <span>•</span>
        <span>CGPA: {cgpa}</span>
      </div>

      {/* LPU Hostel info */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2 mb-4 text-xs text-yellow-800 flex justify-between">
        <span>🏠 Block {hostelBlock} {roomNo ? `· Room ${roomNo}` : "· Unassigned"}</span>
        <span className="font-medium">{roomPreference}</span>
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-1.5">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-medium"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
}
