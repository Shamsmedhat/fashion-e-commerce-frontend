"use server";

import { JSON_HEADER } from "../constants/api.constant";
import { AppError } from "../utils/app-errors";
import { getAuthToken } from "../utils/get-token";

export async function createCardCheckoutSessionAction(
  data: CreateCardCheckoutSessionRequest,
): Promise<CreateCardCheckoutSessionResponse> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/checkout/card-session`, {
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
    throw new AppError(
      errorData.message,
      response.status,
      response.status === 401 || response.status === 403 ? "authentication" : "general",
    );
  }

  return response.json();
}

export async function createCashOrderAction(): Promise<CreateCashOrderResponse> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError("Unauthorized", 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}/checkout/cash`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));
    throw new AppError(
      errorData.message,
      response.status,
      response.status === 401 || response.status === 403 ? "authentication" : "general",
    );
  }

  return response.json();
}
