import "server-only";

import { JSON_HEADER } from "../constants/api.constant";
import { AppError, type AppErrorType } from "./app-errors";
import { getAuthToken } from "./get-token";

const SESSION_EXPIRED_MESSAGE = "Your session has expired. Please log in again.";

function errorTypeFromStatus(status: number): AppErrorType {
  if (status === 401) return "authentication";
  if (status === 403) return "authorization";
  return "general";
}

// Calls the backend API on behalf of the logged-in shopper (server only: the API token never
// reaches the browser). Throws an AppError carrying the API's own message and status.
export async function authedFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = await getAuthToken();

  if (!token) {
    throw new AppError(SESSION_EXPIRED_MESSAGE, 401, "authentication");
  }

  const response = await fetch(`${process.env.API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({
      status: "error" as const,
      message: `Request failed with status ${response.status}`,
    }));

    throw new AppError(errorData.message, response.status, errorTypeFromStatus(response.status));
  }

  return response.json();
}
