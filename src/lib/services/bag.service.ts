import { JSON_HEADER } from "../constants/api.constant";
import { getAuthToken } from "../utils/get-token";

export async function getBagItemsService(): Promise<BagItemsResponse> {
  const url = `${process.env.API_URL}/bags/me/items`;

  const token = await getAuthToken();

  const headers: HeadersInit = {
    ...JSON_HEADER,
    Authorization: `Bearer ${token}`,
  };

  // Pass cookies from the request if provided

  const response = await fetch(url, {
    headers,
    cache: "no-store",
    next: {
      tags: ["bag"],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bag items | ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function getBagService(): Promise<BagResponse> {
  const url = `${process.env.API_URL}/bags/me`;

  const token = await getAuthToken();

  const headers: HeadersInit = {
    ...JSON_HEADER,
    Authorization: `Bearer ${token}`,
  };

  // Pass cookies from the request if provided

  const response = await fetch(url, {
    headers,
    cache: "no-store",
    next: {
      tags: ["bag-data"],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bag items | ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
