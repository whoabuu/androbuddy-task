import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[] | null;
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
}

const GRID = "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

export default function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={GRID} aria-busy="true">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div key={i} aria-hidden="true">
            <div className="aspect-square w-full animate-pulse bg-neutral-200" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-4/5 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-4 w-2/5 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-4 w-1/4 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-4 w-1/5 animate-pulse rounded-sm bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="py-16 text-center text-neutral-500">{emptyMessage}</p>;
  }

  return (
    <ul className={GRID}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}