"use client";

import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useCardCheckout, useCashCheckout } from "@/hooks/checkout/use-checkout";
import { Link } from "@/i18n/navigation";

type CheckoutSectionProps = {
  hasItems: boolean;
  hasAddress: boolean | undefined | 0;
  totalItems: number;
  formattedTotal: string;
};

export function CheckoutSection({
  hasItems,
  hasAddress,
  totalItems,
  formattedTotal,
}: CheckoutSectionProps) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { mutate: startCardCheckout, isPending: isCardCheckoutPending } = useCardCheckout();
  const {
    mutate: startCashCheckout,
    isPending: isCashCheckoutPending,
    data: cashOrderResponse,
  } = useCashCheckout();

  // Variables
  const isCheckoutBlocked = !hasItems || !hasAddress;
  const isActionPending = isCardCheckoutPending || isCashCheckoutPending;

  // Functions
  function handleCardCheckout(): void {
    const pathname = window.location.pathname.replace(/\/$/, "");

    startCardCheckout({
      successUrl: `${window.location.origin}${pathname}/success`,
      cancelUrl: `${window.location.origin}${pathname}/cancel`,
    });
  }

  function handleCashCheckout(): void {
    startCashCheckout();
  }

  if (cashOrderResponse) {
    return (
      <section className="border border-gray-200 p-6 md:p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.18em] text-gray-900">
          {t("order-confirmed")}
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">{t("cash-order-created-message")}</p>

        <div className="space-y-3">
          <Button
            disabled
            className="w-full rounded-none h-12 text-sm font-bold uppercase tracking-wide opacity-70 cursor-not-allowed"
          >
            {t("my-orders-coming-soon")}
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-none h-12 text-sm font-bold uppercase tracking-wide border-gray-300"
          >
            <Link href="/new">{t("continue-shopping")}</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="border border-gray-200 p-6 md:p-8 space-y-6">
      <header className="space-y-3 border-b border-gray-200 pb-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-600">{t("checkout")}</p>
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.18em] text-gray-900">
          {t("complete-your-order")}
        </h1>
      </header>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">{t("items")}</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">{t("estimated-total")}</span>
          <span className="font-bold text-gray-900">{formattedTotal}</span>
        </div>
      </div>

      {isCheckoutBlocked ? (
        <div className="border border-gray-300 bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            {!hasItems ? t("bag-empty-checkout-message") : t("missing-address-checkout-message")}
          </p>
        </div>
      ) : null}

      {!isCheckoutBlocked ? (
        <div className="border border-gray-200 bg-cyan-400 p-3 text-xs text-gray-700 leading-relaxed">
          {t("stripe-card-test-instructions")}
        </div>
      ) : null}

      <div className="space-y-3">
        <Button
          onClick={handleCardCheckout}
          disabled={isCheckoutBlocked || isActionPending}
          className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide"
        >
          {isCardCheckoutPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {t("redirecting-to-payment")}
            </span>
          ) : (
            t("pay-with-card")
          )}
        </Button>

        <Button
          onClick={handleCashCheckout}
          disabled={isCheckoutBlocked || isActionPending}
          variant="outline"
          className="w-full rounded-none h-12 text-sm font-bold uppercase tracking-wide border-gray-300"
        >
          {isCashCheckoutPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {t("placing-order")}
            </span>
          ) : (
            t("cash-on-delivery")
          )}
        </Button>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed">{t("checkout-payment-note")}</p>
    </section>
  );
}
