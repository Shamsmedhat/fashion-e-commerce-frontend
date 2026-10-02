// How many products a listing shows per page.
export const PRODUCTS_PAGE_SIZE = 12;

// A listing loads its whole (cached) product set in one request and filters, sorts and pages it
// on the server. That keeps the colour counts and "sort by discount" correct across pages and
// needs one cache entry per category instead of one per filter combination. The API caps a
// page at 100 rows, so a category that outgrows this needs API-side paging instead.
export const PRODUCTS_FETCH_LIMIT = 100;

export const SORT_OPTIONS = ["discount", "price-low-to-high", "price-high-to-low"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number] | "";

export type ListingSearchParams = Record<string, string | string[] | undefined>;

export type ListingParams = {
  colors: string[];
  sizes: string[];
  sort: SortOption;
  page: number;
};

const toList = (value: string | string[] | undefined): string[] =>
  (Array.isArray(value) ? value : value ? [value] : [])
    .flatMap((entry) => entry.split(","))
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

// Reads the search params a listing understands. Everything else in the URL
// (utm_source, fbclid, callbackUrl, ...) is ignored, so it can never empty the list.
export function parseListingParams(searchParams: ListingSearchParams = {}): ListingParams {
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "";
  const page = Number(typeof searchParams.page === "string" ? searchParams.page : "1");

  return {
    colors: toList(searchParams["variants.color"]),
    sizes: toList(searchParams["variants.size"]),
    sort: (SORT_OPTIONS as readonly string[]).includes(sort) ? (sort as SortOption) : "",
    page: Number.isInteger(page) && page >= 1 ? page : 1,
  };
}

export type Page<T> = {
  items: T[];
  page: number;
  totalPages: number;
  total: number;
};

// A page number past the end shows the last page instead of an empty one.
export function paginate<T>(items: T[], page: number, pageSize = PRODUCTS_PAGE_SIZE): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    total: items.length,
  };
}
