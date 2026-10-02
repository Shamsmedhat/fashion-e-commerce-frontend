import { Suspense } from "react";

import ProductsPageCover from "@/components/features/products/products-page-cover";
import TotalProducts from "@/components/features/products/total-products";
import { ProductGridSkeleton } from "@/components/skeletons/products/product-item.skeleton";
import type { ListingSearchParams } from "@/lib/utils/product-listing";

// Cover artwork for the main categories that have one. A category added later in the CMS
// still gets a working page, with the default cover.
const COVERS: Record<string, { src: string; className: string }> = {
  men: { src: "/assets/images/men-cover.png", className: "object-[center_25%]" },
  women: { src: "/assets/images/women-cover.png", className: "object-[center_80%]" },
  children: { src: "/assets/images/children-cover.webp", className: "object-[center_30%]" },
};

const DEFAULT_COVER = { src: "/assets/images/new-arrival.png", className: "" };

type CategoryPageProps = {
  /** Slug of the main category, e.g. "men". */
  slug: string;
  /** Id of the main category. */
  id: string;
  /** Id of the selected subcategory, when one is open. */
  subCategoryId?: string;
  searchParams: ListingSearchParams;
};

export default function CategoryPage({ slug, id, subCategoryId, searchParams }: CategoryPageProps) {
  const cover = COVERS[slug] ?? DEFAULT_COVER;

  return (
    <main className="mt-28 min-h-screen">
      <ProductsPageCover imgSrc={cover.src} className={cover.className} />

      <div className="py-5">
        <Suspense
          fallback={
            <div role="status" aria-live="polite" aria-label="Loading products">
              <ProductGridSkeleton count={8} />
            </div>
          }
        >
          <TotalProducts
            categoryId={id}
            subCategoryId={subCategoryId}
            basePath={`/category/${slug}/${id}`}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </main>
  );
}
