import { authOptions } from "@/auth";
import { Header } from "@/components/layout/header";
import { getBagService } from "@/lib/services/bag.service";
import { getMainCategoriesService } from "@/lib/services/category.service";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HeaderWraper() {
  const session = await getServerSession(authOptions);

  // Separate the fetches based on what we need
  const categoryPromise = getMainCategoriesService({ limit: 4 });

  let bagLength = 0;

  if (session?.user) {
    // Parallel fetch if user exists
    const [categoryResult, bagResult] = await Promise.allSettled([
      categoryPromise,
      getBagService(),
    ]);

    const categories =
      categoryResult.status === "fulfilled" ? categoryResult.value.data.categories || [] : [];

    bagLength = bagResult.status === "fulfilled" ? bagResult.value.data.bag.items.length : 0;

    return <Header mainCategories={categories} bagLength={bagLength} />;
  } else {
    // Only fetch categories if no user
    const categoryResult = await categoryPromise.catch(() => null);
    const categories = categoryResult?.data.categories || [];

    return <Header mainCategories={categories} bagLength={bagLength} />;
  }
}
