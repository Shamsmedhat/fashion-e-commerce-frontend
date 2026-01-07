import HeroSection from "@/components/features/home/hero-section";
import ProductSection from "@/components/features/home/product-section";
import PromotionalBanners from "@/components/features/home/promotional-banners";
import CategoryBanners from "@/components/features/home/category-banners";
import ServiceFeatures from "@/components/features/home/service-features";
import {
  getNewArrivals,
  getBestSelling,
  getTopRating,
} from "@/lib/mock-data/products.mock";

export default function Home() {
  // Get mock data
  const newArrivals = getNewArrivals();
  const topRating = getTopRating();
  const bestSelling = getBestSelling();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals Section */}
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />

      {/* What's Trending Section */}
      <ProductSection title="WHAT'S TRENDING" products={topRating} />

      {/* Promotional Banners */}
      <PromotionalBanners />

      {/* Best Selling Section */}
      <ProductSection
        title="BEST SELLING"
        products={bestSelling}
        showNavigation={true}
      />

      {/* Category Banners */}
      <CategoryBanners />

      {/* Service Features */}
      <ServiceFeatures />
    </main>
  );
}
