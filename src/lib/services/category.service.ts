import { JSON_HEADER } from "../constants/api.constant";
import { buildQueryString } from "../utils/build-query-string";

export async function getMainCategoriesService(
  params?: QueryParams
): Promise<CategoriesResponse> {
  // 1. Build the query string
  const queryString = buildQueryString(params);

  // Url
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
    throw new Error(
      `Failed to fetch main categories | ${response.status} - ${response.statusText}`
    );
  }

  return response.json();
}
