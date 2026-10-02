"use client";

import { useMemo, useState } from "react";

export type ProductVariantSelectionState = {
  availableSizes: string[];
  selectedSize: string | null;
  selectedColor: string | null;
  setSelectedSize: (size: string | null) => void;
  onColorChange: (newColor: string) => void;
  selectedVariant: ProductVariant | undefined;
  availableSizesForColor: string[];
  displayPrice: number;
  originalPrice: number | null;
  colorVariants: ProductVariant[];
  isInStock: boolean;
  styleNumber: string;
};

export function useProductVariantSelection(product: Product): ProductVariantSelectionState {
  // Variables
  const availableSizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean) || []),
  );
  const availableColors = Array.from(
    new Set(
      product.variants?.map((v) => v.color?.toLowerCase()).filter((c): c is string => !!c) || [],
    ),
  );

  // State
  const [selectedSize, setSelectedSize] = useState<string | null>(availableSizes[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(availableColors[0] || null);

  // Functions
  function onColorChange(newColor: string): void {
    setSelectedColor(newColor);

    const sizesForNewColor = Array.from(
      new Set(
        product.variants
          ?.filter((v) => v.color?.toLowerCase() === newColor.toLowerCase())
          .map((v) => v.size)
          .filter(Boolean) || [],
      ),
    );

    if (selectedSize && !sizesForNewColor.includes(selectedSize)) {
      setSelectedSize(sizesForNewColor[0] || null);
    }
  }

  // Queries
  const selectedVariant = useMemo(() => {
    return product.variants?.find(
      (v) => v.size === selectedSize && v.color?.toLowerCase() === selectedColor?.toLowerCase(),
    );
  }, [product.variants, selectedSize, selectedColor]);

  const availableSizesForColor = useMemo(() => {
    if (!selectedColor) return availableSizes;
    return Array.from(
      new Set(
        product.variants
          ?.filter((v) => v.color?.toLowerCase() === selectedColor.toLowerCase())
          .map((v) => v.size)
          .filter(Boolean) || [],
      ),
    );
  }, [selectedColor, product.variants, availableSizes]);

  const displayPrice = selectedVariant
    ? selectedVariant.priceDiscount || selectedVariant.price
    : product.variants?.[0]?.priceDiscount || product.variants?.[0]?.price || 0;

  const originalPrice = selectedVariant?.priceDiscount ? selectedVariant.price : null;

  const colorVariants = useMemo(() => {
    const variantsByColor = new Map<string, ProductVariant>();
    product.variants?.forEach((v) => {
      if (v.color) {
        const colorKey = v.color.toLowerCase();
        if (!variantsByColor.has(colorKey)) {
          variantsByColor.set(colorKey, v);
        }
      }
    });
    return Array.from(variantsByColor.values());
  }, [product.variants]);

  const isInStock = Boolean(selectedVariant && selectedVariant.stock > 0);

  const styleNumber = selectedVariant?.sku || product.variants?.[0]?.sku || "";

  return {
    availableSizes,
    selectedSize,
    selectedColor,
    setSelectedSize,
    onColorChange,
    selectedVariant,
    availableSizesForColor,
    displayPrice,
    originalPrice,
    colorVariants,
    isInStock,
    styleNumber,
  };
}
