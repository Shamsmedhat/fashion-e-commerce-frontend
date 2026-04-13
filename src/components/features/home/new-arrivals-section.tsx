import React, { Suspense } from "react";
import { Teko, Almarai } from "next/font/google";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";

import { NewArrivalsMotion } from "@/components/features/home/new-arrivals-motion";
import ProductSection from "@/components/features/home/product-section";
import { ProductGridSkeleton } from "@/components/skeletons/products/product-item.skeleton";

// Fonts
// (en)
const teko = Teko({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

// (ar)
const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
});

export default function NewArrivalsSection() {
  // Translations
  const t = useTranslations();

  return (
    <NewArrivalsMotion
      title={t("new-arrivals")}
      titleClassName={cn(
        teko.className,
        almarai.className,
        "flex my-10 gap-2 justify-center tracking-wide text-5xl uppercase",
      )}
      ctaLabel={t("shop-now")}
    >
      <Suspense
        fallback={
          <div role="status" aria-live="polite" aria-label="Loading new arrivals">
            <ProductGridSkeleton />
          </div>
        }
      >
        <ProductSection />
      </Suspense>
    </NewArrivalsMotion>
  );
}
