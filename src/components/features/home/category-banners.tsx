"use client";

import ProductItem from "../product/product-item";
import { Montserrat } from "next/font/google";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextBestSelling,
  CarouselPreviousBestSelling,
} from "@/components/ui/carousel";

const montserrat = Montserrat({
  weight: ["200", "300", "400"],
  subsets: ["cyrillic"],
});

export default function CategoryBanners({
  bestSellingProducts,
}: {
  bestSellingProducts: Product[];
}) {
  // TODO: Complete this section
  // const handlePrev = () => {
  //   setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prev) => (prev < bestSellingProducts.length - 4 ? prev + 1 : prev));
  // };

  return (
    <section className="py-12">
      <div className="container">
        {/* Product Grid */}
        <Carousel opts={{ align: "start" }}>
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_black] [-webkit-text-fill-color:transparent]">
                BEST
              </span>
              <span className="text-3xl md:text-4xl font-bold text-black">SELL</span>
              <span className="text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_black] [-webkit-text-fill-color:transparent]">
                ING
              </span>

              {/* Action buttons */}
              <CarouselNextBestSelling
                className="flex flex-col items-end gap-2 text-black hover:text-gray-600 transition-colors"
                aria-label="Next"
                font={montserrat}
              />
              <CarouselPreviousBestSelling
                className="flex flex-col items-start gap-2 text-black hover:text-gray-600 transition-colors"
                aria-label="Next"
                font={montserrat}
              />
            </div>
          </div>

          <CarouselContent>
            {bestSellingProducts.map((product) => (
              <CarouselItem className="basis-1/3" key={product._id}>
                <ProductItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
