"use client";

import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "use-intl";

import {
  Carousel,
  CarouselNextBestSelling,
  CarouselPreviousBestSelling,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/tailwind-merge";

// Font (Latin; weights used by heading + carousel controls)
const montserrat = Montserrat({
  weight: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function BestSellingUi({ children }: { children: ReactNode }) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";

  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="py-8 sm:py-10 md:py-12"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container">
        {/* Product Grid */}
        <Carousel opts={{ align: "start", direction: isAr ? "rtl" : "ltr" }}>
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex w-full justify-between items-center gap-2 px-4">
              {/* Outlined words: stroke + opaque fill + paint-order hides overlapping-contour artifacts (see -webkit-text-stroke + variable fonts) */}
              <span
                className={cn(
                  montserrat.className,
                  "inline-flex flex-wrap items-baseline gap-x-1 uppercase",
                )}
              >
                {t.rich("best-selling-title", {
                  outlined: (chunks) => (
                    <span className="inline-block text-3xl font-extrabold leading-none tracking-tight text-background antialiased [-webkit-text-stroke:1px_hsl(var(--foreground))] [paint-order:stroke_fill] md:text-5xl">
                      {chunks}
                    </span>
                  ),
                  solid: (chunks) => (
                    <span className="inline-block text-3xl font-extrabold leading-none tracking-tight text-black antialiased md:text-5xl">
                      {chunks}
                    </span>
                  ),
                })}
              </span>

              <div className="relative flex">
                {/* Action buttons */}
                <CarouselPreviousBestSelling
                  className="flex flex-col items-start gap-2 text-black hover:text-gray-600 transition-colors rtl:left-16 rtl:right-auto"
                  aria-label="Previous"
                  font={montserrat}
                />
                <CarouselNextBestSelling
                  className="flex flex-col items-end gap-2 text-black hover:text-gray-600 transition-colors rtl:left-0 rtl:right-auto"
                  aria-label="Next"
                  font={montserrat}
                />
              </div>
            </div>
          </div>

          {/* Data */}
          {children}
        </Carousel>
      </div>
    </motion.section>
  );
}
