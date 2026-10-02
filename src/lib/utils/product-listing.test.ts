import { describe, expect, it } from "vitest";

import { filterProductsByVariants } from "./filter-products-by-variants";
import { paginate, parseListingParams } from "./product-listing";
import { sortProducts } from "./sort-products";

function product(name: string, variants: Partial<ProductVariant>[]): Product {
  return {
    _id: name,
    name,
    description: "",
    categoryId: "c1",
    coverImage: "",
    images: [],
    reviewCount: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
    variants: variants.map((variant, index) => ({
      _id: `${name}-${index}`,
      sku: `${name}-${index}`,
      size: "M",
      color: "black",
      price: 500,
      soldCount: 0,
      stock: 1,
      images: [],
      ...variant,
    })),
  };
}

describe("parseListingParams", () => {
  // Regression: every search param was forwarded to the API as a database filter,
  // so /new?utm_source=newsletter showed an empty shop.
  it("ignores parameters a listing does not understand", () => {
    expect(
      parseListingParams({ utm_source: "newsletter", fbclid: "abc", callbackUrl: "/bag" }),
    ).toEqual({
      colors: [],
      sizes: [],
      sort: "",
      page: 1,
    });
  });

  it("reads colours and sizes whether repeated or comma-separated", () => {
    const params = parseListingParams({
      "variants.color": ["Black", "white,RED"],
      "variants.size": "M",
    });

    expect(params.colors).toEqual(["black", "white", "red"]);
    expect(params.sizes).toEqual(["m"]);
  });

  it("accepts only the known sort options", () => {
    expect(parseListingParams({ sort: "price-low-to-high" }).sort).toBe("price-low-to-high");
    expect(parseListingParams({ sort: "-createdAt" }).sort).toBe("");
    expect(parseListingParams({ sort: ["discount", "x"] }).sort).toBe("");
  });

  it("falls back to page 1 for anything that is not a positive whole number", () => {
    expect(parseListingParams({ page: "3" }).page).toBe(3);
    for (const page of ["0", "-2", "1.5", "abc", ""]) {
      expect(parseListingParams({ page }).page).toBe(1);
    }
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 16 }, (_, index) => index + 1);

  // Regression: listings silently stopped at the API's default page of 10 products.
  it("reaches every item across the pages", () => {
    const first = paginate(items, 1, 12);
    const second = paginate(items, 2, 12);

    expect(first.items).toHaveLength(12);
    expect(second.items).toEqual([13, 14, 15, 16]);
    expect(first.totalPages).toBe(2);
    expect(first.total).toBe(16);
  });

  it("shows the last page when the requested page is past the end", () => {
    expect(paginate(items, 9, 12).page).toBe(2);
  });

  it("reports a single page for an empty list", () => {
    expect(paginate([], 1, 12)).toEqual({ items: [], page: 1, totalPages: 1, total: 0 });
  });
});

describe("filterProductsByVariants", () => {
  const products = [
    product("sneakers", [
      { color: "Black", size: "M" },
      { color: "white", size: "L" },
    ]),
    product("belt", [{ color: "brown", size: "S" }]),
  ];

  it("returns everything when no filter is selected", () => {
    expect(filterProductsByVariants(products, { colors: [], sizes: [] })).toBe(products);
  });

  it("keeps only the matching products and, inside them, the matching variants", () => {
    const result = filterProductsByVariants(products, { colors: ["white"], sizes: [] });

    expect(result.map((p) => p.name)).toEqual(["sneakers"]);
    expect(result[0].variants.map((v) => v.color)).toEqual(["white"]);
  });

  it("requires a single variant to match both the colour and the size", () => {
    expect(filterProductsByVariants(products, { colors: ["black"], sizes: ["l"] })).toEqual([]);
  });
});

describe("sortProducts", () => {
  const cheap = product("cheap", [{ price: 300 }]);
  const mid = product("mid", [{ price: 900, priceDiscount: 450 }]);
  const pricey = product("pricey", [{ price: 1500, priceDiscount: 1350 }]);
  const all = [mid, pricey, cheap];

  it("sorts by the price a shopper would pay, discount included", () => {
    expect(sortProducts(all, "price-low-to-high").map((p) => p.name)).toEqual([
      "cheap",
      "mid",
      "pricey",
    ]);
    expect(sortProducts(all, "price-high-to-low").map((p) => p.name)).toEqual([
      "pricey",
      "mid",
      "cheap",
    ]);
  });

  it("sorts by the biggest discount percentage", () => {
    expect(sortProducts(all, "discount").map((p) => p.name)).toEqual(["mid", "pricey", "cheap"]);
  });

  it("keeps the given order when no sort is selected and never mutates the input", () => {
    expect(sortProducts(all, "")).toEqual(all);
    sortProducts(all, "price-low-to-high");
    expect(all.map((p) => p.name)).toEqual(["mid", "pricey", "cheap"]);
  });
});
