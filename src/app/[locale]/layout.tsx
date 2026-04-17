import HeaderWrapper from "@/components/layout/header/components/header-wrapper";
import { Footer } from "@/components/layout/footer";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils/tailwind-merge";
import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Montserrat, Almarai } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HeaderFallback } from "@/components/layout/header/components/header-fallback";

export async function generateMetadata(): Promise<Metadata> {
  // Translation
  const t = await getTranslations();

  // Variables
  const title = t("application-title");

  return {
    title,
  };
}

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn(locale === "ar" ? almarai.className : montserrat.className)}>
        <Providers>
          {/* Header */}
          <Suspense fallback={<HeaderFallback />}>
            <HeaderWrapper />
          </Suspense>

          {/* Toast */}
          <Toaster position="top-center" richColors />

          {/* Main */}
          {children}

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
