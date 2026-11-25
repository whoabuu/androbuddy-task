import type { Product } from "../types/product";

/** Highest rating first; review count breaks ties. Does not mutate the input. */
export function selectTopRated(products: Product[], count: number): Product[] {
  return [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count)
    .slice(0, count);
}

/** Same-category products, excluding the one being viewed, capped at `count`. */
export function selectRelated(
  products: Product[],
  currentId: number,
  count: number,
): Product[] {
  return products.filter((p) => p.id !== currentId).slice(0, count);
}
