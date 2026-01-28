import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/features/home/hero-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import CategoryBanners from "@/components/features/home/category-banners";
import ServiceFeatures from "@/components/features/home/service-features";
import NewArrivalsSection from "./_components/new-arrivals-section";
import { getProductsService } from "@/lib/services/product.service";
import Features from "@/components/features/home/features";

export default async function Home() {
  const bestSellingProducts = await getProductsService({ limit: 4 });
  return (
    <main className="container min-h-screen mb-4 mt-12">
      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <NewArrivalsSection />

      <Separator className="my-6 w-full" />

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* Category Banners */}
      <CategoryBanners bestSellingProducts={bestSellingProducts.data.products} />

      {/* Service Features */}
      <ServiceFeatures />

      <Features />
    </main>
  );
}
