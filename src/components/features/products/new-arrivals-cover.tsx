"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils/tailwind-merge";

type NewArrivalsCoverProps = {
  className?: string;
};

export default function NewArrivalsCover({ className }: NewArrivalsCoverProps): JSX.Element {
  // Translations
  const t = useTranslations();

  return (
    <>
      <div className="relative w-full h-[40vh] min-h-[300px] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 bg-transparent/65">
          <div className="absolute inset-0 opacity-70">
            <Image
              src="/assets/images/new-arrival.png"
              alt={t("new-arrivals-cover-alt")}
              fill
              className={cn("object-cover", className)}
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 px-6 py-8 md:px-12">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-balance capitalize">
          {t("new-arrivals-title")}
        </h1>
        <p className="mt-2 text-gray-600 italic">{t("category-subtitle")}</p>
      </div>
    </>
  );
}
