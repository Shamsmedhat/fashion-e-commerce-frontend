"use server";

import { type ActionResult, runAction } from "../utils/action-result";
import { authedFetch } from "../utils/authed-fetch";

export async function addAddressAction(data: AddAddressRequest): Promise<ActionResult<MeResponse>> {
  return runAction(() =>
    authedFetch<MeResponse>("/users/me/addresses", { method: "POST", body: JSON.stringify(data) }),
  );
}
