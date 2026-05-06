import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function CheckoutCancelPage() {
  // Translation
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-white flex items-center py-12">
      <section className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 p-8 md:p-12 space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">{t("payment-status")}</p>

          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.18em] text-gray-900">
            {t("payment-cancel-title")}
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">{t("payment-cancel-description")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Button
              asChild
              className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide"
            >
              <Link href="/bag">{t("return-to-bag")}</Link>
            </Button>

            <Button
              disabled
              variant="outline"
              className="w-full rounded-none h-12 text-sm font-bold uppercase tracking-wide border-gray-300 opacity-70 cursor-not-allowed"
            >
              {t("my-orders-coming-soon")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
