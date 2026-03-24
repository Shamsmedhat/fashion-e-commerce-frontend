"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUpdateBagItem, useRemoveBagItem, useProductVariants } from "@/hooks/bag/use-bag";
import { ChevronDown } from "lucide-react";
import EditBagItemDialog from "./edit-bag-item-dialog";
import { useTranslations } from "next-intl";

// Type
type BagItemProps = {
  item: BagItem;
};

export default function BagItem({ item }: BagItemProps) {
  // Translations
  const t = useTranslations();

  // State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Hooks
  const { mutate: updateBagItem, isPending: isPendingUpdate } = useUpdateBagItem();
  const { mutate: removeBagItem, isPending: isPendingDelete } = useRemoveBagItem();
  const { data: productData, isLoading: isLoadingProduct } = useProductVariants({
    productId: item.productId,
    // Only fetch when dialog is open
    enabled: isEditDialogOpen,
  });

  // Generate quantity options (1-10 or up to stock)
  const maxQuantity = item.variant?.stock || item.quantity;
  const quantityOptions = Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1);

  // Functions
  function handleQuantityChange(newQuantity: number) {
    updateBagItem({
      itemId: item._id,
      data: { quantity: newQuantity },
    });
  }

  function handleRemove() {
    removeBagItem(item._id);
  }

  // Variables
  // Get product image
  const productImage = item.product?.coverImage || "/assets/images/placeholder.avif";

  // Get current price (use currentPrice if available, otherwise priceAtPurchase)
  const currentPrice = item.currentPrice ?? item.priceAtPurchase;
  const itemTotal = currentPrice * item.quantity;

  // Style number (variant SKU)
  const styleNumber = item.variantSku;

  // Variation (color)
  const itemColor = item.variant?.color
    ? item.variant.color
    : item.product?.variants?.[0]?.color || "";

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200">
      {/* Product image */}
      <div className="relative w-full sm:w-32 h-32 bg-gray-50 flex-shrink-0">
        <Link href={`/products/${item.productId}`}>
          <Image
            src={productImage}
            alt={item.productName}
            fill
            className="object-contain"
            sizes="128px"
          />
        </Link>
      </div>

      {/* Product details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product name */}
          <Link
            href={`/products/${item.productId}`}
            className="font-semibold text-gray-900 hover:underline mb-1 block"
          >
            {item.productName}
          </Link>

          {/* Style number */}
          {styleNumber && (
            <p className="text-sm text-gray-600 mb-1 capitalize">
              {t("style")}# {styleNumber.replace(/-/g, " ")}
            </p>
          )}

          {/* Item color */}
          {itemColor && (
            <p className="text-sm text-gray-600 mb-2 capitalize">
              {t("color")}: {itemColor}
            </p>
          )}

          {/* Availability */}
          <div className="mb-2">
            <p className="text-sm font-semibold text-green-600 mb-1 uppercase">
              {item.isAvailable !== false ? t("available") : t("out-of-stock")}
            </p>
            <p className="text-sm text-gray-600">{t("user-msg")}</p>
          </div>

          {/* Price and Quantity Row */}
          <div className="flex items-center justify-between gap-4 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 uppercase">{t("qty")}:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-16 justify-between text-sm"
                    disabled={isPendingUpdate || isPendingDelete}
                  >
                    {item.quantity}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {quantityOptions.map((qty) => (
                    <DropdownMenuItem
                      key={qty}
                      onClick={() => handleQuantityChange(qty)}
                      className={qty === item.quantity ? "bg-gray-100" : ""}
                    >
                      {qty}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="font-semibold text-gray-900">${itemTotal.toFixed(0)}</p>
              {item.quantity > 1 && (
                <p className="text-sm text-gray-500">
                  ${currentPrice.toFixed(0)} {t("each")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-4 mt-4 text-sm ">
          <button
            type="button"
            onClick={() => setIsEditDialogOpen(true)}
            className="text-gray-600 hover:text-gray-900 bg-[linear-gradient(to_right,currentColor_0%,currentColor_100%)] bg-[length:0%_1px] bg-no-repeat bg-bottom hover:bg-[length:100%_1px] transition-[background-size] duration-300 uppercase"
          >
            {t("edit")}
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={isPendingDelete}
            className="text-gray-600 hover:text-gray-900 bg-[linear-gradient(to_right,currentColor_0%,currentColor_100%)] bg-[length:0%_1px] bg-no-repeat bg-bottom hover:bg-[length:100%_1px] transition-[background-size] duration-300 disabled:opacity-50 uppercase"
          >
            {t("remove")}
          </button>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditBagItemDialog
        item={item}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        productData={productData}
        isLoadingProduct={isLoadingProduct}
      />
    </div>
  );
}
