import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const VALID_TAGS = [
  "products",
  "categories",
  "main-categories",
  "promotional-banners",
  "best-selling",
  "bag",
] as const;
type ValidTag = (typeof VALID_TAGS)[number];

// TODO: When finish CMS to test.
export async function POST(request: NextRequest) {
  // Security: verify secret token
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body?.tag) {
    return NextResponse.json({ error: "Missing 'tag' in request body" }, { status: 400 });
  }

  const tag = body.tag as string;

  // Support both bulk tags (products, categories) and per-item tags (product-{id})
  const isValidBulkTag = VALID_TAGS.includes(tag as ValidTag);
  const isValidPerItemTag = tag.startsWith("product-");

  if (!isValidBulkTag && !isValidPerItemTag) {
    return NextResponse.json(
      { error: `Invalid tag. Must be one of: ${VALID_TAGS.join(", ")} or product-{id}` },
      { status: 400 },
    );
  }

  revalidateTag(tag);

  return NextResponse.json({
    status: "success",
    message: `Cache invalidated for tag: ${tag}`,
  });
}
