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
import { usePathname, useRouter } from "@/i18n/routing";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type SortOption = "discount" | "price-low-to-high" | "price-high-to-low" | "";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "", label: "None" },
  { value: "discount", label: "Highest Discount" },
  { value: "price-low-to-high", label: "Price: Low to High" },
  { value: "price-high-to-low", label: "Price: High to Low" },
];

export default function ProductsSort() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for temporary sort
  const [tempSort, setTempSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || ""
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

  const clearSort = () => {
    setTempSort("");
    // Apply cleared sort immediately
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("sort");
    router.push(pathname + "?" + newParams.toString());
  };

  const applySort = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (tempSort) {
      newParams.set("sort", tempSort);
    } else {
      newParams.delete("sort");
    }
    router.push(pathname + "?" + newParams.toString());
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="link">
          <ListFilter />
          <span>sort</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[35rem]">
        <SheetHeader>
          <SheetTitle>Sort Products</SheetTitle>
          <SheetDescription>Choose how to sort the products.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={tempSort === option.value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={clearSort}
              className="mt-4 w-full"
            >
              Clear Sort
            </Button>
          </div>
        </div>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={applySort}>Apply Sort</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
