/**
 * Next.js `fetch` `next.revalidate` values (seconds) and related client timings.
 * Prefer `POST /api/revalidate` + tags when CMS knows data changed.
 */

/** Best sellers list — most frequent time-based refresh. */
/** 7 days */
export const REVALIDATE_BEST_SELLING_SECONDS = 60 * 60 * 24 * 7;

/** Product grids (new arrivals, category PLP) — collections change rarely; use `products` tag webhooks. */
/** 75 days */
export const REVALIDATE_PRODUCT_LIST_SECONDS = 60 * 60 * 24 * 75;

/** PDP product document — long-lived; use `product-{id}` webhooks for price/title/image updates. */
/** 30 days */
export const REVALIDATE_PRODUCT_DETAIL_SECONDS = 60 * 60 * 24 * 30;

/**
 * Variants (sizes/stock) — shorter than PDP when inventory may move without a full product save.
 * Tune down (e.g. 3600) if stock accuracy beats bandwidth.
 */
/** 6 hours */
export const REVALIDATE_PRODUCT_VARIANTS_SECONDS = 60 * 60 * 6;

/** Category tree / nav — rare changes; `categories` / `main-categories` webhooks are primary. */
/** 1 year */
export const REVALIDATE_CATEGORY_STABLE_SECONDS = 60 * 60 * 24 * 365;

/** Client React Query `staleTime` for `/api/products/:id` variants (ms). */
/** 15 minutes */
export const STALE_TIME_PRODUCT_VARIANTS_MS = 15 * 60 * 1000;
