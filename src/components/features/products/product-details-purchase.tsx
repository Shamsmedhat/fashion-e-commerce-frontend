"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ProductVariantSelectionState } from "@/hooks/features/products/use-product-variant-selection";
import { Phone, Plus, ShoppingBag, Truck } from "lucide-react";

import { displayProductRating } from "@/components/shared/product-rating";
import AddToBagButton from "../bag/add-to-bag-button";
import { useFormatter, useTranslations } from "next-intl";
import { serviceHighlights } from "@/lib/constants/services.constant";

export type ProductDetailsPurchaseProps = {
  product: Product;
  variantSelection: ProductVariantSelectionState;
};

function DeliveryEstimate() {
  const t = useTranslations();
  const format = useFormatter();

  const today = new Date();

  const firstDate = new Date(today);
  firstDate.setDate(today.getDate() + 1);

  const secondDate = new Date(today);
  secondDate.setDate(today.getDate() + 2);

  return (
    <p className="text-xs mt-1" suppressHydrationWarning>
      {format.dateTime(firstDate, "deliveryEstimate")} -{" "}
      {format.dateTime(secondDate, "deliveryEstimate")} ({t("estimated")})
    </p>
  );
}

export function ProductDetailsPurchase({ product, variantSelection }: ProductDetailsPurchaseProps) {
  // Translation
  const t = useTranslations();

  // Variables
  const { selectedVariant, isInStock, selectedSize, selectedColor } = variantSelection;

  return (
    <div className="space-y-6">
      {/* Add to bag */}
      {selectedVariant && isInStock ? (
        <AddToBagButton
          productId={product._id}
          productName={product.name}
          variantSku={selectedVariant.sku}
          size="lg"
          variant="default"
          className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide"
        >
          {t("add-to-bag")}
        </AddToBagButton>
      ) : (
        <Button
          disabled={true}
          size="lg"
          className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" aria-hidden="true" />
          {!selectedSize || !selectedColor ? t("select-size-color") : t("out-of-stock")}
        </Button>
      )}

      {/* Stock */}
      {selectedVariant && (
        <div className="text-sm">
          {isInStock ? (
            <span className="text-green-600 font-medium">
              {t("in-stock")} ({selectedVariant.stock} {t("available")})
            </span>
          ) : (
            <span className="text-red-600 font-medium">{t("out-of-stock")}</span>
          )}
        </div>
      )}

      {/* Delivery & contact */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <Truck className="w-4 h-4 mt-0.5 text-gray-900" aria-hidden="true" />
          <div>
            <p className="font-medium text-gray-900">{t("estimated-delivery")}</p>
            <p>{t("complimentary-express-delivery-or-collect-in-store")}</p>
            {/* Delivery estimate: today +1 to +2 days */}
            <DeliveryEstimate />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <a
            href="tel:+201111803604"
            className="flex items-center gap-2 text-sm underline hover:text-gray-900 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {t("order-by-phone")}
          </a>
        </div>
      </div>

      {/* Services */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="services" className="border-0">
          <AccordionTrigger className="text-sm font-medium text-gray-900 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" aria-hidden="true" />
              {t("services")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-1 pt-2">
            <ul className="space-y-1">
              {serviceHighlights(t).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Rating */}
      {product.ratingsAverage !== undefined && (
        <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
          <div className="flex items-center">{displayProductRating(product.ratingsAverage)}</div>
          <span className="text-xs text-gray-600">
            {t("reviews-count", { count: product.reviewCount || 0 })}
          </span>
        </div>
      )}
    </div>
  );
}
