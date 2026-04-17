import { Skeleton } from "@/components/ui/skeleton";

export default function BagSectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
        {/* Left Column - Your Selections Skeleton */}
        <div className="space-y-6">
          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />

            {/* Bag Item Skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-200">
                  <Skeleton className="h-24 w-24 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center gap-2 mt-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary Skeleton */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-white p-6 space-y-5">
            <Skeleton className="h-6 w-40" />

            <div className="space-y-3 text-sm">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
            </div>

            <Skeleton className="h-10 w-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
