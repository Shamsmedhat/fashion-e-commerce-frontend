"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ProductVariantSelectionState } from "@/hooks/features/products/use-product-variant-selection";
import { cn } from "@/lib/utils/tailwind-merge";
import { useFormatCurrency } from "@/lib/utils/format-currency";

export type ProductDetailsInfoProps = {
  product: Product;
  variantSelection: ProductVariantSelectionState;
  setSelectedImageCover: (image: string) => void;
  setSelectedImageName: (name: string) => void;
};

export function ProductDetailsInfo({
  product,
  variantSelection,
  setSelectedImageCover,
  setSelectedImageName,
}: ProductDetailsInfoProps) {
  // Translation
  const t = useTranslations();

  // Hooks
  const { formatCurrency } = useFormatCurrency();

  // Variables
  const {
    displayPrice,
    originalPrice,
    colorVariants,
    selectedColor,
    selectedSize,
    setSelectedSize,
    onColorChange,
    availableSizes,
    availableSizesForColor,
    styleNumber,
    selectedVariant,
  } = variantSelection;

  // Functions
  function onImageChange(image: string): void {
    setSelectedImageCover(image);
    setSelectedImageName(product.name);
  }

  return (
    <div className="space-y-6">
      {/* Title & price */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl lg:text-4xl font-bold text-gray-900">
          {formatCurrency(displayPrice)}
        </span>
        {originalPrice && (
          <span className="text-xl text-gray-500 line-through">
            {formatCurrency(originalPrice)}
          </span>
        )}
      </div>

      {/* Color variation */}
      {colorVariants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-900">{t("variation")}</label>
            {selectedColor && (
              <span className="text-sm text-gray-600 capitalize">{selectedColor}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {colorVariants.map((variant, i) => {
              const colorName = variant.color?.toLowerCase() || "";
              const isSelected = colorName === selectedColor?.toLowerCase();
              const variantImage = variant.images[i];

              return (
                <button
                  key={variant._id}
                  type="button"
                  onClick={() => {
                    onColorChange(colorName);
                    onImageChange(variantImage);
                  }}
                  className={cn(
                    "relative w-16 h-16 border-2 rounded transition-all overflow-hidden",
                    isSelected
                      ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                      : "border-gray-300 hover:border-gray-600",
                  )}
                  title={variant.color || "Color variation"}
                  aria-label={`Select ${variant.color || "color"} variation`}
                  aria-pressed={isSelected}
                >
                  {variantImage ? (
                    <Image
                      src={variantImage}
                      alt={variant.color || "Product variant"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <span
                      style={{ backgroundColor: variant.color }}
                      className="w-24 h-24 rounded-none border-2 transition-all block"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size */}
      {availableSizes.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">{t("size")}</label>
          <div className="flex flex-wrap gap-2">
            {availableSizesForColor.map((size) => {
              const sizeVariant = product.variants?.find(
                (v) => v.size === size && v.color?.toLowerCase() === selectedColor?.toLowerCase(),
              );
              const isAvailable = sizeVariant && sizeVariant.stock > 0;
              const isSelected = size === selectedSize;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-4 py-2 text-sm font-medium border-2 rounded transition-all min-w-[60px]",
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : isAvailable
                        ? "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
                        : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="pt-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
          {t("product-description")}
        </h2>
        {styleNumber && (
          <p className="text-sm text-gray-600">
            {t("style")} {styleNumber.split("-").join(" ")}
          </p>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">
          {product.description || t("no-description-available")}
        </p>
      </div>

      {/* Accordions */}
      <Accordion type="multiple" className="w-full border-t border-gray-200">
        <AccordionItem value="product-details" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
            {t("product-details")}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 pb-4">
            <div className="space-y-2">
              {selectedVariant && (
                <>
                  <p>
                    <span className="font-medium">{t("sku")}</span> {selectedVariant.sku}
                  </p>
                  <p>
                    <span className="font-medium">{t("stock")}</span> {selectedVariant.stock}{" "}
                    {t("available")}
                  </p>
                  <p>
                    <span className="font-medium">{t("sold")}</span> {selectedVariant.soldCount}{" "}
                    {t("units")}
                  </p>
                </>
              )}
              {product.ratingsAverage !== undefined && (
                <p>
                  <span className="font-medium">{t("rating")}</span>{" "}
                  {product.ratingsAverage.toFixed(1)} / 5.0 ({product.reviewCount || 0}{" "}
                  {t("reviews")})
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials-care" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
            {t("materials-and-care")}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 pb-4">
            <p>
              {t(
                "please-refer-to-the-product-care-label-for-specific-care-instructions-for-best-results-follow-the-recommended-care-guidelines-to-maintain-the-quality-and-appearance-of-your-item",
              )}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="commitment" className="border-b border-gray-200">
          <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
            {t("our-commitment")}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-gray-600 pb-4">
            <p>
              {t(
                "we-are-committed-to-providing-high-quality-products-and-exceptional-customer-service-your-satisfaction-is-our-priority-and-we-stand-behind-the-quality-of-every-item-we-offer",
              )}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
