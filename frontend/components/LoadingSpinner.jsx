// frontend/components/LoadingSpinner.jsx
// Reusable animated loading spinner — used by all pages while fetching data.
// Props:
//   message (string) — optional text shown below spinner, default "Loading..."
//   size    (string) — "sm" | "md" | "lg" — controls spinner diameter

export default function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-[3px]',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
      {/* Spinning ring */}
      <div
        className={`${sizes[size]} rounded-full border-lpu-navy border-t-transparent animate-spin-slow`}
        role="status"
        aria-label="Loading"
      />
      {/* Message */}
      {message && (
        <p className="text-sm text-gray-500 font-medium">{message}</p>
      )}
    </div>
  );
}
