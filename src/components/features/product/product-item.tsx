import { Heart, Star } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/services/product.service";
import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";

type ProductItemProps = {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
  discountOverride?: number;
};

export default function ProductItem({
  product,
  discountOverride,
}: ProductItemProps) {
  const variant = product.variants?.[0];
  const price = variant?.price || 0;
  const priceDiscount = variant?.priceDiscount;
  const displayPrice = priceDiscount || price;
  const originalPrice = priceDiscount ? price : null;
  const discountPercentage =
    discountOverride !== undefined
      ? discountOverride
      : priceDiscount && originalPrice
      ? Math.round(((price - priceDiscount) / price) * 100)
      : null;

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-300"
      )}
    >
      {/* Discount Badge */}
      {discountPercentage && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-10"
        aria-label="Add to wishlist"
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-colors stroke-black",
            false ? "fill-red-500 text-red-500" : "text-black fill-none"
          )}
        />
      </button>

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-md">
        <Link
          href={`/products/${product._id}`}
          className="block relative w-full h-full"
        >
          <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-[1.08] group-hover:[transform:rotateZ(2deg)]">
            <Image
              src="/assets/images/product.png"
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden">
          <button
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();
            // }}
            className={cn(
              "w-full h-12 bg-black text-white font-semibold transition-transform duration-500 flex items-center justify-center hover:bg-gray-900 group-hover:translate-y-0 translate-y-full"
            )}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info - Below the image box */}
      <div className="px-4 py-4 space-y-2  rounded-b-lg">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "text-lg font-bold",
              discountPercentage ? "text-gray-900" : "text-gray-900"
            )}
          >
            ${displayPrice.toFixed(0)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.ratingsAverage !== undefined && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const rating = product.ratingsAverage || 0;
                const isFilled = i < Math.floor(rating);
                const isPartial = !isFilled && i < Math.ceil(rating);
                return (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      isFilled
                        ? "fill-yellow-500 text-yellow-500"
                        : isPartial
                        ? "fill-none text-yellow-500 stroke-yellow-500 stroke-1"
                        : "fill-none text-gray-300 stroke-gray-300 stroke-1"
                    )}
                  />
                );
              })}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
