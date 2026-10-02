import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ProductItem from "../products/product-item";
import { getBestSellingProductsService } from "@/lib/services/product.service";

export default async function BestSellingData() {
  // Fetch
  const payload = await getBestSellingProductsService();
  const products = payload.data.products;

  return (
    <CarouselContent>
      {products.map((product) => (
        <CarouselItem className="basis-1/2 md:basis-1/3" key={product._id}>
          <ProductItem product={product} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
