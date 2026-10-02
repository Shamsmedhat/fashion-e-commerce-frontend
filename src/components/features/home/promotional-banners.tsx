import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { PromotionalBannersMotion } from "@/components/features/home/promotional-banners-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getCategoriesService } from "@/lib/services/category.service";

type BannerProps = {
  category: Category;
  image: string;
  alt: string;
  title: string;
  cta: string;
};

function Banner({ category, image, alt, title, cta }: BannerProps) {
  const parentId =
    typeof category.parentId === "string" ? category.parentId : category.parentId?._id;

  return (
    <div className="group relative h-full min-h-[260px] cursor-pointer overflow-hidden sm:min-h-[320px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-5 sm:p-8 md:p-10">
        <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-4xl md:mb-6 md:text-5xl">
          {title}
        </h2>
        <Button
          size="lg"
          variant="outline"
          className="rounded-none border-white bg-white/5 text-white backdrop-blur-sm hover:bg-white"
          asChild
        >
          <Link href={`/category/men/${parentId}/${category.slug}/${category._id}`}>{cta}</Link>
        </Button>
      </div>
    </div>
  );
}

export default async function PromotionalBanners() {
  // Translations
  const t = await getTranslations();

  // Fetch
  const { data } = await getCategoriesService(
    {
      slug: ["men-upperbody", "men-shoes"],
    },
    { extraTags: ["promotional-banners"] },
  );

  // Variables — the banners point at CMS-managed categories; one that was renamed or removed
  // is simply left out instead of crashing the home page.
  const upperbody = data.categories.find((c) => c.slug === "men-upperbody");
  const shoes = data.categories.find((c) => c.slug === "men-shoes");

  if (!upperbody && !shoes) return null;

  return (
    <PromotionalBannersMotion
      firstBanner={
        upperbody ? (
          <Banner
            category={upperbody}
            image="/assets/images/23.jpg"
            alt="Famous Muiches"
            title={t("famous-artists")}
            cta={t("shop-now")}
          />
        ) : null
      }
      secondBanner={
        shoes ? (
          <Banner
            category={shoes}
            image="/assets/images/22.png"
            alt="Special Collection"
            title={t("special-collection")}
            cta={t("shop-now")}
          />
        ) : null
      }
    />
  );
}
