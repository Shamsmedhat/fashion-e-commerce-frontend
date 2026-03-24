import { AppError } from "../utils/app-errors";
import { JSON_HEADER } from "../constants/api.constant";
import { buildQueryString } from "../utils/build-query-string";

export async function getProductsService(params?: QueryParams): Promise<ProductsResponse> {
  const queryString = buildQueryString(params);

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
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  return response.json();
}

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
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  return response.json();
}

export async function getProductVariantsService(productId: string): Promise<{
  status: string;
  data: {
    variants: ProductVariant[];
  };
}> {
  const url = `${process.env.API_URL}/products/${productId}/variants`;

  const response = await fetch(url, {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  return response.json();
}

export async function getBestSellingProductsService(): Promise<ProductsResponse> {
  const url = new URL(`${process.env.API_URL}/products/best-selling`);

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  return response.json();
}
