import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import ProductDetail from "../components/product/ProductDetail";
import ProductDetailSkeleton from "../components/product/ProductDetailSkeleton";
import RelatedProducts from "../components/product/RelatedProducts";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ErrorState from "../components/ui/ErrorState";
import NotFoundState from "../components/ui/NotFoundState";
import { useProduct } from "../hooks/useCatalog";
import { routes } from "../utils/routes";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useProduct(Number(id));

  if (loading) {
    return (
      <Container className="py-8">
        <ProductDetailSkeleton />
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
      <NotFoundState
        title="Product not found"
        message="We couldn't find that product. It may have been removed, or the link may be wrong."
        actionTo={routes.products}
        actionLabel="Browse all products"
      />
    );
  }

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: routes.home },
          { label: "Products", to: routes.products },
          { label: product.category, to: routes.category(product.category) },
          { label: product.title },
        ]}
      />
      <ProductDetail product={product} />
      <RelatedProducts product={product} />
    </Container>
  );
}
