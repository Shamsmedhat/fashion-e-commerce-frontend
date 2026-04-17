import { Plus, Minus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ORDER_SUMMARY_ESTIMATED_TAX_EGP } from "@/lib/constants/currency.constant";
import { getTranslations } from "next-intl/server";
import { getBagItemsService } from "@/lib/services/bag.service";
import { getFormatCurrency } from "@/lib/utils/format-currency";

export default async function OrderSummary() {
  // Translations
  const t = await getTranslations();

  // Hooks
  const { formatCurrency } = await getFormatCurrency();

  // Fetch
  const bagData = await getBagItemsService();

  const { items, totalAmount } = bagData.data;

  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    const price = item.currentPrice ?? item.priceAtPurchase;
    return sum + price * item.quantity;
  }, 0);

  // Shipping is free (Premium Express)
  const shipping = 0;
  const shippingMethod = "Premium Express";

  // Estimated tax (placeholder — display line uses configured EGP estimate when non-zero UI is needed)
  const estimatedTax = ORDER_SUMMARY_ESTIMATED_TAX_EGP;

  const estimatedTotal = parseFloat(totalAmount);

  return (
    <>
      {/* Summary Breakdown */}
      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 capitalize">{t("subtotal")}</span>
          <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center capitalize">
          <span className="text-gray-600 ">
            {t("shipping")}: <span>{shippingMethod}</span>
          </span>
          <span className="text-gray-900 font-medium">
            {shipping === 0 ? t("free") : formatCurrency(Number(shipping))}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex justify-between items-center capitalize">
          <span className="text-gray-600">{t("estimated-tax")}</span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(ORDER_SUMMARY_ESTIMATED_TAX_EGP)}
          </span>
        </div>

        {/* Estimated Total */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-sm font-bold text-gray-900">{t("estimated-total")}</span>
          <span className="text-lg font-bold text-gray-900">{formatCurrency(estimatedTotal)}</span>
        </div>
      </div>

      {/* View Details Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details" className="border-0">
          <AccordionTrigger className="text-xs font-medium text-gray-900 py-2 hover:no-underline [&[data-state=open]>svg:first-child]:hidden [&[data-state=closed]>svg:last-child]:hidden">
            <div className="flex items-center gap-2 uppercase">
              <Plus className="w-3 h-3" aria-hidden="true" />
              <Minus className="w-3 h-3 hidden" aria-hidden="true" />
              {t("view-details")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-2 pt-2">
            <div className="space-y-1">
              <p>
                <span className="font-medium">{t("subtotal")}:</span> {formatCurrency(subtotal)}
              </p>
              <p>
                <span className="font-medium">{t("shipping")}:</span>
                {shipping === 0 ? t("free") : formatCurrency(Number(shipping))} ({shippingMethod})
              </p>
              <p>
                <span className="font-medium">{t("tax")}:</span> {formatCurrency(estimatedTax)} (
                {t("estimated")})
              </p>
              <p>
                <span className="font-medium">{t("total")}:</span> {formatCurrency(estimatedTotal)}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
