import { authedFetch } from "../utils/authed-fetch";

export async function getBagItemsService(): Promise<BagItemsResponse> {
  return authedFetch<BagItemsResponse>("/bags/me/items");
}

export async function getBagService(): Promise<BagResponse> {
  return authedFetch<BagResponse>("/bags/me");
}
