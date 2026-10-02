import { describe, expect, it } from "vitest";

import { getAllowedCmsOrigins, resolveCorsOrigin } from "./cms-origin";

const DASHBOARD = "https://fashion-ecommerce-dashboard.vercel.app";

describe("CMS origins allowed to revalidate the storefront cache", () => {
  // Regression: without CMS_ORIGIN the route only allowed localhost, so the deployed
  // dashboard's revalidation calls were blocked by CORS and edits stayed invisible.
  it("allows the deployed dashboard and local development by default", () => {
    expect(getAllowedCmsOrigins(undefined)).toEqual(["http://localhost:5173", DASHBOARD]);
    expect(getAllowedCmsOrigins("  ")).toContain(DASHBOARD);
  });

  it("uses CMS_ORIGIN when set, accepting a comma-separated list", () => {
    expect(getAllowedCmsOrigins("https://cms.example.com/, https://staging.example.com")).toEqual([
      "https://cms.example.com",
      "https://staging.example.com",
    ]);
  });

  it("echoes an allowed origin and nothing else", () => {
    const allowed = [DASHBOARD];

    expect(resolveCorsOrigin(DASHBOARD, allowed)).toBe(DASHBOARD);
    expect(resolveCorsOrigin("https://evil.example.com", allowed)).toBeNull();
    expect(resolveCorsOrigin(null, allowed)).toBeNull();
  });
});
