import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/features/products/product-detail";
import { REVALIDATE_PRODUCT_DETAIL_SECONDS } from "@/lib/constants/data-cache.constant";
import { getProductByIdService } from "@/lib/services/product.service";
import { AppError } from "@/lib/utils/app-errors";

type ProductPageProps = {
  params: {
    id: string;
    locale: string;
  };
};

export const revalidate = REVALIDATE_PRODUCT_DETAIL_SECONDS;

// A malformed id (400) or a deleted product (404) is a missing page, not a server error.
// The request is cached, so the metadata and the page share a single API call.
async function getProduct(id: string): Promise<Product> {
  try {
    const response = await getProductByIdService(id);
    if (!response.data.product) notFound();

    return response.data.product;
  } catch (error) {
    if (error instanceof AppError && [400, 404].includes(error.statusCode)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.coverImage ? [product.coverImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <main className="my-16 min-h-screen bg-white">
      <ProductDetail product={product} />
    </main>
  );
}
