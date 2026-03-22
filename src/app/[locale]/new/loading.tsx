import { Skeleton } from "@/components/ui/skeleton";

import { NewArrivalsListSkeleton } from "@/components/skeletons/sections/new-arrivals-list.skeleton";

export default function NewArrivalsLoading(): JSX.Element {
  return (
    <main className="min-h-screen mt-28">
      {/* Cover skeleton */}
      <div className="relative w-full h-[40vh] min-h-[300px] bg-gray-100 overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />
      </div>
      <div className="border-b border-gray-200 px-6 py-8 md:px-12">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-72" />
      </div>

      <div className="py-5">
        <NewArrivalsListSkeleton />
      </div>
    </main>
  );
}
