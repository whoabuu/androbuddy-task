import type { Product } from "../../types/product";
import { useRelatedProducts } from "../../hooks/useCatalog";
import ProductSection from "../home/ProductSection";

interface RelatedProductsProps {
  product: Product;
}

/** Up to 4 other products from the same category. Hides itself if there are none. */
export default function RelatedProducts({ product }: RelatedProductsProps) {
  const { data, loading, error, retry } = useRelatedProducts(product, 4);

  if (!loading && !error && data !== null && data.length === 0) return null;

  return (
    <div className="mt-20">
      <ProductSection
        title="Related products"
        products={data}
        loading={loading}
        error={error}
        onRetry={retry}
        skeletonCount={4}
      />
    </div>
  );
}
