import Features from "@/components/features/home/features";
import HeroSection from "@/components/features/home/hero-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import { Separator } from "@/components/ui/separator";
import NewArrivalsSection from "../../../components/features/home/new-arrivals-section";
import BestSellingMain from "@/components/features/home/best-selling/best-selling-main";
import CategoriesMain from "@/components/features/home/categories/categories-main";

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
      <BestSellingMain />

      {/* Categories */}
      <CategoriesMain />

      <Features />
    </main>
  );
}
