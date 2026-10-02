"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
  // Translation
  const t = useTranslations();

  // Navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // A single page needs no controls
  if (totalPages <= 1) return null;

  // Functions — keeps the active filters and sort, and drops `page` for the first page
  function hrefFor(target: number): string {
    const params = new URLSearchParams(searchParams.toString());

    if (target === 1) params.delete("page");
    else params.set("page", String(target));

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }

  const stepClassName = cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1 capitalize");

  return (
    <nav
      aria-label={t("pagination-label")}
      className="flex flex-wrap items-center justify-center gap-2 px-4 pb-10"
    >
      {/* Previous */}
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={stepClassName}>
          <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t("prev")}
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(stepClassName, "pointer-events-none opacity-50")}>
          <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t("prev")}
        </span>
      )}

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((target) => (
        <Link
          key={target}
          href={hrefFor(target)}
          aria-label={t("pagination-page", { page: target, total: totalPages })}
          aria-current={target === page ? "page" : undefined}
          className={buttonVariants({
            variant: target === page ? "default" : "outline",
            size: "sm",
          })}
        >
          {target}
        </Link>
      ))}

      {/* Next */}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={stepClassName}>
          {t("next")}
          <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(stepClassName, "pointer-events-none opacity-50")}>
          {t("next")}
          <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
