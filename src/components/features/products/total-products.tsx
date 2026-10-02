import { notFound } from "next/navigation";

import { getSubCategoriesService } from "@/lib/services/category.service";
import { getProductsService } from "@/lib/services/product.service";
import { AppError } from "@/lib/utils/app-errors";
import { type ListingSearchParams, PRODUCTS_FETCH_LIMIT } from "@/lib/utils/product-listing";

import SubcategoryList from "../categories/subcategory-list";
import ProductListing from "./product-listing";

type TotalProductsProps = {
  categoryId: string;
  subCategoryId?: string;
  basePath: string;
  searchParams: ListingSearchParams;
};

export default async function TotalProducts({
  categoryId,
  subCategoryId,
  basePath,
  searchParams,
}: TotalProductsProps) {
  // Fetch
  const [productsResponse, subCategoriesResponse] = await Promise.all([
    getProductsService({
      mainCategory: categoryId,
      ...(subCategoryId && { categoryId: subCategoryId }),
      limit: PRODUCTS_FETCH_LIMIT,
    }),
    getSubCategoriesService(categoryId),
  ]).catch((error: unknown) => {
    // A malformed or unknown category id in the URL is a missing page, not a server error.
    if (error instanceof AppError && [400, 404].includes(error.statusCode)) notFound();
    throw error;
  });

  return (
    <>
      {/* Subcategory Navigation */}
      <SubcategoryList
        allSubCategories={subCategoriesResponse.data.categories || []}
        basePath={basePath}
        currentSubcategoryId={subCategoryId}
      />

      {/* Filter, sort, products and pagination */}
      <ProductListing products={productsResponse.data.products || []} searchParams={searchParams} />
    </>
  );
}
