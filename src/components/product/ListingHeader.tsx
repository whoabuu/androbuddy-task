import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

interface ListingHeaderProps {
  title: string;
  count: number | null;
  /** True when a category filter is applied, which shows the "Clear filter" link. */
  filtered: boolean;
}

export default function ListingHeader({ title, count, filtered }: ListingHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div>
        <h1 className="text-3xl font-medium capitalize">{title}</h1>
        {count !== null && (
          <p className="mt-1 text-neutral-500">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>

      {filtered && (
        <Link
          to={routes.products}
          className="font-medium underline underline-offset-4 hover:text-neutral-500"
        >
          Clear filter
        </Link>
      )}
    </div>
  );
}
