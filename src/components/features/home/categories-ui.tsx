"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

type CategoriesUIProps = { ids: { id: string; slug: string }[] };

type CategoryTileProps = {
  href: string;
  image: string;
  alt: string;
  label: string;
  className?: string;
  imageClassName?: string;
};

function CategoryTile({ href, image, alt, label, className, imageClassName }: CategoryTileProps) {
  return (
    <motion.div
      className={cn("group relative cursor-pointer overflow-hidden", className)}
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
        src={image}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-transform duration-500 group-hover:scale-105",
          imageClassName,
        )}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-4 sm:p-6 md:p-10">
        <Button
          size="lg"
          variant="outline"
          className="rounded-none bg-white uppercase text-black"
          asChild
        >
          <Link href={href}>{label}</Link>
        </Button>
      </div>
    </motion.div>
  );
}

export default function CategoriesUi({ ids }: CategoriesUIProps) {
  // Translation
  const t = useTranslations();

  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  // Variables — categories are managed in the CMS, so any of them can be renamed or removed.
  // A tile is shown only while its category exists; a missing one must not break the home page.
  const idOf = (slug: string) => ids.find((category) => category.slug === slug)?.id;

  const women = idOf("women");
  const womenShoes = idOf("women-shoes");
  const womenAccessories = idOf("women-accessories");
  const children = idOf("children");
  const men = idOf("men");

  const label = t("shop-now");
  const smallTile = "h-[220px] sm:h-[280px] md:h-[300px]";

  if (!women && !children && !men) return null;

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
          {women && (
            <CategoryTile
              href={`/category/women/${women}`}
              image="/assets/images/women-category-home.png"
              alt="Women category"
              label={label}
              className="h-[220px] sm:h-[300px] md:h-[340px]"
              imageClassName="object-[center_35%]"
            />
          )}

          {women && (womenShoes || womenAccessories) && (
            <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-2 md:gap-1">
              {/* Women shoes */}
              {womenShoes && (
                <CategoryTile
                  href={`/category/women/${women}/women-shoes/${womenShoes}`}
                  image="/assets/images/women-shoes-category-home.png"
                  alt="Women shoes"
                  label={label}
                  className={smallTile}
                />
              )}

              {/* Women accessories */}
              {womenAccessories && (
                <CategoryTile
                  href={`/category/women/${women}/women-accessories/${womenAccessories}`}
                  image="/assets/images/women-accessories-category-home.png"
                  alt="Women accessories"
                  label={label}
                  className={smallTile}
                  imageClassName="object-[center_90%]"
                />
              )}
            </div>
          )}

          {(children || men) && (
            <div className="grid h-full grid-cols-1 gap-2 sm:grid-cols-3 md:gap-1">
              {/* Children category */}
              {children && (
                <CategoryTile
                  href={`/category/children/${children}`}
                  image="/assets/images/children-category-home.png"
                  alt="Children category"
                  label={label}
                  className={smallTile}
                  imageClassName="object-[center_15%]"
                />
              )}

              {/* Men category */}
              {men && (
                <CategoryTile
                  href={`/category/men/${men}`}
                  image="/assets/images/men-category-home.png"
                  alt="Men category"
                  label={label}
                  className={cn(smallTile, "sm:col-span-2")}
                  imageClassName="object-top"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
