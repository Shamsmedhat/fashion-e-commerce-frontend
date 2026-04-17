"use client";

import Image from "next/image";

import { useProductVariantSelection } from "@/hooks/features/products/use-product-variant-selection";

import { ProductDetailsInfo } from "./product-details-info";
import { ProductDetailsPurchase } from "./product-details-purchase";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  // Queries
  const variantSelection = useProductVariantSelection(product);

  // Variables
  const { originalPrice, selectedVariant } = variantSelection;

  return (
    <div className="w-full">
      {/* Hero image */}
      <div className="relative w-full h-[80vh] min-h-[60vh] overflow-hidden">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
        {originalPrice && selectedVariant?.priceDiscount && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded">
            -{Math.round(((originalPrice - selectedVariant.priceDiscount) / originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
          <ProductDetailsInfo product={product} variantSelection={variantSelection} />
          <ProductDetailsPurchase product={product} variantSelection={variantSelection} />
        </div>
      </div>
    </div>
  );
}
