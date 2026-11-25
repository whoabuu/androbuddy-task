import { useCallback, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../api/products";
import ErrorState from "../components/ErrorState";
import { Container } from "../components/Layout";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import { useAsync } from "../hooks/useAsync";

const PAGE_SIZE = 8;

export default function ProductListPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category")?.trim() || null;

  const rawPage = Number(params.get("page"));
  const requestedPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const { data, loading, error, retry } = useAsync(
    (signal) => (category ? getProductsByCategory(category, signal) : getProducts({}, signal)),
    [category],
  );

  const totalPages = data ? Math.max(1, Math.ceil(data.length / PAGE_SIZE)) : 1;
  const page = Math.min(requestedPage, totalPages);

  const pagedItems = useMemo(() => {
    if (!data) return null;
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  const goToPage = useCallback(
    (next: number, replace = false) => {
      setParams(
        (prev) => {
          const nextParams = new URLSearchParams(prev);
          if (next <= 1) nextParams.delete("page");
          else nextParams.set("page", String(next));
          return nextParams;
        },
        { replace },
      );
    },
    [setParams],
  );

  useEffect(() => {
    if (data && page !== requestedPage) goToPage(page, true);
  }, [data, page, requestedPage, goToPage]);

  return (
    <Container className="py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h1 className="text-3xl font-medium capitalize">{category ?? "All products"}</h1>
          {data && (
            <p className="mt-1 text-neutral-500">
              {data.length} {data.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        {category && (
          <Link
            to="/products"
            className="font-medium underline underline-offset-4 hover:text-neutral-500"
          >
            Clear filter
          </Link>
        )}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={retry} />
      ) : (
        <>
          <ProductGrid
            products={pagedItems}
            loading={loading}
            skeletonCount={PAGE_SIZE}
            emptyMessage={
              category ? `No products found in "${category}".` : "No products available."
            }
          />
          {data && totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          )}
        </>
      )}
    </Container>
  );
}