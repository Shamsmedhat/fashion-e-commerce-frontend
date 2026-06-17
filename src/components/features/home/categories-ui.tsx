"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

type CategoriesUIProps = { ids: { id: string; slug: string }[] };

export default function CategoriesUi({ ids }: CategoriesUIProps) {
  // Translation
  const t = useTranslations();

  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  // Variable
  const womenCategoryId = ids.filter((category) => category.slug === "women")[0].id;
  const womenShoesCategoryId = ids.filter((category) => category.slug === "women-shoes")[0].id;
  const womenAccessoriesCategoryId = ids.filter(
    (category) => category.slug === "women-accessories",
  )[0].id;
  const childrenCategoryId = ids.filter((category) => category.slug === "children")[0].id;
  const menCategoryId = ids.filter((category) => category.slug === "men")[0].id;

  return (
    <motion.section
      className="py-12"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.12,
          },
        },
      }}
    >
      <div className="container py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 gap-2 md:gap-1">
          {/* Women category */}
          <motion.div
            className="group relative h-[220px] cursor-pointer overflow-hidden sm:h-[300px] md:h-[340px]"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.98 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
          >
            <Image
              src="/assets/images/women-category-home.png"
              alt="Women category"
              fill
              className="object-[center_35%] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black rounded-none uppercase"
                asChild
              >
                <Link href={`/category/women/${womenCategoryId}`}>{t("shop-now")}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Women shoes */}
          <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:gap-1">
            <motion.div
              className="group relative h-[220px] cursor-pointer overflow-hidden sm:h-[280px] md:h-[300px]"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Image
                src="/assets/images/women-shoes-category-home.png"
                alt="Women shoes"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
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
            </motion.div>

            {/* Women accessories */}
            <motion.div
              className="group relative h-[220px] cursor-pointer overflow-hidden sm:h-[280px] md:h-[300px]"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Image
                src="/assets/images/women-accessories-category-home.png"
                alt="Women accessories"
                fill
                className="object-cover object-[center_90%] zoom-in-110 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
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
            </motion.div>
          </div>

          <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-3 md:gap-1">
            {/* Children category */}
            <motion.div
              className="group relative h-[220px] cursor-pointer overflow-hidden sm:h-[280px] md:h-[300px]"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Image
                src="/assets/images/children-category-home.png"
                alt="Children category"
                fill
                className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link href={`/category/children/${childrenCategoryId}`}>{t("shop-now")}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Men category */}
            <motion.div
              className="group relative h-[220px] cursor-pointer overflow-hidden sm:col-span-2 sm:h-[280px] md:h-[300px]"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <Image
                src="/assets/images/men-category-home.png"
                alt="Men category"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none uppercase"
                  asChild
                >
                  <Link href={`/category/men/${menCategoryId}`}>{t("shop-now")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
