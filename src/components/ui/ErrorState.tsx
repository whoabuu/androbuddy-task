import { Button } from "./Button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  title?: string;
  /** Smaller padding and type, for errors inside a page section. */
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
      <p
        className={`font-extrabold uppercase tracking-tight ${compact ? "text-xl" : "text-3xl"}`}
      >
        {title}
      </p>
      <p className="text-neutral-500">{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
