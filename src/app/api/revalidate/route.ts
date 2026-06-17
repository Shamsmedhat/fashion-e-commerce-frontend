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

const CMS_ORIGIN = process.env.CMS_ORIGIN ?? "http://localhost:5173";

// CORS headers for the dashboard SPA browser hop (dashboard → this route)
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": CMS_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

type MeResponse = {
  data?: {
    user?: {
      role?: string;
    };
  };
};

// Verify the bearer token belongs to an admin by calling the backend /users/me.
// Returns an error response on failure, or null when the caller is a valid admin.
async function authorizeAdmin(request: NextRequest): Promise<NextResponse | null> {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or malformed Authorization header" },
      { status: 401, headers: corsHeaders },
    );
  }

  const meRes = await fetch(`${process.env.API_URL}/users/me`, {
    headers: { Authorization: authorization },
    cache: "no-store",
  }).catch(() => null);

  if (!meRes || !meRes.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const me = (await meRes.json().catch(() => null)) as MeResponse | null;

  if (me?.data?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403, headers: corsHeaders });
  }

  return null;
}

// Accepts a bulk tag from the allowlist or a per-item product-{id} tag.
function isValidTag(tag: string): boolean {
  const isValidBulkTag = VALID_TAGS.includes(tag as ValidTag);
  const isValidPerItemTag = /^product-.+/.test(tag);
  return isValidBulkTag || isValidPerItemTag;
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Authorization — admin JWT verified against the backend
  const authError = await authorizeAdmin(request);
  if (authError) return authError;

  // Body — accept both `{ tag: string }` and `{ tags: string[] }`
  const body = (await request.json().catch(() => null)) as
    | { tag?: unknown; tags?: unknown }
    | null;

  const rawTags = Array.isArray(body?.tags)
    ? body.tags
    : typeof body?.tag === "string"
      ? [body.tag]
      : null;

  if (!rawTags || rawTags.length === 0) {
    return NextResponse.json(
      { error: "Missing 'tag' or 'tags' in request body" },
      { status: 400, headers: corsHeaders },
    );
  }

  // Validation — every tag must be a string and pass the allowlist/pattern check
  const tags = rawTags.filter((tag): tag is string => typeof tag === "string");

  if (tags.length !== rawTags.length || !tags.every(isValidTag)) {
    return NextResponse.json(
      { error: `Invalid tag. Must be one of: ${VALID_TAGS.join(", ")} or product-{id}` },
      { status: 400, headers: corsHeaders },
    );
  }

  // Revalidation
  tags.forEach((tag) => revalidateTag(tag));

  return NextResponse.json(
    { status: "success", message: `Cache invalidated for tags: ${tags.join(", ")}` },
    { headers: corsHeaders },
  );
}
