import { JSON_HEADER } from "../constants/api.constant";
import { REVALIDATE_CATEGORY_STABLE_SECONDS } from "../constants/data-cache.constant";
import { AppError } from "../utils/app-errors";
import { buildQueryString } from "../utils/build-query-string";

type CategoriesFetchOptions = {
  extraTags?: string[];
};

export async function getCategoriesService(
  params?: QueryParams,
  options?: CategoriesFetchOptions,
): Promise<CategoriesResponse> {
  const queryString = buildQueryString(params);

  const url = new URL(`${process.env.API_URL}/categories`);

  if (queryString) {
    url.search = queryString;
  }

  const tags =
    options?.extraTags && options.extraTags.length > 0
      ? ["categories", ...options.extraTags]
      : ["categories"];

  const response = await fetch(url.toString(), {
    headers: {
      ...JSON_HEADER,
    },
    next: { revalidate: REVALIDATE_CATEGORY_STABLE_SECONDS, tags },
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

export async function getMainCategoriesService(): Promise<CategoriesResponse> {
  const response = await fetch(`${process.env.API_URL}/categories/main`, {
    headers: {
      ...JSON_HEADER,
    },
    next: {
      revalidate: REVALIDATE_CATEGORY_STABLE_SECONDS,
      tags: ["main-categories", "categories"],
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
    next: { revalidate: REVALIDATE_CATEGORY_STABLE_SECONDS, tags: ["categories"] },
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
