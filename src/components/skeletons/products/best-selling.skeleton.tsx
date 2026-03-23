import { Skeleton } from "@/components/ui/skeleton";
import ProductItemSkeleton from "./product-item.skeleton";

export function BestSellingCarouselSkeleton() {
  return (
    <section className="py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Title */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-48 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        {/* Product grid */}
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="basis-1/3 shrink-0">
              <ProductItemSkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
