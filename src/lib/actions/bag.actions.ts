"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "../constants/api.constant";
import { getAuthToken } from "../utils/get-token";

// Add item to bag
export async function addToBagAction(
  data: AddToBagRequest,
): Promise<BagResponse | { message: string; code: number }> {
  // Token
  const token = await getAuthToken();

  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/users/bag/add`, {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Failed to add item to bag | ${response.status}`,
      }));
      return {
        message: error.message || "Failed to add item to bag",
        code: response.status,
      };
    }

    revalidateTag("bag");
    return response.json();
  } catch (error) {
    console.error(error);

    return {
      message: "Error during add item to bag, try again later.",
      code: 500,
    };
  }
}

// Update bag item quantity and/or variant
export async function updateBagItemAction(
  itemId: string,
  data: UpdateBagItemRequest,
): Promise<
  | {
      status: string;
      message: string;
      data: {
        item: BagItem;
      };
    }
  | { message: string; code: number }
> {
  const token = await getAuthToken();

  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/bags/me/items/${itemId}`, {
      method: "PATCH",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Failed to update bag item | ${response.status}`,
      }));
      return {
        message: error.message || "Failed to update bag item",
        code: response.status,
      };
    }

    revalidateTag("bag");

    return response.json();
  } catch (error) {
    console.error(error);

    return {
      message: "Error during updating the item, try again later",
      code: 500,
    };
  }
}

// Remove item from bag
export async function removeBagItemAction(
  itemId: string,
): Promise<BagResponse | { message: string; code: number }> {
  const token = await getAuthToken();

  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/bags/me/items/${itemId}`, {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Failed to remove bag item | ${response.status}`,
      }));
      return {
        message: error.message || "Failed to remove bag item",
        code: response.status,
      };
    }

    revalidateTag("bag");

    return response.json();
  } catch (error) {
    console.error(error);

    return {
      message: "Error during remove item from bag, try again later",
      code: 500,
    };
  }
}

// Clear all bag items
export async function clearBagAction(): Promise<BagResponse | { message: string; code: number }> {
  const token = await getAuthToken();

  if (!token) {
    return { message: "Unauthorized", code: 401 };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/bags/me`, {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Failed to clear bag | ${response.status}`,
      }));
      return {
        message: error.message || "Failed to clear bag",
        code: response.status,
      };
    }

    revalidateTag("bag");

    return response.json();
  } catch (error) {
    console.log(error);

    return {
      message: "Error during clear the bag, try again later",
      code: 500,
    };
  }
}
