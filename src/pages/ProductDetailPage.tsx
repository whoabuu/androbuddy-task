import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getProductsByCategory } from "../api/products";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import FadeImage from "../components/FadeImage";
import { Container } from "../components/Layout";
import { formatPrice } from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import Rating from "../components/Rating";
import { useAsync } from "../hooks/useAsync";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const [toast, setToast] = useState<string | null>(null);

  const { data: product, loading, error, retry } = useAsync(
    (signal) => getProduct(productId, signal),
    [productId],
  );

  const related = useAsync(
    async (signal) => {
      if (!product) return [];
      const items = await getProductsByCategory(product.category, signal);
      return items.filter((item) => item.id !== product.id).slice(0, 4);
    },
    [product?.id, product?.category],
    Boolean(product),
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <Container className="py-8">
        <div aria-busy="true">
          <div className="mb-6 h-4 w-64 animate-pulse rounded-sm bg-neutral-200" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="aspect-square w-full animate-pulse bg-neutral-200" />
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-9 w-4/5 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-6 w-24 animate-pulse rounded-sm bg-neutral-200" />
              <div className="h-5 w-40 animate-pulse rounded-sm bg-neutral-200" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full animate-pulse rounded-sm bg-neutral-200" />
                <div className="h-4 w-full animate-pulse rounded-sm bg-neutral-200" />
                <div className="h-4 w-3/4 animate-pulse rounded-sm bg-neutral-200" />
              </div>
              <div className="mt-6 h-14 w-full animate-pulse rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <ErrorState message={error} onRetry={retry} />
      </Container>
    );
  }

  if (!product) {
    return (
      <NotFoundPage
        title="Product not found"
        message="We couldn't find that product. It may have been removed, or the link may be wrong."
        actionTo="/products"
        actionLabel="Browse all products"
      />
    );
  }

  function handleAddToCart() {
    console.log("Add to cart (stub)", { id: product!.id, title: product!.title });
    setToast("Added to cart (demo)");
  }

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          {
            label: product.category,
            to: `/products?category=${encodeURIComponent(product.category)}`,
          },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square overflow-hidden bg-surface">
          <FadeImage
            src={product.image}
            alt={product.title}
            loading="eager"
            className="h-full w-full object-contain p-10 mix-blend-multiply sm:p-16"
          />
        </div>

        <div className="flex flex-col gap-4 lg:py-4">
          <p className="text-neutral-500 capitalize">{product.category}</p>
          <h1 className="text-3xl leading-tight font-medium sm:text-4xl">{product.title}</h1>
          <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
          <Rating rating={product.rating} countStyle="full" size="md" />
          <p className="mt-2 leading-7 text-neutral-700">{product.description}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 w-full rounded-full bg-black px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {(related.loading || related.error || (related.data && related.data.length > 0)) && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-medium">Related products</h2>
          {related.error ? (
            <ErrorState
              compact
              title="Couldn't load related products"
              message={related.error}
              onRetry={related.retry}
            />
          ) : (
            <ProductGrid
              products={related.data}
              loading={related.loading}
              skeletonCount={4}
            />
          )}
        </section>
      )}

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      >
        {toast && (
          <div className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </Container>
  );
}