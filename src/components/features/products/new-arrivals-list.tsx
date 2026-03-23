import { getProductsService } from "@/lib/services/product.service";
import { filterProductsByVariants } from "@/lib/utils/filter-products-by-variants";
import { sortProducts } from "@/lib/utils/sort-products";
import { getTranslations } from "next-intl/server";

import ProductItem from "@/components/features/products/product-item";
import ProductsFilter from "@/components/features/products/products-filter";
import ProductsSort from "@/components/features/products/products-sort";

type NewArrivalsListProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function NewArrivalsList({
  searchParams,
}: NewArrivalsListProps): Promise<JSX.Element> {
  // Translations
  const t = await getTranslations();

  // API params (preserve createdAt when filters/sort change)
  const sortParam = typeof searchParams?.sort === "string" ? searchParams.sort : "-createdAt";
  const apiParams = {
    ...searchParams,
    sort: sortParam,
  };

  // Fetch products
  const response = await getProductsService(apiParams);
  const allProducts = response.data.products || [];

  // Filter variants based on searchParams
  const filteredProducts = filterProductsByVariants(allProducts, searchParams);

  // Apply sorting
  const sortedProducts = sortProducts(
    filteredProducts,
    typeof searchParams?.sort === "string" ? searchParams.sort : "",
  );

  // Empty state
  if (sortedProducts.length === 0) {
    return (
      <section className="m-4 py-12">
        <h2 className="mb-4 text-center text-2xl font-semibold uppercase text-primary">
          {t("new-arrivals-empty-title")}
        </h2>
        <p className="text-center capitalize text-muted-foreground">
          {t("new-arrivals-empty-description")}
        </p>
      </section>
    );
  }

  // UI
  return (
    <>
      {/* Filter and Sort */}
      <div className="flex justify-end gap-4 pb-6 m-4">
        <ProductsFilter products={allProducts} />
        <ProductsSort />
      </div>

      {/* Products */}
      <div className="m-4 pb-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
