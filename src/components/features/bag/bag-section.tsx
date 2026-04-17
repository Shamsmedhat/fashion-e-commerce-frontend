import { getServerSession } from "next-auth";
import BagItemsList from "./bag-items-list";
import OrderSummary from "./order-summary";
import { authOptions } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus, PlusCircle } from "lucide-react";
import { ORDER_SUMMARY_NEXT_DAY_SHIPPING_EGP } from "@/lib/constants/currency.constant";
import BagListSkeleton from "@/components/skeletons/bag/bag-list.skeleton";
import BagSummary from "@/components/skeletons/bag/bag-summary.skeleton";
import { getFormatCurrency } from "@/lib/utils/format-currency";

export default async function BagSection() {
  // Translations
  const t = await getTranslations();
  const locale = await getLocale();

  // Hooks
  const { formatCurrency } = await getFormatCurrency();

  // Session
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect({
      href: {
        pathname: "/auth/login",
        query: {
          callbackUrl: "/bag",
        },
      },
      locale,
    });
  }

  // TODO: Handle error page

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
        {/* Left Column - Your Selections */}
        <div className="space-y-6">
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 underline">
              {t("your-selections")}
            </h2>
            <Suspense fallback={<BagListSkeleton />}>
              <BagItemsList />
            </Suspense>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 underline">
                {t("order-summary")}
              </h2>
            </div>
            <Suspense fallback={<BagSummary />}>
              <OrderSummary />
            </Suspense>

            {/* Payment Timing Information */}
            <p className="text-xs text-gray-600 leading-relaxed capitalize">
              {t("payment-timing-info")}
            </p>

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
                      <Plus className="w-3 h-3 absolute plus-icon" aria-hidden="true" />
                      <Minus className="w-3 h-3 absolute minus-icon" aria-hidden="true" />
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
                      <PlusCircle className="w-3 h-3 absolute plus-icon" aria-hidden="true" />
                      <Minus className="w-3 h-3 absolute minus-icon" aria-hidden="true" />
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
                      <Plus className="w-3 h-3 absolute plus-icon" aria-hidden="true" />
                      <Minus className="w-3 h-3 absolute minus-icon" aria-hidden="true" />
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
                      <span className="font-medium">
                        {formatCurrency(ORDER_SUMMARY_NEXT_DAY_SHIPPING_EGP)}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
