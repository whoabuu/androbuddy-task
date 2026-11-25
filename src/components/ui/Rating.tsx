import type { Rating as RatingModel } from "../../types/product";

interface RatingProps {
  rating: RatingModel;
  showCount?: boolean;
}

export default function Rating({ rating, showCount = true }: RatingProps) {
  return (
    <div
      className="flex items-center gap-1 text-sm text-neutral-500"
      aria-label={`Rated ${rating.rate} out of 5 from ${rating.count} reviews`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-black" aria-hidden="true">
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-medium text-neutral-900">{rating.rate.toFixed(1)}</span>
      {showCount && <span>({rating.count})</span>}
    </div>
  );
}
