import TotalProducts from "@/components/features/product/total-products";
import React, { Suspense } from "react";

type ChildrenPage = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function page({ params, searchParams }: ChildrenPage) {
  // Params
  const { id } = params;

  return (
    <main className="min-h-screen">
      <div className="border-b border-gray-200 px-6 py-8 md:px-12">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 text-balance">
          Collections
        </h1>
        <p className="mt-2 text-gray-600">
          Discover our curated selection of premium products
        </p>
      </div>

      <div className="py-12">
        <Suspense fallback={<p>loading...</p>}>
          <TotalProducts categoryId={id} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
