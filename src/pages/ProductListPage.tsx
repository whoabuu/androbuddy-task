import { useSearchParams } from "react-router-dom";
import Container from "../components/layout/Container";
import ListingHeader from "../components/product/ListingHeader";
import ProductGrid from "../components/product/ProductGrid";
import ErrorState from "../components/ui/ErrorState";
import Pagination from "../components/ui/Pagination";
import { useProductList } from "../hooks/useCatalog";
import { usePagination } from "../hooks/usePagination";

const PAGE_SIZE = 8;

export default function ProductListPage() {
  const [params] = useSearchParams();
  const category = params.get("category")?.trim() || null;

  const { data, loading, error, retry } = useProductList(category);
  const { view, goToPage } = usePagination(data, PAGE_SIZE);

  return (
    <Container className="py-10">
      <ListingHeader
        title={category ?? "All products"}
        count={data ? data.length : null}
        filtered={category !== null}
      />

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <>
          <ProductGrid
            products={view ? view.items : null}
            loading={loading}
            skeletonCount={PAGE_SIZE}
            emptyMessage={
              category ? `No products found in "${category}".` : "No products available."
            }
          />
          {view && view.totalPages > 1 && (
            <Pagination page={view.page} totalPages={view.totalPages} onChange={goToPage} />
          )}
        </>
      )}
    </Container>
  );
}
