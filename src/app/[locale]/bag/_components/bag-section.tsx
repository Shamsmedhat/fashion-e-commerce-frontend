import { getServerSession } from "next-auth";
import BagItemsList from "./bag-items-list";
import OrderSummary from "./order-summary";
import { authOptions } from "@/auth";
import { redirect } from "@/i18n/routing";
import { getBagItemsService } from "@/lib/services/bag.service";
import { getLocale } from "next-intl/server";

export default async function BagSection() {
  // Translations
  const locale = await getLocale();

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
  const bagData = await getBagItemsService();

  const { items, totalAmount, bagId } = bagData.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
        {/* Left Column - Your Selections */}
        <div className="space-y-6">
          <BagItemsList items={items} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary items={items} bagId={bagId} totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
}
