import { Skeleton } from "@/components/ui/skeleton";

export default function BagListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200">
          <Skeleton className="w-full sm:w-32 h-32 rounded" />
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-5 w-20 ml-auto" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-3" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
