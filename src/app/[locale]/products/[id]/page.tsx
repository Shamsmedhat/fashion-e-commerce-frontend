import { notFound } from "next/navigation";

import { REVALIDATE_PRODUCT_DETAIL_SECONDS } from "@/lib/constants/data-cache.constant";
import { getProductByIdService } from "@/lib/services/product.service";
import ProductDetail from "../../../../components/features/products/product-detail";

type ProductPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

export const revalidate = REVALIDATE_PRODUCT_DETAIL_SECONDS;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  try {
    const response = await getProductByIdService(id);
    const product = response.data.product;

    if (!product) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-white my-16">
        <ProductDetail product={product} />
      </main>
    );
  } catch (err) {
    throw err;
  }
}
