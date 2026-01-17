import { Separator } from "@/components/ui/separator";

import HeroSection from "@/components/features/home/hero-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import CategoryBanners from "@/components/features/home/category-banners";
import ServiceFeatures from "@/components/features/home/service-features";
import Test from "@/components/features/home/test";
import NewArrivalsSection from "./_components/new-arrivals-section";

export default function Home() {
  return (
    <main className="container min-h-screen my-4">
      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <NewArrivalsSection />

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
