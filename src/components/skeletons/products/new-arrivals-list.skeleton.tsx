import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/skeletons/products/product-item.skeleton";

export function NewArrivalsListSkeleton(): JSX.Element {
  return (
    <>
      {/* Filter and Sort */}
      <div className="flex justify-end gap-4 pb-6 m-4">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-16" />
      </div>

      {/* Products */}
      <div className="m-4 pb-8">
        <ProductGridSkeleton count={8} />
      </div>
    </>
  );
}
