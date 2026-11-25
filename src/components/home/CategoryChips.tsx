import { Link } from "react-router-dom";
import type { Category } from "../../types/product";
import { routes } from "../../utils/routes";
import ErrorState from "../ui/ErrorState";
import SectionHeader from "../ui/SectionHeader";
import Skeleton from "../ui/Skeleton";

interface CategoryChipsProps {
  categories: Category[] | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function CategoryChips({
  categories,
  loading,
  error,
  onRetry,
}: CategoryChipsProps) {
  return (
    <section>
      <SectionHeader title="Shop by category" />

      {error ? (
        <ErrorState compact title="Couldn't load categories" message={error} onRetry={onRetry} />
      ) : (
        <ul className="flex gap-3 overflow-x-auto pb-2">
          {loading
            ? Array.from({ length: 4 }, (_, i) => (
                <li key={i} className="shrink-0">
                  <Skeleton className="h-11 w-32 rounded-full" />
                </li>
              ))
            : categories?.map((category) => (
                <li key={category} className="shrink-0">
                  <Link
                    to={routes.category(category)}
                    className="inline-flex h-11 items-center rounded-full border border-neutral-300 px-6 font-medium capitalize transition-colors hover:border-black"
                  >
                    {category}
                  </Link>
                </li>
              ))}
        </ul>
      )}
    </section>
  );
}
