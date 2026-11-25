export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

/** Reads a ?page= value. Anything that is not a whole number >= 1 means page 1. */
export function parsePage(raw: string | null): number {
  const value = Number(raw);
  return Number.isInteger(value) && value >= 1 ? value : 1;
}

/** Slices one page out of a list. A page past the end is clamped to the last page. */
export function paginate<T>(items: T[], requestedPage: number, pageSize: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page,
    totalPages,
    totalItems: items.length,
  };
}
