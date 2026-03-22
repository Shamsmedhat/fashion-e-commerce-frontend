import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ProductItem from "../../product/product-item";
import { getBestSellingProductsService } from "@/lib/services/product.service";

export default async function BestSellingData() {
  // Fetch
  const payload = await getBestSellingProductsService();
  const bestSellingProducts = payload.data.products;

  return (
    <CarouselContent>
      {bestSellingProducts.map((product) => (
        <CarouselItem className="basis-1/3" key={product._id}>
          <ProductItem product={product} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
