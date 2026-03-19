import { JSON_HEADER } from "../constants/api.constant";
import { buildQueryString } from "../utils/build-query-string";

// Get products
export async function getProductsService(params?: QueryParams): Promise<ProductsResponse> {
  // 1. Build the query string
  const queryString = buildQueryString(params);

  // Url
  const url = new URL(`${process.env.API_URL}/products`);

  if (queryString) {
    url.search = queryString;
  }

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products | ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

// Get product
export async function getProductByIdService(id: string): Promise<{
  status: string;
  data: {
    product: Product;
  };
}> {
  const url = new URL(`${process.env.API_URL}/products/${id}`);

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product | ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

// Get product variants
export async function getProductVariantsService(productId: string): Promise<{
  status: string;
  data: {
    variants: ProductVariant[];
  };
}> {
  // Url
  const url = `${process.env.API_URL}/products/${productId}/variants`;

  const response = await fetch(url, {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch variants | ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

// Get best selling
export async function getBestSellingProductsService(): Promise<ProductsResponse> {
  // Url
  const url = new URL(`${process.env.API_URL}/products/best-selling`);

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products | ${response.status} - ${response.statusText}`);
  }

  return response.json();
}
