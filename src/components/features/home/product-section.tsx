import ProductItem from "../product/product-item";
import { getProductService, Product } from "@/lib/services/product.service";

export default async function ProductSection() {
  const response = await getProductService();
  const products = response.data.products || [];

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
