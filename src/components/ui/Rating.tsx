import type { Rating as RatingModel } from "../../types/product";

interface RatingProps {
  rating: RatingModel;
  /** "compact" renders (259); "full" renders 259 reviews. */
  countStyle?: "compact" | "full";
  size?: "sm" | "md";
}

export default function Rating({
  rating,
  countStyle = "compact",
  size = "sm",
}: RatingProps) {
  const text = size === "sm" ? "text-sm" : "text-base";
  const star = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={`flex items-center gap-1 text-neutral-500 ${text}`}
      aria-label={`Rated ${rating.rate} out of 5 from ${rating.count} reviews`}
    >
      <svg viewBox="0 0 20 20" className={`fill-black ${star}`} aria-hidden="true">
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-medium text-neutral-900">{rating.rate.toFixed(1)}</span>
      <span>{countStyle === "full" ? `· ${rating.count} reviews` : `(${rating.count})`}</span>
    </div>
  );
}
