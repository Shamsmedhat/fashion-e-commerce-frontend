import { getProductsService } from "@/lib/services/product.service";
import ProductItem from "../product/product-item";
import { getTranslations } from "next-intl/server";

export default async function ProductSection() {
  // Translations
  const t = await getTranslations();

  // Variables
  const response = await getProductsService({ limit: 8, sort: "-createdAt" });
  const products = response.data.products || [];

  // Empty section
  if (products.length === 0) {
    return (
      <div className="capitalize flex justify-center text-2xl text-primary">
        <p>{t("empty-section")} ✨</p>
      </div>
    );
  }

  // UI
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}
