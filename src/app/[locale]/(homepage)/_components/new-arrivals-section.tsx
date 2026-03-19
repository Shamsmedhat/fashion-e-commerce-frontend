import React, { Suspense } from "react";
import { Teko, Almarai } from "next/font/google";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";

import ProductSection from "@/components/features/home/product-section";
import { ProductGridSkeleton } from "@/components/skeletons/product/product-item.skeleton";

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
    <section className="container py-12">
      {/* Action Buttons */}
      <h2
        className={cn(
          teko.className,
          almarai.className,
          "flex my-10 gap-2 justify-center tracking-wide text-5xl uppercase"
        )}
      >
        {t("new-arrivals")}
      </h2>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductSection />
      </Suspense>
    </section>
  );
}
