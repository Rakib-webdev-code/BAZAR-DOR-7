import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
      lastError = new Error(`API error ${res.status}`);
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError;
}

export const getCategories = () => get<Category[]>("/categories");

export const getProducts = (category?: string) =>
  get<Product[]>(
    category ? `/products?category=${encodeURIComponent(category)}` : "/products"
  );