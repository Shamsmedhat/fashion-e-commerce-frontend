"use client";

import Image from "next/image";

import { useProductVariantSelection } from "@/hooks/features/products/use-product-variant-selection";
import { cn } from "@/lib/utils/tailwind-merge";

import { ProductDetailsInfo } from "./product-details-info";
import { ProductDetailsPurchase } from "./product-details-purchase";
import { useMemo, useState } from "react";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  // State
  const [selectedImageCover, setSelectedImageCover] = useState<string>(product.coverImage);
  const [selectedImageName, setSelectedImageName] = useState<string>(product.name);

  // Queries
  const variantSelection = useProductVariantSelection(product);

  // Variables
  const { originalPrice, selectedVariant } = variantSelection;

  // Gallery — the cover image plus the product's additional images (deduped).
  const galleryImages = useMemo(
    () =>
      Array.from(
        new Set([product.coverImage, ...(product.images ?? [])].filter(Boolean)),
      ),
    [product.coverImage, product.images],
  );

  // Functions
  function onSelectImage(image: string): void {
    setSelectedImageCover(image);
    setSelectedImageName(product.name);
  }

  return (
    <div className="w-full">
      {/* Hero image */}
      <div className="relative w-full h-[80vh] min-h-[60vh] overflow-hidden">
        <Image
          src={selectedImageCover}
          alt={selectedImageName}
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

      {/* Gallery thumbnails */}
      {galleryImages.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryImages.map((image) => {
              const isActive = image === selectedImageCover;

              return (
                <button
                  key={image}
                  type="button"
                  onClick={() => onSelectImage(image)}
                  aria-pressed={isActive}
                  aria-label="View product image"
                  className={cn(
                    "relative h-24 w-20 overflow-hidden border-2 rounded transition-all",
                    isActive
                      ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                      : "border-gray-300 hover:border-gray-600",
                  )}
                >
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
          <ProductDetailsInfo
            product={product}
            variantSelection={variantSelection}
            setSelectedImageCover={setSelectedImageCover}
            setSelectedImageName={setSelectedImageName}
          />
          <ProductDetailsPurchase product={product} variantSelection={variantSelection} />
        </div>
      </div>
    </div>
  );
}
