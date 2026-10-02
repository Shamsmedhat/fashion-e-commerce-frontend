"use server";

import { revalidateTag } from "next/cache";

import { type ActionResult, runAction } from "../utils/action-result";
import { authedFetch } from "../utils/authed-fetch";

export async function createCardCheckoutSessionAction(
  data: CreateCardCheckoutSessionRequest,
): Promise<ActionResult<CreateCardCheckoutSessionResponse>> {
  return runAction(() =>
    authedFetch<CreateCardCheckoutSessionResponse>("/checkout/card-session", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  );
}

export async function createCashOrderAction(): Promise<ActionResult<CreateCashOrderResponse>> {
  const result = await runAction(() =>
    authedFetch<CreateCashOrderResponse>("/checkout/cash", {
      method: "POST",
      body: JSON.stringify({}),
    }),
  );

  // The order took items out of stock. Product data is cached for weeks, so the cached copies
  // are dropped now; otherwise the shop would keep offering stock that is gone.
  if (result.ok) revalidateTag("products");

  return result;
}
