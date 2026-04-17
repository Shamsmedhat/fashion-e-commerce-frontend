"use server";

import { JSON_HEADER } from "../constants/api.constant";
import { AppError } from "../utils/app-errors";
import { getAuthToken } from "../utils/get-token";

export async function addToBagAction(data: AddToBagRequest): Promise<BagResponse> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/users/bag/add`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export async function updateBagItemAction(
  itemId: string,
  data: UpdateBagItemRequest,
): Promise<{
  status: string;
  message: string;
  data: {
    item: BagItem;
  };
}> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/bags/me/items/${itemId}`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export async function removeBagItemAction(itemId: string): Promise<BagResponse> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/bags/me/items/${itemId}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
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

export async function clearBagAction(): Promise<BagResponse> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/bags/me`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
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
