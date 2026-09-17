import MatchRequestButton from "./MatchRequestButton";

/**
 * MatchCard.jsx — LPU student roommate suggestion card.
 */

function ScoreBadge({ score }) {
  let colorClass;
  if (score >= 85) colorClass = "bg-green-500";
  else if (score >= 70) colorClass = "bg-yellow-400";
  else colorClass = "bg-red-400";

  return (
    <div className={`${colorClass} text-white rounded-full w-14 h-14 flex flex-col items-center justify-center shrink-0 shadow`}>
      <span className="text-lg font-extrabold leading-none">{score}</span>
      <span className="text-[9px] font-medium uppercase tracking-wide leading-none mt-0.5">Match</span>
    </div>
  );
}

const preferenceIcons = {
  "Night Owl":   "🌙",
  "Early Bird":  "☀️",
  "Neat":        "✨",
  "Very Neat":   "💎",
  "Moderate":    "👌",
  "Quiet Study": "📖",
  "Group Study": "👥",
  "Solo Study":  "🎧",
};

export default function MatchCard({ student }) {
  const {
    id,
    name,
    regNo,
    program,
    year,
    avatar,
    avatarColor,
    matchScore,
    interests,
    sleepSchedule,
    cleanliness,
    studyHabits,
    hometown,
    cgpa,
    roomPreference,
    hostelBlock,
  } = student;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      {/* Top: avatar + name + score */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base truncate">{name}</h3>
          <p className="text-xs text-gray-500">{program} &bull; Year {year}</p>
          <p className="text-xs text-gray-400 mt-0.5 font-mono">Reg: {regNo}</p>
          <p className="text-xs text-gray-400">CGPA: {cgpa} &nbsp;|&nbsp; From {hometown}</p>
        </div>
        <ScoreBadge score={matchScore} />
      </div>

      {/* LPU Block badge */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-full text-xs font-semibold w-fit">
        🏠 LPU Block {hostelBlock}
      </div>

      {/* Preference pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {[sleepSchedule, cleanliness, studyHabits].map((pref) => (
          <span
            key={pref}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
          >
            {preferenceIcons[pref] ?? "•"} {pref}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
          🛏 {roomPreference}
        </span>
      </div>

      {/* Interests */}
      <div className="mb-1">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-1.5">Interests</p>
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

      {/* CTA */}
      <div className="mt-auto">
        <MatchRequestButton studentId={id} studentName={name} />
      </div>
    </div>
  );
}
