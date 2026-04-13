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
  const { data } = await getCategoriesService({
    slug: ["men-upperbody", "men-shoes"],
  });

  // Variables
  const upperbody = data.categories.filter((c) => c.slug === "men-upperbody")[0];
  const shoes = data.categories.filter((c) => c.slug === "men-shoes")[0];

  return (
    <PromotionalBannersMotion
      firstBanner={
        <>
          {/* Famous Muiches Banner */}
          <div className="relative h-4/5 overflow-hidden group cursor-pointer">
            <div className="absolute inset-0">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
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
          <div className="relative h-4/5 overflow-hidden group cursor-pointer">
            <div className="absolute inset-0">
              <Image
                src="/assets/images/22.png"
                alt="Special Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
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
