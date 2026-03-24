import { AppError } from "../utils/app-errors";
import { JSON_HEADER } from "../constants/api.constant";
import { buildQueryString } from "../utils/build-query-string";

export async function getCategoriesService(params?: QueryParams): Promise<CategoriesResponse> {
  const queryString = buildQueryString(params);

  const url = new URL(`${process.env.API_URL}/categories`);

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

export async function getMainCategoriesService(params?: QueryParams): Promise<CategoriesResponse> {
  const queryString = buildQueryString(params);

  const url = new URL(`${process.env.API_URL}/categories/main`);

  if (queryString) {
    url.search = queryString;
  }

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
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

export async function getSubCategoriesService(id: string): Promise<CategoriesResponse> {
  const url = `${process.env.API_URL}/categories/children/${id}`;

  const response = await fetch(url, {
    headers: {
      ...JSON_HEADER,
    },
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
