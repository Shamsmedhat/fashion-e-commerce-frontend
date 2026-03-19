import { NextRequest, NextResponse } from "next/server";
import { getProductVariantsService } from "@/lib/services/product.service";

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  const { productId } = params;

  try {
    const product = await getProductVariantsService(productId);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product variants:", error);

    return NextResponse.json({ message: "Failed to fetch product", code: 500 }, { status: 500 });
  }
}
