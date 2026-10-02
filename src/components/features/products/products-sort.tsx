"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ListFilter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import type { SortOption } from "@/lib/utils/product-listing";

// Value -> translation key of its label
const sortOptions: { value: SortOption; labelKey: string }[] = [
  { value: "", labelKey: "sort-none" },
  { value: "discount", labelKey: "sort-discount" },
  { value: "price-low-to-high", labelKey: "sort-price-low-to-high" },
  { value: "price-high-to-low", labelKey: "sort-price-high-to-low" },
];

export default function ProductsSort() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for temporary sort
  const [tempSort, setTempSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "",
  );
  const [isOpen, setIsOpen] = useState(false);

  // Reset temp sort when sheet opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSort((searchParams.get("sort") as SortOption) || "");
    }
  };

  const handleSortChange = (sortValue: SortOption) => {
    setTempSort(sortValue);
  };

  // A new order changes what is on each page, so the listing goes back to the first one.
  const navigateWith = (sortValue: SortOption) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sortValue) newParams.set("sort", sortValue);
    else newParams.delete("sort");
    newParams.delete("page");

    const query = newParams.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const clearSort = () => {
    setTempSort("");
    // Apply cleared sort immediately
    navigateWith("");
  };

  const applySort = () => {
    navigateWith(tempSort);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="link" type="button">
          <ListFilter aria-hidden="true" />
          <span>{t("sort")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[35rem]">
        <SheetHeader>
          <SheetTitle>{t("sort-products")}</SheetTitle>
          <SheetDescription>{t("choose-how-to-sort-the-products")}</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("sort-by")}</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={tempSort === option.value ? "default" : "outline"}
                  className="w-full justify-start"
                  type="button"
                  aria-pressed={tempSort === option.value}
                  onClick={() => handleSortChange(option.value)}
                >
                  {t(option.labelKey)}
                </Button>
              ))}
            </div>
            <Button variant="outline" onClick={clearSort} className="mt-4 w-full" type="button">
              {t("clear-sort")}
            </Button>
          </div>
        </div>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </SheetClose>
          <Button onClick={applySort} type="button">
            {t("apply-sort")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
