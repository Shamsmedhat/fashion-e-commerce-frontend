import { NextRequest, NextResponse } from "next/server";

import { REVALIDATE_PRODUCT_VARIANTS_SECONDS } from "@/lib/constants/data-cache.constant";
import { getProductVariantsService } from "@/lib/services/product.service";

export const revalidate = REVALIDATE_PRODUCT_VARIANTS_SECONDS;

export async function GET(_request: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    const product = await getProductVariantsService(productId);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product variants:", error);

    return NextResponse.json({ message: "Failed to fetch product", code: 500 }, { status: 500 });
  }
}
