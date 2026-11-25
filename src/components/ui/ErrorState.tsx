import { Button } from "./Button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  title?: string;
}

export default function ErrorState({
  message,
  onRetry,
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-20 text-center">
      <h2 className="text-3xl font-extrabold uppercase tracking-tight">{title}</h2>
      <p className="text-neutral-500">{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
