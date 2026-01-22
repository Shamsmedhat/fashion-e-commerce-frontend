import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import React from "react";

// Type
type SubCategoryListProps = {
  basePath: string;
  currentSubcategory: string;
  allSubCategories: Category[];
};
export default function SubcategoryList({
  basePath,
  currentSubcategory,
  allSubCategories,
}: SubCategoryListProps) {
  // Translations
  const t = useTranslations();

  return (
    <div className="flex m-4 gap-4 flex-wrap">
      {/* All Products Link */}
      <Link
        href={basePath}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize text-gray-700",
          !currentSubcategory ? "font-bold" : "text-gray-400",
        )}
        scroll={false}
      >
        {t("total")}
      </Link>

      {/* Subcategory Links */}
      {allSubCategories.map((sc) => {
        const isActive = currentSubcategory?.[1] === sc._id;

        return (
          <Link
            key={sc._id}
            href={`${basePath}/${sc.slug}/${sc._id}`}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize",
              isActive ? "font-bold" : "text-gray-400",
            )}
            scroll={false}
          >
            {sc.name}
          </Link>
        );
      })}
    </div>
  );
}
