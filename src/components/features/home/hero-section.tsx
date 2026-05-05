import { Teko } from "next/font/google";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { HeroImageMotion } from "@/components/features/home/hero-image-motion";

// Fonts
const teko = Teko({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function HeroSection() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative h-[460px] w-full overflow-hidden sm:h-[540px] md:h-[700px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {/* Behind image style */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1
              className="select-none text-[72px] font-black text-gray-300/30 uppercase sm:text-[96px] md:text-[140px]"
              aria-hidden="true"
            >
              {t("shop-now")}
            </h1>
          </div>

          {/* Hero Image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <HeroImageMotion />
          </div>

          {/* Text Overlays */}
          <div className="absolute left-4 top-10 z-20 sm:left-8 sm:top-14 md:left-20 md:top-20">
            <p
              className={cn(
                locale === "en" && teko.className,
                "text-xl font-bold text-primary-900 uppercase sm:text-2xl md:text-3xl",
              )}
            >
              {t("adjustable")}
            </p>
          </div>
          <div className="absolute bottom-10 right-4 z-20 sm:bottom-14 sm:right-8 md:bottom-20 md:right-20">
            <p
              className={cn(
                locale === "en" && teko.className,
                "text-xl font-bold text-primary-900 uppercase sm:text-2xl md:text-3xl",
              )}
            >
              {t("elegant")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
