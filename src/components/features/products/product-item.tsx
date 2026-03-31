"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { displayProductRating } from "@/components/shared/product-rating";
import { Button } from "@/components/ui/button";
import { useFormatCurrency } from "@/hooks/shared/use-format-currency";
import { getTailwindColor } from "@/lib/utils/get-tailwind-color";
import { cn } from "@/lib/utils/tailwind-merge";

import AddToBagButton from "../bag/add-to-bag-button";

// Type
type ProductItemProps = {
  product: Product;
  className?: string;
  showAddToBag?: boolean;
  discountOverride?: number;
};

export default function ProductItem({ product, discountOverride }: ProductItemProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { formatCurrency } = useFormatCurrency();

  // Variables (unique colors)
  const allColors = Array.from(
    new Set(
      product.variants?.map((v) => v.color?.toLowerCase()).filter((c): c is string => !!c) || [],
    ),
  );
  // Calculate the lowest price across all variants (considering priceDiscount)
  const allPrices = product.variants?.map((v) => v.priceDiscount || v.price) || [];
  const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  // Find the variant with the lowest price for discount calculation
  const lowestPriceVariant = product.variants?.find((v) => {
    const variantPrice = v.priceDiscount || v.price;
    return variantPrice === lowestPrice;
  });
  const priceDiscount = lowestPriceVariant?.priceDiscount;
  const originalPrice = priceDiscount ? lowestPriceVariant?.price : null;
  const displayPrice = lowestPrice;
  const discountPercentage =
    discountOverride !== undefined
      ? discountOverride
      : priceDiscount && originalPrice
        ? Math.round(((originalPrice - priceDiscount) / originalPrice) * 100)
        : null;

  // Functions
  function displayProductColors(colorName: string) {
    const cssColor = getTailwindColor(colorName) || colorName;

    return (
      <div
        key={colorName}
        className="w-5 h-5 rounded-full border border-gray-300 hover:border-gray-600 transition-colors"
        style={{ backgroundColor: cssColor }}
        title={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
        aria-label={`Color: ${colorName}`}
      />
    );
  }

  // UI
  return (
    <div className="group relative overflow-hidden transition-all duration-300">
      {/* Discount Badge */}
      {discountPercentage && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Product Image*/}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product._id}`} className="block relative w-full h-full">
          <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-[1.04]">
            <Image
              src={product.coverImage || "/assets/images/product.png"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        {/* Add to bag btn */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden">
          {product.variants && product.variants.length > 0 ? (
            <AddToBagButton
              productId={product._id}
              variantSku={product.variants[0].sku}
              className="w-full rounded-none h-12 bg-primary-950 text-white font-semibold transition-transform duration-500 flex items-center justify-center hover:bg-gray-900 group-hover:translate-y-0 translate-y-full capitalize"
            >
              {t("add-to-bag")}
            </AddToBagButton>
          ) : (
            <Button
              disabled
              className={cn(
                "w-full h-12 bg-black text-white font-semibold capitalize transition-transform duration-500 flex items-center justify-center hover:bg-gray-900 group-hover:translate-y-0 translate-y-full opacity-50 cursor-not-allowed",
              )}
            >
              {t("product-not-available")}
            </Button>
          )}
        </div>
      </div>

      {/* Product info*/}
      <div className="px-4 py-4 space-y-2">
        <Link href={`/products/${product._id}`}>
          {/* Product name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          {/* Price */}
          <span className="text-lg font-bold text-gray-900">{formatCurrency(displayPrice)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        {/* Variant Colors */}
        {allColors.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            {allColors.map((colorName) => displayProductColors(colorName))}
          </div>
        )}

        {/* Rating */}
        {product.ratingsAverage !== undefined && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">{displayProductRating(product.ratingsAverage)}</div>
            <span className="text-sm text-gray-600">({product.reviewCount || 0})</span>
          </div>
        )}
      </div>
    </div>
  );
}
