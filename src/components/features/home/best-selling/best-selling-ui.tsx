"use client";

import {
  Carousel,
  CarouselNextBestSelling,
  CarouselPreviousBestSelling,
} from "@/components/ui/carousel";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import { useLocale, useTranslations } from "use-intl";

// Font
const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["cyrillic"],
});

export default function BestSellingUi({ children }: { children: ReactNode }) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="py-12">
      <div className="container">
        {/* Product Grid */}
        <Carousel opts={{ align: "start", direction: isAr ? "rtl" : "ltr" }}>
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              {t.rich("best-selling-title", {
                outlined: (chunks) => (
                  <span className="text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_black] [-webkit-text-fill-color:transparent]">
                    {chunks}
                  </span>
                ),
                solid: (chunks) => (
                  <span className="text-3xl md:text-4xl font-bold text-black">{chunks}</span>
                ),
              })}

              {/* Action buttons */}
              <CarouselNextBestSelling
                className="flex flex-col items-end gap-2 text-black hover:text-gray-600 transition-colors rtl:left-0 rtl:right-auto"
                aria-label="Next"
                font={montserrat}
              />
              <CarouselPreviousBestSelling
                className="flex flex-col items-start gap-2 text-black hover:text-gray-600 transition-colors rtl:left-16 rtl:right-auto"
                aria-label="Next"
                font={montserrat}
              />
            </div>
          </div>

          {/* Data */}
          {children}
        </Carousel>
      </div>
    </section>
  );
}
