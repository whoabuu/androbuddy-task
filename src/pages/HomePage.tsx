import CategoryChips from "../components/home/CategoryChips";
import Hero from "../components/home/Hero";
import ProductSection from "../components/home/ProductSection";
import Container from "../components/layout/Container";
import { useCategories, useFeaturedProducts, useTopRatedProducts } from "../hooks/useCatalog";
import { routes } from "../utils/routes";

export default function HomePage() {
  const categories = useCategories();
  const featured = useFeaturedProducts(8);
  const topRated = useTopRatedProducts(4);

  return (
    <>
      <Hero />

      <Container className="space-y-16 py-12">
        <CategoryChips
          categories={categories.data}
          loading={categories.loading}
          error={categories.error}
          onRetry={categories.retry}
        />

        <ProductSection
          title="Featured"
          products={featured.data}
          loading={featured.loading}
          error={featured.error}
          onRetry={featured.retry}
          skeletonCount={8}
          actionTo={routes.products}
        />

        <ProductSection
          title="Top rated"
          products={topRated.data}
          loading={topRated.loading}
          error={topRated.error}
          onRetry={topRated.retry}
          skeletonCount={4}
        />
      </Container>
    </>
  );
}
