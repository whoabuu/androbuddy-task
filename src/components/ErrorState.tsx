interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  title?: string;
  compact?: boolean;
}

export default function ErrorState({
  message,
  onRetry,
  title = "Something went wrong",
  compact = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center gap-4 text-center ${compact ? "py-10" : "py-20"}`}
    >
      <p className={`font-extrabold uppercase tracking-tight ${compact ? "text-xl" : "text-3xl"}`}>
        {title}
      </p>
      <p className="text-neutral-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
      >
        Retry
      </button>
    </div>
  );
}