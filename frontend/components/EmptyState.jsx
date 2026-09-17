// frontend/components/EmptyState.jsx
// Reusable empty state component shown when an API returns an empty result set.
// Props:
//   icon     (string)   — emoji icon
//   title    (string)   — bold heading
//   message  (string)   — descriptive sub-text
//   action   (node)     — optional JSX element for a CTA button

export default function EmptyState({
  icon = '📭',
  title = 'Nothing here yet',
  message = 'No records found.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 animate-fade-in">
      {/* Icon circle */}
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
        {icon}
      </div>

      {/* Text */}
      <div className="text-center max-w-xs">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{message}</p>
      </div>

      {/* Optional CTA */}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
