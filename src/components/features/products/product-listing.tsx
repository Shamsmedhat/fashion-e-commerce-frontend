import { getTranslations } from "next-intl/server";

import { filterProductsByVariants } from "@/lib/utils/filter-products-by-variants";
import {
  type ListingSearchParams,
  paginate,
  parseListingParams,
} from "@/lib/utils/product-listing";
import { sortProducts } from "@/lib/utils/sort-products";

import ProductItem from "./product-item";
import ProductsFilter from "./products-filter";
import ProductsPagination from "./products-pagination";
import ProductsSort from "./products-sort";

type ProductListingProps = {
  /** Every product of the listing; filtering, sorting and paging happen here. */
  products: Product[];
  searchParams: ListingSearchParams;
};

export default async function ProductListing({ products, searchParams }: ProductListingProps) {
  // Translations
  const t = await getTranslations();

  // Variables
  const { colors, sizes, sort, page } = parseListingParams(searchParams);
  const matching = sortProducts(filterProductsByVariants(products, { colors, sizes }), sort);
  const current = paginate(matching, page);

  return (
    <>
      {/* Filter and Sort — always shown, so an empty result can be undone.
          The filter gets every product so it can count all available colours. */}
      <div className="m-4 flex justify-end gap-4 pb-6">
        <ProductsFilter products={products} />
        <ProductsSort />
      </div>

      {/* Products */}
      {current.items.length === 0 ? (
        <section className="m-4 py-12" role="status">
          <h2 className="mb-4 text-center text-2xl font-semibold uppercase text-primary">
            {t("products-empty-title")}
          </h2>
          <p className="text-center text-muted-foreground">{t("products-empty-description")}</p>
        </section>
      ) : (
        <div className="m-4 pb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {current.items.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <ProductsPagination page={current.page} totalPages={current.totalPages} />
    </>
  );
}
