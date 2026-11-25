import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[] | null;
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
}

// 1 col mobile, 2 small tablet, 3 tablet, 4 desktop
const GRID =
  "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

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
          <ProductCardSkeleton key={i} />
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
