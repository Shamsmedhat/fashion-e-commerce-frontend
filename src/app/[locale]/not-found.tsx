import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

// Rendered inside the locale layout, so a missing page keeps the header, footer and language.
export default async function NotFound() {
  // Translation
  const t = await getTranslations();

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Headline */}
      <h1 className="text-8xl font-bold text-gray-900">404</h1>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-xl font-semibold text-gray-900">{t("not-found-title")}</p>
        <p className="text-gray-600">{t("not-found-description")}</p>
      </div>

      {/* Action */}
      <Link href="/" className={cn(buttonVariants({ variant: "default" }), "capitalize")}>
        {t("back-to-home")}
      </Link>
    </main>
  );
}
