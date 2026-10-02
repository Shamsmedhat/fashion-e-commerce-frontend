type VariantFilters = {
  colors: string[];
  sizes: string[];
};

/**
 * Keeps the products that have at least one variant matching the selected colours and sizes,
 * and only those matching variants (so the card shows the price of what was filtered for).
 */
export function filterProductsByVariants(
  products: Product[],
  { colors, sizes }: VariantFilters,
): Product[] {
  // If no filters are applied, return products as-is
  if (colors.length === 0 && sizes.length === 0) {
    return products;
  }

  return products.flatMap((product) => {
    const variants = product.variants.filter((variant) => {
      const matchesColor =
        colors.length === 0 || colors.includes(variant.color?.toLowerCase() || "");
      const matchesSize = sizes.length === 0 || sizes.includes(variant.size?.toLowerCase() || "");

      return matchesColor && matchesSize;
    });

    return variants.length > 0 ? [{ ...product, variants }] : [];
  });
}
