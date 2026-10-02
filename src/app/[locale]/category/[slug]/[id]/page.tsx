import CategoryPage from "@/components/features/categories/category-page";
import { REVALIDATE_PRODUCT_LIST_SECONDS } from "@/lib/constants/data-cache.constant";
import type { ListingSearchParams } from "@/lib/utils/product-listing";

type MainCategoryPageProps = {
  params: { slug: string; id: string };
  searchParams: ListingSearchParams;
};

export const revalidate = REVALIDATE_PRODUCT_LIST_SECONDS;

// /category/{slug}/{id} — every product of a main category
export default function MainCategoryPage({ params, searchParams }: MainCategoryPageProps) {
  return <CategoryPage slug={params.slug} id={params.id} searchParams={searchParams} />;
}
