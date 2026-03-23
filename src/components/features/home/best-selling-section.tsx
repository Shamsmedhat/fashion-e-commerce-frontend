import { Suspense } from "react";
import BestSellingData from "./best-selling-data";
import BestSellingUi from "./best-selling-ui";
import { BestSellingCarouselSkeleton } from "@/components/skeletons/products/best-selling.skeleton";

export default function BestSellingSection() {
  return (
    <BestSellingUi>
      <Suspense
        fallback={
          <div role="status" aria-live="polite" aria-label="Loading best selling products">
            <BestSellingCarouselSkeleton />
          </div>
        }
      >
        <BestSellingData />
      </Suspense>
    </BestSellingUi>
  );
}
