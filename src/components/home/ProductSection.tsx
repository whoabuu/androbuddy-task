import type { Product } from "../../types/product";
import ProductGrid from "../product/ProductGrid";
import ErrorState from "../ui/ErrorState";
import SectionHeader from "../ui/SectionHeader";

interface ProductSectionProps {
  title: string;
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  skeletonCount?: number;
  actionTo?: string;
}

/** A titled product grid that owns its own loading and error state. */
export default function ProductSection({
  title,
  products,
  loading,
  error,
  onRetry,
  skeletonCount,
  actionTo,
}: ProductSectionProps) {
  return (
    <section>
      <SectionHeader title={title} actionTo={actionTo} />

      {error ? (
        <ErrorState
          compact
          title={`Couldn't load ${title.toLowerCase()}`}
          message={error}
          onRetry={onRetry}
        />
      ) : (
        <ProductGrid products={products} loading={loading} skeletonCount={skeletonCount} />
      )}
    </section>
  );
}
