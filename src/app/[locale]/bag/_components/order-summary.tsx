import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

type OrderSummaryProps = {
  items: BagItem[];
  bagId?: string;
  totalAmount: string;
};

export default function OrderSummary({ items, totalAmount }: OrderSummaryProps) {
  // Translations
  const t = useTranslations();

  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    const price = item.currentPrice ?? item.priceAtPurchase;
    return sum + price * item.quantity;
  }, 0);

  // Shipping is free (Premium Express)
  const shipping = 0;
  const shippingMethod = "Premium Express";

  // Estimated tax (placeholder)
  const estimatedTax = 0;

  const estimatedTotal = parseFloat(totalAmount);

  return (
    <div className="bg-white p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 underline">
          {t("order-summary")}
        </h2>
      </div>

      {/* Summary Breakdown */}
      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 capitalize">{t("subtotal")}</span>
          <span className="text-gray-900 font-medium">${subtotal.toFixed(0)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center capitalize">
          <span className="text-gray-600 ">
            {t("shipping")}: <span>{shippingMethod}</span>
          </span>
          <span className="text-gray-900 font-medium">
            {shipping === 0 ? t("free") : `$${Number(shipping).toFixed(0)}`}
          </span>
        </div>

        {/* Estimated Tax */}
        <div className="flex justify-between items-center capitalize">
          <span className="text-gray-600">{t("estimated-tax")}</span>
          <span className="text-gray-900 font-medium">$ 25</span>
        </div>

        {/* Estimated Total */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-sm font-bold text-gray-900">{t("estimated-total")}</span>
          <span className="text-lg font-bold text-gray-900">${estimatedTotal.toFixed(0)}</span>
        </div>
      </div>

      {/* View Details Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details" className="border-0">
          <AccordionTrigger className="text-xs font-medium text-gray-900 py-2 hover:no-underline [&[data-state=open]>svg:first-child]:hidden [&[data-state=closed]>svg:last-child]:hidden">
            <div className="flex items-center gap-2 uppercase">
              <Plus className="w-3 h-3" />
              <Minus className="w-3 h-3 hidden" />
              {t("view-details")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-2 pt-2">
            <div className="space-y-1">
              <p>
                <span className="font-medium">{t("subtotal")}:</span> ${subtotal.toFixed(0)}
              </p>
              <p>
                <span className="font-medium">{t("shipping")}:</span>
                {shipping === 0 ? t("free") : `$${Number(shipping).toFixed(0)}`} ({shippingMethod})
              </p>
              <p>
                <span className="font-medium">{t("tax")}:</span> ${estimatedTax.toFixed(0)} (
                {t("estimated")})
              </p>
              <p>
                <span className="font-medium">{t("total")}:</span> ${estimatedTotal.toFixed(0)}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Payment Timing Information */}
      <p className="text-xs text-gray-600 leading-relaxed capitalize">{t("payment-timing-info")}</p>

      {/* Checkout Button */}
      <Button className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide">
        {t("checkout")}
      </Button>

      {/* May We Help Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="help" className="border-0 border-t border-gray-200">
          <AccordionTrigger className="text-xs font-medium text-gray-900 py-3 hover:no-underline [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
            <div className="flex items-center gap-2 uppercase">
              <div className="relative w-3 h-3">
                <Plus className="w-3 h-3 absolute plus-icon" />
                <Minus className="w-3 h-3 absolute minus-icon" />
              </div>
              {t("may-we-help")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-2 pt-2">
            <p>{t("customer-service")}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Accepted Payment Methods Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="payment" className="border-0 border-t border-gray-200">
          <AccordionTrigger className="text-xs font-medium text-gray-900 py-3 hover:no-underline [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
            <div className="flex items-center gap-2 uppercase">
              <div className="relative w-3 h-3">
                <Plus className="w-3 h-3 absolute plus-icon" />
                <Minus className="w-3 h-3 absolute minus-icon" />
              </div>
              {t("accepted-payment-methods")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-2 pt-2">
            <div className="flex flex-wrap gap-2">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>American Express</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>Amazon Pay</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Shipping Options Accordion (Expanded by default) */}
      <Accordion type="single" collapsible defaultValue="shipping" className="w-full">
        <AccordionItem value="shipping" className="border-0 border-t border-gray-200">
          <AccordionTrigger className="text-xs font-medium text-gray-900 py-3 hover:no-underline [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
            <div className="flex items-center gap-2 uppercase">
              <div className="relative w-3 h-3">
                <Plus className="w-3 h-3 absolute plus-icon" />
                <Minus className="w-3 h-3 absolute minus-icon" />
              </div>
              {t("shipping-options")}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-600 space-y-2 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{t("collect-in-store")}</span>
                <span className="font-medium">{t("free")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t("next-business-day")}</span>
                <span className="font-medium">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t("premium-express")}</span>
                <span className="font-medium">{t("free")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{t("next-business-day")}</span>
                <span className="font-medium">$ 25</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
