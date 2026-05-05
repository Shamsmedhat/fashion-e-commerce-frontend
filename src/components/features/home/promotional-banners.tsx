import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getCategoriesService } from "@/lib/services/category.service";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { PromotionalBannersMotion } from "@/components/features/home/promotional-banners-motion";

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

  // Variables
  const upperbody = data.categories.filter((c) => c.slug === "men-upperbody")[0];
  const shoes = data.categories.filter((c) => c.slug === "men-shoes")[0];

  return (
    <PromotionalBannersMotion
      firstBanner={
        <>
          {/* Famous Muiches Banner */}
          <div className="group relative h-full min-h-[260px] cursor-pointer overflow-hidden sm:min-h-[320px]">
            <div className="absolute inset-0">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-5 sm:p-8 md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-4xl md:mb-6 md:text-5xl">
                {t("famous-artists")}
              </h2>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 hover:bg-white text-white border-white backdrop-blur-sm rounded-none"
                asChild
              >
                <Link
                  href={`/category/men/${upperbody.parentId}/${upperbody.slug}/${upperbody._id}`}
                >
                  {t("shop-now")}
                </Link>
              </Button>
            </div>
          </div>
        </>
      }
      secondBanner={
        <>
          {/* Special Collection Banner */}
          <div className="group relative h-full min-h-[260px] cursor-pointer overflow-hidden sm:min-h-[320px]">
            <div className="absolute inset-0">
              <Image
                src="/assets/images/22.png"
                alt="Special Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-5 sm:p-8 md:p-10">
              <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-4xl md:mb-6 md:text-5xl">
                {t("special-collection")}
              </h2>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 hover:bg-white text-white border-white backdrop-blur-sm rounded-none"
                asChild
              >
                <Link href={`/category/men/${shoes.parentId}/${shoes.slug}/${shoes._id}`}>
                  {t("shop-now")}
                </Link>
              </Button>
            </div>
          </div>
        </>
      }
    />
  );
}
