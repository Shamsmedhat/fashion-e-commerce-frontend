import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import NewArrivalsCover from "@/components/features/products/new-arrivals-cover";
import NewArrivalsList from "@/components/features/products/new-arrivals-list";
import { NewArrivalsListSkeleton } from "@/components/skeletons/products/new-arrivals-list.skeleton";

type NewArrivalsPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(): Promise<{ title: string }> {
  const t = await getTranslations();

  return {
    title: t("new-arrivals-title"),
  };
}

export default function NewArrivalsPage({ searchParams = {} }: NewArrivalsPageProps): JSX.Element {
  return (
    <main className="min-h-screen mt-28">
      <NewArrivalsCover />

      <div className="py-5">
        <Suspense
          fallback={
            <div role="status" aria-live="polite" aria-label="Loading new arrivals">
              <NewArrivalsListSkeleton />
            </div>
          }
        >
          <NewArrivalsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
