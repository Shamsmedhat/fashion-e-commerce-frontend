import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";

import { authOptions } from "@/auth";
import { CheckoutSection } from "@/components/features/checkout/checkout-section";
import { redirect } from "@/i18n/navigation";
import { getBagItemsService } from "@/lib/services/bag.service";
import { getMeService } from "@/lib/services/user.service";
import { AppError } from "@/lib/utils/app-errors";
import { getFormatCurrency } from "@/lib/utils/format-currency";

export default async function CheckoutPage() {
  // Translation
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
          callbackUrl: "/checkout",
        },
      },
      locale,
    });
  }

  // Variables
  let totalItems = 0;
  let totalAmount = 0;
  let address: Address | undefined;

  // Fetch — the bag and the saved addresses both come from the API: the session only knows
  // the profile as it was at login, so an address added since would be missing from it.
  try {
    const [bagData, me] = await Promise.all([getBagItemsService(), getMeService()]);
    const { addresses } = me.data.user;

    totalItems = bagData.data.totalItems;
    totalAmount = Number(bagData.data.totalAmount);
    address = addresses.find((entry) => entry.isDefault) ?? addresses[0];
  } catch (error: unknown) {
    if (error instanceof AppError && error.isAuthentication) {
      redirect({
        href: {
          pathname: "/auth/login",
          query: {
            callbackUrl: "/checkout",
          },
        },
        locale,
      });
    }

    throw error;
  }

  return (
    <main className="min-h-screen bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-[0.2em]">
            {t("checkout")}
          </h1>
          <p className="mt-3 text-sm text-gray-600">{t("checkout-hero-description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] gap-6 lg:gap-10">
          <aside className="border border-gray-200 p-6 md:p-8 h-fit space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 underline">
              {t("order-summary")}
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span>{t("items")}</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t("estimated-total")}</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </aside>

          <CheckoutSection
            hasItems={totalItems > 0}
            address={address}
            totalItems={totalItems}
            formattedTotal={formatCurrency(totalAmount)}
          />
        </div>
      </div>
    </main>
  );
}
