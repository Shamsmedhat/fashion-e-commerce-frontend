/* eslint-disable react-hooks/rules-of-hooks */
import ProductsPageCover from "@/components/features/products/products-page-cover";
import TotalProducts from "@/components/features/products/total-products";
import { ProductGridSkeleton } from "@/components/skeletons/products/product-item.skeleton";
import { REVALIDATE_PRODUCT_LIST_SECONDS } from "@/lib/constants/data-cache.constant";
import React, { Suspense } from "react";

type MenPage = {
  params: { id: string; subcategory: string; subCategoryId: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export const revalidate = REVALIDATE_PRODUCT_LIST_SECONDS;

export default function page({ params, searchParams }: MenPage) {
  // Params
  const { id, subcategory } = params;

  return (
    <main className="min-h-screen mt-28">
      {/* TODO: Create a layout fot this */}
      <ProductsPageCover imgSrc="/assets/images/men-cover.png" className="object-[center_25%]" />

      <div className="py-5">
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <TotalProducts
            categoryId={id}
            searchParams={searchParams}
            basePath={`/category/men/${id}`}
            currentSubcategory={subcategory}
            subCategoryId={subcategory[1]}
          />
        </Suspense>
      </div>
    </main>
  );
}
