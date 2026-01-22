import { Header } from "@/components/layout/header";
import { getBagService } from "@/lib/services/bag.service";
import { getMainCategoriesService } from "@/lib/services/category.service";
import React from "react";

export default async function HeaderWraper() {
  // Use Promise.allSettled to handle failures gracefully
  const [categoryResult, bagResult] = await Promise.allSettled([
    getMainCategoriesService({ limit: 4 }),
    getBagService(),
  ]);

  // Extract categories (always needed)
  const categories =
    categoryResult.status === "fulfilled" ? categoryResult.value.data.categories || [] : [];

  // Extract bag length (default to 0 if user not logged in)
  const bagLength = bagResult.status === "fulfilled" ? bagResult.value.data.bag.items.length : 0;

  return <Header mainCategories={categories} bagLength={bagLength} />;
}
