/**
 * Calculates the discount percentage for a product
 */
function getProductDiscountPercentage(product: Product): number {
  let maxDiscount = 0;

  product.variants.forEach((variant) => {
    if (variant.priceDiscount && variant.price > 0) {
      const discount = ((variant.price - variant.priceDiscount) / variant.price) * 100;
      maxDiscount = Math.max(maxDiscount, discount);
    }
  });

  return maxDiscount;
}

/**
 * Gets the lowest price across all variants of a product
 */
function getProductLowestPrice(product: Product): number {
  const allPrices = product.variants.map((v) => v.priceDiscount || v.price);
  return allPrices.length > 0 ? Math.min(...allPrices) : Infinity;
}

function getProductHighestPrice(product: Product): number {
  const allPrices = product.variants.map((v) => v.priceDiscount || v.price);
  return allPrices.length > 0 ? Math.max(...allPrices) : Infinity;
}

/**
 * Sorts products based on the sort option
 */
export function sortProducts(products: Product[], sortOption: string): Product[] {
  if (!sortOption) {
    return products;
  }

  const sortedProducts = [...products];

  switch (sortOption) {
    // Highest discount first
    case "discount":
      return sortedProducts.sort((a, b) => {
        const discountA = getProductDiscountPercentage(a);
        const discountB = getProductDiscountPercentage(b);
        return discountB - discountA;
      });

    // Lowest price first
    case "price-low-to-high":
      return sortedProducts.sort((a, b) => {
        const priceA = getProductLowestPrice(a);
        const priceB = getProductLowestPrice(b);
        return priceA - priceB;
      });

    // highest price first
    case "price-high-to-low":
      return sortedProducts.sort((b, a) => {
        const priceA = getProductHighestPrice(a);
        const priceB = getProductHighestPrice(b);
        return priceA - priceB;
      });

    default:
      return products;
  }
}
