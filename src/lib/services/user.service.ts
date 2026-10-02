import { authedFetch } from "../utils/authed-fetch";

// The session cookie only holds the profile as it was at login; anything that can change
// afterwards (such as saved addresses) is read from the API.
export async function getMeService(): Promise<MeResponse> {
  return authedFetch<MeResponse>("/users/me");
}
