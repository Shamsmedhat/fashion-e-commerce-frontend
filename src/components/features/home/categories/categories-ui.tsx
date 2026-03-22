"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
// import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CategoriesUIProps = { ids: { id: string; slug: string }[] };

export default function CategoriesUi({ ids }: CategoriesUIProps) {
  // Translation
  const t = useTranslations();

  // Variable
  const womenCategoryId = ids.filter((category) => category.slug === "women")[0].id;
  const womenShoesCategoryId = ids.filter((category) => category.slug === "women-shoes")[0].id;
  const womenAccessoriesCategoryId = ids.filter(
    (category) => category.slug === "women-accessories",
  )[0].id;
  const childrenCategoryId = ids.filter((category) => category.slug === "children")[0].id;
  const menCategoryId = ids.filter((category) => category.slug === "men")[0].id;

  return (
    <section className="py-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-1 h-screen">
          {/* Women category */}
          <div className="relative h-full overflow-hidden group cursor-pointer">
            <Image
              src="/assets/images/women-category-home.png"
              alt="Women category"
              fill
              className="object-[center_35%] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black rounded-none uppercase"
                asChild
              >
                <Link href={`/category/women/${womenCategoryId}`}>{t("shop-now")}</Link>
              </Button>
            </div>
          </div>

          {/* Women shoes */}
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/women-shoes-category-home.png"
                alt="Women shoes"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link
                    href={`/category/women/${womenCategoryId}/women-shoes/${womenShoesCategoryId}`}
                  >
                    {t("shop-now")}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Women accessories */}
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/women-accessories-category-home.png"
                alt="Women accessories"
                fill
                className="object-cover object-[center_90%] zoom-in-110 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link
                    href={`/category/women/${womenCategoryId}/women-accessories/${womenAccessoriesCategoryId}`}
                  >
                    {t("shop-now")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 h-full">
            {/* Children category */}
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/children-category-home.png"
                alt="Children category"
                fill
                className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link href={`/category/children/${childrenCategoryId}`}>{t("shop-now")}</Link>
                </Button>
              </div>
            </div>

            {/* Men category */}
            <div className="relative col-span-2 overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/men-category-home.png"
                alt="Men category"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link href={`/category/men/${menCategoryId}`}>{t("shop-now")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
