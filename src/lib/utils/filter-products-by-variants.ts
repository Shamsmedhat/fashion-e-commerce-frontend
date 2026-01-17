/**
 * Filters products and their variants based on query parameters
 * Only returns variants that match the selected filters
 */
export function filterProductsByVariants(
  products: Product[],
  searchParams: Record<string, string | string[] | undefined>
): Product[] {
  // Extract filter values from searchParams
  const colorFilter = searchParams["variants.color"];
  const sizeFilter = searchParams["variants.size"];

  // Convert filters to arrays for easier handling
  const selectedColors = Array.isArray(colorFilter)
    ? colorFilter.map((c) => c.toLowerCase())
    : colorFilter
    ? [colorFilter.toLowerCase()]
    : [];

  const selectedSizes = Array.isArray(sizeFilter)
    ? sizeFilter.map((s) => s.toLowerCase())
    : sizeFilter
    ? [sizeFilter.toLowerCase()]
    : [];

  // If no filters are applied, return products as-is
  if (selectedColors.length === 0 && selectedSizes.length === 0) {
    return products;
  }

  // Filter products and their variants
  return products
    .map((product) => {
      // Filter variants that match the selected filters
      const filteredVariants = product.variants.filter((variant) => {
        const variantColor = variant.color?.toLowerCase() || "";
        const variantSize = variant.size?.toLowerCase() || "";

        // Check if variant matches color filter
        const matchesColor =
          selectedColors.length === 0 || selectedColors.includes(variantColor);

        // Check if variant matches size filter
        const matchesSize =
          selectedSizes.length === 0 || selectedSizes.includes(variantSize);

        return matchesColor && matchesSize;
      });

      // Only return product if it has matching variants
      if (filteredVariants.length === 0) {
        return null;
      }

      // Return product with filtered variants
      return {
        ...product,
        variants: filteredVariants,
      };
    })
    .filter((product): product is Product => product !== null);
}
