// frontend/components/ErrorState.jsx
// Reusable error state component shown when an API call fails.
// Props:
//   message  (string)   — error message to display
//   onRetry  (function) — optional callback, shows a retry button when provided

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
        ⚠️
      </div>

      {/* Message */}
      <div className="text-center max-w-sm">
        <h3 className="text-base font-semibold text-gray-800 mb-1">Error</h3>
        <p className="text-sm text-gray-500">{message}</p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 bg-lpu-navy text-white text-sm font-semibold rounded-lg
                     hover:bg-lpu-blue transition-colors focus-visible:ring-2 focus-visible:ring-lpu-gold"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
