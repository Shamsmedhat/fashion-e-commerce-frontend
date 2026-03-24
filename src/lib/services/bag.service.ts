import { AppError } from "../utils/app-errors";
import { JSON_HEADER } from "../constants/api.constant";
import { getAuthToken } from "../utils/get-token";

export async function getBagItemsService(): Promise<BagItemsResponse> {
  const url = `${process.env.API_URL}/bags/me/items`;

  const token = await getAuthToken();

  const headers: HeadersInit = {
    ...JSON_HEADER,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    headers,
    cache: "no-store",
    next: {
      tags: ["bag"],
    },
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
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

  const response = await fetch(url, {
    headers,
    cache: "no-store",
    next: {
      tags: ["bag-data"],
    },
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(errorData.message, response.status);
  }

  const data = await response.json();
  return data;
}
