import { Suspense } from "react";
import BestSellingData from "./best-selling-data";
import BestSellingUi from "./best-selling-ui";
import { BestSellingCarouselSkeleton } from "@/components/skeletons/sections/best-selling.skeleton";

export default function BestSellingMain() {
  return (
    <BestSellingUi>
      <Suspense fallback={<BestSellingCarouselSkeleton />}>
        <BestSellingData />
      </Suspense>
    </BestSellingUi>
  );
}
