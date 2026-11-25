import {
  getCategories,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "../api/products";
import type { Product } from "../types/product";
import { selectRelated, selectTopRated } from "../utils/products";
import { useAsync } from "./useAsync";

export function useCategories() {
  return useAsync((signal) => getCategories(signal), []);
}

export function useFeaturedProducts(limit = 8) {
  return useAsync((signal) => getProducts({ limit }, signal), [limit]);
}

export function useTopRatedProducts(count = 4) {
  return useAsync(
    async (signal) => selectTopRated(await getProducts({}, signal), count),
    [count],
  );
}

/** All products, or only one category's products when `category` is set. */
export function useProductList(category: string | null) {
  return useAsync(
    (signal) =>
      category ? getProductsByCategory(category, signal) : getProducts({}, signal),
    [category],
  );
}

/** Resolves to null when the id is invalid or unknown. */
export function useProduct(id: number) {
  return useAsync((signal) => getProduct(id, signal), [id]);
}

export function useRelatedProducts(product: Product, count = 4) {
  const { id, category } = product;
  return useAsync(
    async (signal) => selectRelated(await getProductsByCategory(category, signal), id, count),
    [id, category, count],
  );
}
