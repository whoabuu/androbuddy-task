interface ToastProps {
  message: string | null;
}

/** The live region is always mounted so screen readers announce new messages. */
export default function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      {message && (
        <div className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
