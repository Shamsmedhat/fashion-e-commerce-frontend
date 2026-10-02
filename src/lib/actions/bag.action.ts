"use server";

import { type ActionResult, runAction } from "../utils/action-result";
import { authedFetch } from "../utils/authed-fetch";

type UpdatedBagItemResponse = {
  status: string;
  message: string;
  data: {
    item: BagItem;
  };
};

export async function addToBagAction(data: AddToBagRequest): Promise<ActionResult<BagResponse>> {
  return runAction(() =>
    authedFetch<BagResponse>("/users/bag/add", { method: "POST", body: JSON.stringify(data) }),
  );
}

export async function updateBagItemAction(
  itemId: string,
  data: UpdateBagItemRequest,
): Promise<ActionResult<UpdatedBagItemResponse>> {
  return runAction(() =>
    authedFetch<UpdatedBagItemResponse>(`/bags/me/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  );
}

export async function removeBagItemAction(itemId: string): Promise<ActionResult<BagResponse>> {
  return runAction(() =>
    authedFetch<BagResponse>(`/bags/me/items/${itemId}`, { method: "DELETE" }),
  );
}

export async function clearBagAction(): Promise<ActionResult<BagResponse>> {
  return runAction(() => authedFetch<BagResponse>("/bags/me", { method: "DELETE" }));
}
