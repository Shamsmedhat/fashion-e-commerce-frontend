"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import ProductItem from "../product/product-item";
import { Product } from "@/lib/services/product.service";

type ProductSectionProps = {
  title: string;
  products: Product[];
  showNavigation?: boolean;
};

export default function ProductSection({
  title,
  products,
  showNavigation = false,
}: ProductSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const data = useMemo(() => products || [], [products]);

  if (!data || data.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = data.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        {showNavigation && data.length > itemsPerPage && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
