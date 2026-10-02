// Origins of the admin dashboard that may call POST /api/revalidate from the browser.
// The defaults cover local development and the deployed dashboard, so a missing CMS_ORIGIN
// variable no longer silently blocks cache revalidation in production.
const DEFAULT_CMS_ORIGINS = [
  "http://localhost:5173",
  "https://fashion-ecommerce-dashboard.vercel.app",
];

// CMS_ORIGIN may hold one origin or several, comma-separated.
export function getAllowedCmsOrigins(value: string | undefined = process.env.CMS_ORIGIN): string[] {
  const configured = (value ?? "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

  return configured.length > 0 ? configured : DEFAULT_CMS_ORIGINS;
}

// CORS allows a single origin per response, so the caller's origin is echoed back when allowed.
export function resolveCorsOrigin(
  requestOrigin: string | null,
  allowedOrigins: string[] = getAllowedCmsOrigins(),
): string | null {
  return requestOrigin && allowedOrigins.includes(requestOrigin) ? requestOrigin : null;
}
