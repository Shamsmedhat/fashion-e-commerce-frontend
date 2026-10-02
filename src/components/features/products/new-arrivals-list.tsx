import ProductListing from "@/components/features/products/product-listing";
import { getProductsService } from "@/lib/services/product.service";
import { type ListingSearchParams, PRODUCTS_FETCH_LIMIT } from "@/lib/utils/product-listing";

type NewArrivalsListProps = {
  searchParams: ListingSearchParams;
};

export default async function NewArrivalsList({
  searchParams,
}: NewArrivalsListProps): Promise<JSX.Element> {
  // Fetch — newest first. The page's own search params are never forwarded to the API.
  const response = await getProductsService({ sort: "-createdAt", limit: PRODUCTS_FETCH_LIMIT });

  return <ProductListing products={response.data.products || []} searchParams={searchParams} />;
}
