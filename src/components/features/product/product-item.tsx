"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/services/product.service";
import { cn } from "@/lib/utils/tailwind-merge";

type ProductItemProps = {
  product: Product;
  className?: string;
};

export default function ProductItem({ product, className }: ProductItemProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get the first variant for display
  const firstVariant = product.variants?.[0];
  const displayPrice = firstVariant?.priceDiscount || firstVariant?.price || 0;
  const originalPrice = firstVariant?.priceDiscount ? firstVariant.price : null;
  const imageUrl =
    firstVariant?.images?.[0] || product.coverImage || "/placeholder-image.jpg";
  const hasDiscount = !!firstVariant?.priceDiscount;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg overflow-hidden transition-shadow hover:shadow-lg",
        className
      )}
    >
      {/* Sale Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          SALE
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-square overflow-hidden bg-gray-100"
      >
        {/* <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        /> */}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ${displayPrice}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.ratingsAverage && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.round(product.ratingsAverage || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
