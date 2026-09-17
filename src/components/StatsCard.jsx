/**
 * StatsCard.jsx
 * Reusable statistics display card used on the landing page and admin panel.
 * Accepts icon (emoji or svg string), value, label, and optional color variant.
 */
export default function StatsCard({ icon, value, label, color = "indigo" }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    green: "bg-green-50 text-green-700 border-green-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    violet: "bg-violet-50 text-violet-700 border-violet-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
  };

  const iconBgMap = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    violet: "bg-violet-100 text-violet-600",
    rose: "bg-rose-100 text-rose-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };

  return (
    <div className={`rounded-2xl border p-6 ${colorMap[color]} flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${iconBgMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold leading-none">{value}</p>
        <p className="text-sm font-medium mt-1 opacity-75">{label}</p>
      </div>
    </div>
  );
}
