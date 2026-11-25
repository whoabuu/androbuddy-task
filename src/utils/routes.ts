export const routes = {
  home: "/",
  products: "/products",
  product: (id: number): string => `/products/${id}`,
  category: (name: string): string =>
    `/products?${new URLSearchParams({ category: name }).toString()}`,
} as const;
