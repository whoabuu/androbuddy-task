import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  actionTo?: string;
  actionLabel?: string;
}

export default function SectionHeader({
  title,
  actionTo,
  actionLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="text-2xl font-medium">{title}</h2>
      {actionTo && (
        <Link to={actionTo} className="font-medium underline-offset-4 hover:underline">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
