import CategoryPage from "@/components/features/categories/category-page";
import { REVALIDATE_PRODUCT_LIST_SECONDS } from "@/lib/constants/data-cache.constant";
import type { ListingSearchParams } from "@/lib/utils/product-listing";

type SubCategoryPageProps = {
  // subcategory is [slug, id], e.g. ["men-shoes", "64f0…04"]
  params: { slug: string; id: string; subcategory: string[] };
  searchParams: ListingSearchParams;
};

export const revalidate = REVALIDATE_PRODUCT_LIST_SECONDS;

// /category/{slug}/{id}/{subcategory-slug}/{subcategory-id} — one subcategory
export default function SubCategoryPage({ params, searchParams }: SubCategoryPageProps) {
  return (
    <CategoryPage
      slug={params.slug}
      id={params.id}
      subCategoryId={params.subcategory[1]}
      searchParams={searchParams}
    />
  );
}
