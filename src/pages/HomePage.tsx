import { Link } from "react-router-dom";
import { getCategories, getProducts } from "../api/products";
import ErrorState from "../components/ErrorState";
import { Container } from "../components/Layout";
import ProductGrid from "../components/ProductGrid";
import { useAsync } from "../hooks/useAsync";

export default function HomePage() {
  const categories = useAsync((signal) => getCategories(signal), []);
  const featured = useAsync((signal) => getProducts({ limit: 8 }, signal), []);
  const topRated = useAsync(
    async (signal) =>
      [...(await getProducts({}, signal))]
        .sort((a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count)
        .slice(0, 4),
    [],
  );

  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-br from-neutral-950 via-neutral-800 to-neutral-600"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 -z-10 h-128 w-lg rounded-full bg-white/10 blur-3xl"
        />

        <Container className="flex min-h-104 flex-col justify-end gap-6 py-12 sm:min-h-136 lg:py-16">
          <p className="text-sm font-medium tracking-widest text-neutral-300 uppercase">
            New season
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-tighter uppercase italic sm:text-7xl lg:text-8xl">
            Move. Wear. Repeat.
          </h1>
          <p className="max-w-md text-lg text-neutral-300">
            Everyday essentials, jewelry and tech, picked for the way you live.
          </p>
          <div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-neutral-300"
            >
              Shop now
            </Link>
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-12">
        <section>
          <h2 className="mb-6 text-2xl font-medium">Shop by category</h2>
          {categories.error ? (
            <ErrorState
              compact
              title="Couldn't load categories"
              message={categories.error}
              onRetry={categories.retry}
            />
          ) : (
            <ul className="flex gap-3 overflow-x-auto pb-2">
              {categories.loading
                ? Array.from({ length: 4 }, (_, i) => (
                    <li key={i} className="shrink-0">
                      <div className="h-11 w-32 animate-pulse rounded-full bg-neutral-200" />
                    </li>
                  ))
                : categories.data?.map((category) => (
                    <li key={category} className="shrink-0">
                      <Link
                        to={`/products?category=${encodeURIComponent(category)}`}
                        className="inline-flex h-11 items-center rounded-full border border-neutral-300 px-6 font-medium capitalize transition-colors hover:border-black"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
            </ul>
          )}
        </section>

        <section>
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-medium">Featured</h2>
            <Link to="/products" className="font-medium underline-offset-4 hover:underline">
              View all
            </Link>
          </div>
          {featured.error ? (
            <ErrorState
              compact
              title="Couldn't load featured"
              message={featured.error}
              onRetry={featured.retry}
            />
          ) : (
            <ProductGrid
              products={featured.data}
              loading={featured.loading}
              skeletonCount={8}
            />
          )}
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-medium">Top rated</h2>
          {topRated.error ? (
            <ErrorState
              compact
              title="Couldn't load top rated"
              message={topRated.error}
              onRetry={topRated.retry}
            />
          ) : (
            <ProductGrid
              products={topRated.data}
              loading={topRated.loading}
              skeletonCount={4}
            />
          )}
        </section>
      </Container>
    </>
  );
}