import { Header } from "@/components/layout/header";
import { getBagService } from "@/lib/services/bag.service";
import { getMainCategoriesService } from "@/lib/services/category.service";
import React from "react";

export default async function HeaderWraper() {
  const [categoryResponse, bagResponse] = await Promise.all([
    getMainCategoriesService({ limit: 4 }),
    getBagService(),
  ]);

  const bagLength = bagResponse.data.bag.items.length;
  const categories = categoryResponse.data.categories || [];

  return <Header mainCategories={categories} bagLength={bagLength} />;
}
