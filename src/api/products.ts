import { http } from "./client";
import type { Category, Product } from "../types/product";

export async function getProducts(
  params: { limit?: number } = {},
  signal?: AbortSignal,
): Promise<Product[]> {
  const { data } = await http.get<Product[]>("/products", { params, signal });
  return data;
}

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const { data } = await http.get<Category[]>("/products/categories", { signal });
  return data;
}

export async function getProductsByCategory(
  category: Category,
  signal?: AbortSignal,
): Promise<Product[]> {
  const { data } = await http.get<Product[]>(
    `/products/category/${encodeURIComponent(category)}`,
    { signal },
  );
  return data;
}


export async function getProduct(
  id: number,
  signal?: AbortSignal,
): Promise<Product | null> {
  if (!Number.isInteger(id) || id <= 0) return null;

  const { data } = await http.get<Product | "" | null>(`/products/${id}`, {
    signal,
  });

  if (!data || typeof data !== "object" || typeof data.id !== "number") {
    return null;
  }

  return data;
}
