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
import { getTailwindColor } from "@/lib/utils/get-tailwind-color";
import { cn } from "@/lib/utils/tailwind-merge";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function getParamArray(params: URLSearchParams, key: string) {
  return params.getAll(key).filter(Boolean);
}

function toggleParamValue(params: URLSearchParams, key: string, value: string) {
  const values = getParamArray(params, key);
  const exists = values.includes(value);

  // Remove all existing values for this key
  params.delete(key);

  if (exists) {
    // Add back all values except the one we're removing
    values.filter((v) => v !== value).forEach((v) => params.append(key, v));
  } else {
    // Add back all existing values plus the new one
    [...values, value].forEach((v) => params.append(key, v));
  }
}

export default function ProductsFilter({ products }: { products: Product[] }) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for temporary filters
  const [tempParams, setTempParams] = useState<URLSearchParams>(
    new URLSearchParams(searchParams.toString())
  );
  const [isOpen, setIsOpen] = useState(false);

  // Reset temp params when sheet opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempParams(new URLSearchParams(searchParams.toString()));
    }
  };

  const handleColorToggle = (color: string) => {
    const newParams = new URLSearchParams(tempParams.toString());
    toggleParamValue(newParams, "variants.color", color);
    setTempParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    setTempParams(newParams);
    // Apply cleared filters immediately
    router.push(pathname + "?" + newParams.toString());
  };

  const applyFilters = () => {
    router.push(pathname + "?" + tempParams.toString());
    setIsOpen(false);
  };

  const colors = products.flatMap((p) =>
    p.variants.map((v) => v.color.toLowerCase())
  );

  const productsColors = colors.reduce<Record<string, number>>((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const colorsList = [
    "black",
    "white",
    "blue",
    "grey",
    "brown",
    "pink",
    "beige",
    "red",
    "yellow",
    "green",
    "navy",
  ];

  const activeColors = getParamArray(tempParams, "variants.color");

  function getColorToUI() {
    return (
      <div className="grid grid-cols-3 gap-4">
        {colorsList.map((c) => {
          const count = productsColors[c] || 0;
          const isDisabled = count === 0;
          const cssColor = getTailwindColor(c) || c;
          const capitalizedColor = c.charAt(0).toUpperCase() + c.slice(1);
          const isActive = activeColors.includes(c);

          return (
            <div key={c} className="flex flex-col items-center">
              <Button
                title={`${capitalizedColor} (${count})`}
                style={{ backgroundColor: cssColor }}
                className={cn(
                  "w-24 h-24 rounded-none border-2 transition-all",
                  isDisabled && "border-gray-300 opacity-40 cursor-not-allowed",
                  !isDisabled && "border-gray-400 hover:border-gray-600",
                  isActive && "ring-4 ring-black scale-105"
                )}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    handleColorToggle(c);
                  }
                }}
              />

              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  isDisabled ? "text-gray-400" : "text-gray-900"
                )}
              >
                {capitalizedColor} ({count})
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="link">
          <SlidersHorizontal />
          <span>filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[35rem]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Select colors to filter products.</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Colors</h3>
            <Button variant="outline" onClick={clearAllFilters}>
              Clear
            </Button>
          </div>
          {getColorToUI()}
        </div>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={applyFilters}>Show Results</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
