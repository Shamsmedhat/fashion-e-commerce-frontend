import HeroSection from "@/components/features/home/hero-section";
import ProductSection from "@/components/features/home/product-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import CategoryBanners from "@/components/features/home/category-banners";
import ServiceFeatures from "@/components/features/home/service-features";
import { Separator } from "@/components/ui/separator";
import Test from "@/components/features/home/test";

export default function Home() {
  // Get mock data

  return (
    <main className="min-h-screen container">
      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <ProductSection />

      <Separator className="my-6 w-full" />

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* Category Banners */}
      <CategoryBanners />

      {/* Service Features */}
      <ServiceFeatures />

      <Test />
    </main>
  );
}
