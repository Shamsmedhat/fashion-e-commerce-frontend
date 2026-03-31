"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateBagItem } from "@/hooks/bag/use-bag";
import { useFormatCurrency } from "@/hooks/shared/use-format-currency";
import { getTailwindColor } from "@/lib/utils/get-tailwind-color";
import { cn } from "@/lib/utils/tailwind-merge";

type EditBagItemDialogProps = {
  item: BagItem;
  productData: { status: string; data: { variants: ProductVariant[] } };
  isLoadingProduct: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditBagItemDialog({
  item,
  productData,
  isLoadingProduct,
  open,
  onOpenChange,
}: EditBagItemDialogProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { formatCurrency } = useFormatCurrency();
  const { mutate: updateBagItem, isPending } = useUpdateBagItem();

  // Wrap variants in useMemo to maintain stable reference
  const variants: ProductVariant[] = useMemo(() => {
    return productData?.data.variants || item.product?.variants || [];
  }, [productData?.data.variants, item.product?.variants]);
  // Get current variant
  const currentVariant: ProductVariant | undefined = useMemo(() => {
    return item.variant || variants.find((v: ProductVariant) => v.sku === item.variantSku);
  }, [item.variant, item.variantSku, variants]);

  // State
  const [selectedVariantSku, setSelectedVariantSku] = useState<string>(item.variantSku);
  const [quantity, setQuantity] = useState(item.quantity);

  // Effects
  useEffect(() => {
    if (open) {
      setSelectedVariantSku(item.variantSku);
      setQuantity(item.quantity);
    }
  }, [open, item.variantSku, item.quantity]);

  // Now this useMemo only recalculates when dependencies actually change
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (!selectedVariantSku) return currentVariant;
    return variants.find((v: ProductVariant) => v.sku === selectedVariantSku) || currentVariant;
  }, [selectedVariantSku, variants, currentVariant]);

  // Variables
  const productImage =
    selectedVariant?.images?.[0] ||
    currentVariant?.images?.[0] ||
    item.product?.coverImage ||
    "/assets/images/product.png";

  const imageSrc =
    productImage.startsWith("/") ||
    productImage.startsWith("http") ||
    productImage.startsWith("https")
      ? productImage
      : `/assets/images/${productImage}`;

  const displayPrice = selectedVariant
    ? selectedVariant.priceDiscount || selectedVariant.price
    : (item.currentPrice ?? item.priceAtPurchase);

  // Generate quantity options (1-10 or up to stock)
  const maxQuantity = selectedVariant?.stock || item.variant?.stock || item.quantity;
  const quantityOptions = Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1);

  // Functions
  function handleSave() {
    if (!selectedVariantSku) return;

    updateBagItem(
      {
        itemId: item._id,
        data: {
          variantSku: selectedVariantSku,
          quantity: quantity,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  }

  function handleCancel() {
    // Reset to original values
    setSelectedVariantSku(item.variantSku);
    setQuantity(item.quantity);
    onOpenChange(false);
  }

  // Reset state when dialog closes
  function handleOpenChange(open: boolean) {
    if (!open) {
      // Reset to original values when closing
      setSelectedVariantSku(item.variantSku);
      setQuantity(item.quantity);
    }
    onOpenChange(open);
  }

  function displayVariantsMenu(): React.ReactNode {
    return variants.map((variant) => {
      const colorKey = variant.color?.toLowerCase() || "";
      const isSelected = variant.sku === selectedVariantSku;
      const isAvailable = variant.stock > 0;
      const displayText = `${t("color")}: ${variant.color || ""} - ${t("size")}: ${variant.size || ""}`;

      return (
        <DropdownMenuItem
          key={variant.sku}
          onClick={() => setSelectedVariantSku(variant.sku)}
          disabled={!isAvailable}
          className={cn(
            "flex items-center gap-2",
            isSelected && "bg-gray-100",
            !isAvailable && "opacity-50 cursor-not-allowed",
          )}
        >
          {variant.color && (
            <div
              className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
              style={{
                backgroundColor: getTailwindColor(colorKey) || variant.color,
              }}
            />
          )}
          <span className="text-sm capitalize flex-1">{displayText}</span>
          {!isAvailable && (
            <span className="text-xs text-gray-500 ml-2">({t("out-of-stock")})</span>
          )}
        </DropdownMenuItem>
      );
    });
  }

  const hasChanges = selectedVariantSku !== item.variantSku || quantity !== item.quantity;

  // Get display text for selected variant
  const selectedVariantDisplay = selectedVariant
    ? `${t("color")}: ${selectedVariant.color || ""} - ${t("size")}: ${selectedVariant.size || ""}`
    : t("select-variant");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">{t("your-order")}</p>
            <DialogTitle className="text-2xl font-normal first-letter:uppercase">
              {t("edit-your-selection")}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left Side - Product Image and Info */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-gray-50">
              <Image
                src={imageSrc}
                alt={item.productName}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">{item.productName}</h3>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(displayPrice)}</p>
            </div>
          </div>

          {/* Right Side - Variant Selection */}
          <div className="space-y-6">
            {/* Variant Selection (Color + Size) */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-900 mb-3 block">
                {t("color")}
              </p>

              {/* Drop menu */}
              <DropdownMenu>
                {/* Trigger */}
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 text-left font-normal"
                  >
                    <div className="flex items-center gap-2">
                      {selectedVariant?.color && (
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                          style={{
                            backgroundColor:
                              getTailwindColor(selectedVariant.color.toLowerCase()) ||
                              selectedVariant.color,
                          }}
                        />
                      )}
                      <span className="text-sm capitalize">{selectedVariantDisplay}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>

                {/* Menu */}
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto">
                  {isLoadingProduct ? (
                    <DropdownMenuItem disabled>
                      <span className="text-sm text-gray-500 capitalize" role="status" aria-live="polite">
                        {t("loading-color-size")}
                      </span>
                    </DropdownMenuItem>
                  ) : variants.length === 0 ? (
                    <DropdownMenuItem disabled>
                      <span className="text-sm text-gray-500 first-letter:uppercase">
                        {t("no-colors-sizes")}
                      </span>
                    </DropdownMenuItem>
                  ) : (
                    displayVariantsMenu()
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Quantity Selection */}
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-900 mb-3 block">
                {t("quantity")}
              </p>
              <DropdownMenu>
                {/* Trigger */}
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-12 text-left font-normal"
                  >
                    <span>{quantity}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>

                {/* Menu */}
                <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
                  {quantityOptions.map((qty) => (
                    <DropdownMenuItem
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={qty === quantity ? "bg-gray-100" : ""}
                    >
                      {qty}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t px-6 py-4 space-y-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || !selectedVariantSku || isPending}
            className="w-full bg-black text-white hover:bg-gray-900 h-12 text-sm font-bold uppercase tracking-wide"
          >
            {isPending ? t("saving") + "..." : t("save-changes")}
          </Button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full text-sm text-gray-600 hover:text-gray-900 underline uppercase"
          >
            {t("cancel")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
