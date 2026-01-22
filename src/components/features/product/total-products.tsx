import { getProductsService } from "@/lib/services/product.service";
import { filterProductsByVariants } from "@/lib/utils/filter-products-by-variants";
import { sortProducts } from "@/lib/utils/sort-products";
import ProductItem from "../product/product-item";
import ProductsFilter from "../filters/products-filter";
import ProductsSort from "../filters/products-sort";
import { getSubCategoriesService } from "@/lib/services/category.service";
import SubcategoryList from "./subcategory-list";

export default async function TotalProducts({
  categoryId,
  searchParams,
  basePath,
  currentSubcategory,
  subCategoryId,
}: {
  categoryId: string;
  searchParams: Record<string, string | string[] | undefined>;
  basePath: string;
  currentSubcategory: string;
  subCategoryId?: string;
}) {
  // Fetch
  const [productsResponse, subCategoriesResponse] = await Promise.all([
    getProductsService({
      mainCategory: categoryId,
      ...(subCategoryId && { categoryId: subCategoryId }),
      ...searchParams,
    }),
    getSubCategoriesService(categoryId),
  ]);

  // Variables
  const allProducts = productsResponse.data.products || [];
  const allSubCategories = subCategoriesResponse.data.categories || [];

  // Filter variants within products based on searchParams
  // This ensures only variants matching the selected colors/sizes are returned
  const filteredProducts = filterProductsByVariants(allProducts, searchParams);

  // Apply sorting if sort parameter is present
  const sortOption = typeof searchParams.sort === "string" ? searchParams.sort : "";
  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortOption);

  return (
    <>
      {/* Subcategory Navigation */}
      <SubcategoryList
        allSubCategories={allSubCategories}
        basePath={basePath}
        currentSubcategory={currentSubcategory}
      />

      {/* Filter and Sort */}
      <div className="flex gap-4 mb-6 justify-end">
        {/* Pass allProducts to filter so it can show all available colors */}
        <ProductsFilter products={allProducts} />
        <ProductsSort />
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        {sortedAndFilteredProducts.map((product: Product) => (
          <ProductItem key={product._id} product={product} searchParams={searchParams} />
        ))}
      </div>
    </>
  );
}
