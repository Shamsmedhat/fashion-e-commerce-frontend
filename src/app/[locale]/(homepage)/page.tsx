import Features from "@/components/features/home/features";
import HeroSection from "@/components/features/home/hero-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import { Separator } from "@/components/ui/separator";
import NewArrivalsSection from "@/components/features/home/new-arrivals-section";
import BestSellingSection from "@/components/features/home/best-selling-section";
import CategoriesSection from "@/components/features/home/categories-section";

export default async function Home() {
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
      <BestSellingSection />

      {/* Categories */}
      <CategoriesSection />

      <Features />
    </main>
  );
}
