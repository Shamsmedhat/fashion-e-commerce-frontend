import BagHeader from "@/components/features/bag/bag-header";
import { Suspense } from "react";
import BagSectionSkeleton from "@/components/skeletons/bag/bag.skeleton";
import BagSection from "@/components/features/bag/bag-section";

// Shell is static
// All per-user reads MUST stay inside <Suspense><BagSection/></Suspense>
// Do NOT call session/cookies/headers at this file's top level
// This is my note to remember NOT an AI comment

export default async function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Static Header Section - Shows immediately */}
      <BagHeader />

      {/* Dynamic Content - Suspended with skeleton */}
      <Suspense fallback={<BagSectionSkeleton />}>
        <BagSection />
      </Suspense>
    </main>
  );
}
