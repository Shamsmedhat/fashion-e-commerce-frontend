import { Skeleton } from "@/components/ui/skeleton";

export default function ProductItemSkeleton() {
  return (
    <div className="group relative overflow-hidden transition-all duration-300">
      {/* Discount Badge Skeleton */}
      <div className="absolute top-2 left-2 z-10">
        <Skeleton className="h-6 w-12 rounded" />
      </div>

      {/* Wishlist Button Skeleton */}
      <div className="absolute top-3 right-3 z-10">
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      {/* Product Image Container Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-md">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Product Info - Below the image box */}
      <div className="px-4 py-4 space-y-2 rounded-b-lg">
        {/* Product Title Skeleton */}
        <div className="space-y-2 mb-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2 mb-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  );
}

// Usage example with grid
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductItemSkeleton key={i} />
      ))}
    </div>
  );
}
