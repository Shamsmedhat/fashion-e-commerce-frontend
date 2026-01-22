/* eslint-disable react-hooks/rules-of-hooks */
import ProductsPageCover from "@/components/features/product/products-page-cover";
import TotalProducts from "@/components/features/product/total-products";
import { ProductGridSkeleton } from "@/components/skeletons/product/product-item.skeleton";
import React, { Suspense } from "react";

type MenPage = {
  params: { id: string; subcategory: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function page({ params, searchParams }: MenPage) {
  // Params
  const { id, subcategory } = params;

  return (
    <main className="min-h-screen mt-28">
      <ProductsPageCover
        imgSrc="/assets/images/children-cover.webp"
        className="object-[center_30%]"
      />

      <div className="py-5">
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <TotalProducts
            categoryId={id}
            searchParams={searchParams}
            basePath={`/category/children/${id}`}
            currentSubcategory={subcategory}
          />
        </Suspense>
      </div>
    </main>
  );
}
