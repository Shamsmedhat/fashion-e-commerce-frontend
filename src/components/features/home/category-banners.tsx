"use client";

import { useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import ProductItem from "../product/product-item";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils/tailwind-merge";

const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["cyrillic"],
});

// Zalando Sans Expanded
// Mock data for best-selling products
const bestSellingProducts: Product[] = [
  {
    _id: "1",
    name: "HAVIT HV-G92 Gamepad",
    description: "Premium gamepad controller",
    categoryId: "1",
    coverImage: "product.png",
    images: ["product.png"],
    variants: [
      {
        _id: "v1",
        sku: "SKU-001",
        size: "M",
        color: "White",
        price: 160,
        soldCount: 88,
        stock: 50,
        images: ["product.png"],
      },
    ],
    ratingsAverage: 5,
    reviewCount: 88,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "HAVIT HV-G92 Gamepad",
    description: "Premium gamepad controller",
    categoryId: "1",
    coverImage: "product.png",
    images: ["product.png"],
    variants: [
      {
        _id: "v2",
        sku: "SKU-002",
        size: "M",
        color: "Red",
        price: 160,
        soldCount: 88,
        stock: 50,
        images: ["product.png"],
      },
    ],
    ratingsAverage: 5,
    reviewCount: 88,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "HAVIT HV-G92 Gamepad",
    description: "Premium gamepad controller",
    categoryId: "1",
    coverImage: "product.png",
    images: ["product.png"],
    variants: [
      {
        _id: "v3",
        sku: "SKU-003",
        size: "M",
        color: "Blue",
        price: 160,
        soldCount: 88,
        stock: 50,
        images: ["product.png"],
      },
    ],
    ratingsAverage: 5,
    reviewCount: 88,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "HAVIT HV-G92 Gamepad",
    description: "Premium gamepad controller",
    categoryId: "1",
    coverImage: "product.png",
    images: ["product.png"],
    variants: [
      {
        _id: "v4",
        sku: "SKU-004",
        size: "M",
        color: "Multi",
        price: 1160,
        priceDiscount: 960,
        soldCount: 75,
        stock: 30,
        images: ["product.png"],
      },
    ],
    ratingsAverage: 4.5,
    reviewCount: 75,
    createdAt: new Date().toISOString(),
  },
];

export default function CategoryBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < bestSellingProducts.length - 4 ? prev + 1 : prev
    );
  };

  const displayedProducts = bestSellingProducts.slice(
    currentIndex,
    currentIndex + 4
  );

  return (
    <section className="py-12">
      <div className="container">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_black] [-webkit-text-fill-color:transparent]">
              BEST
            </span>
            <span className="text-3xl md:text-4xl font-bold text-black">
              SELL
            </span>
            <span className="text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_black] [-webkit-text-fill-color:transparent]">
              ING
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              disabled={currentIndex === 0}
              className="flex flex-col items-start gap-2 text-black hover:text-gray-600 transition-colors"
              aria-label="Previous"
            >
              <span className={cn(montserrat.className, "text-lg")}>PREV</span>
              <MoveLeft size={30} strokeWidth={1} absoluteStrokeWidth />
            </button>
            <button
              // onClick={handleNext}
              disabled={currentIndex >= bestSellingProducts.length - 4}
              className="flex flex-col items-end gap-2 text-black hover:text-gray-600 transition-colors"
              aria-label="Next"
            >
              <span className={cn(montserrat.className, "text-lg")}>NEXT</span>
              <MoveRight size={30} strokeWidth={1} absoluteStrokeWidth />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {displayedProducts.map((product, index) => (
            <ProductItem
              key={product._id}
              product={product}
              showAddToBag={index === 3} // Show Add To Cart button on 4th product
              discountOverride={index === 3 ? 35 : undefined} // Override discount to match design
            />
          ))}
        </div>

        {/* SHOP NOW Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-black text-white font-semibold px-12 py-3 rounded hover:bg-gray-900 transition-colors">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
