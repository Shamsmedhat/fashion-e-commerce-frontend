import { Skeleton } from "@/components/ui/skeleton";

export default function BagSummary() {
  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-3">
        <div className="flex justify-between items-center h-5">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between items-center h-5">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between items-center h-5">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 h-6">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-6 w-1/5" />
        </div>
      </div>
      <div className="pt-2">
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
}
