export function handleRateLimitError(response: Response) {
  if (response.status === 429) {
    const reset = response.headers.get("x-ratelimit-reset");

    let message = "Too many requests, please try again later.";

    if (reset) {
      const now = Math.floor(Date.now() / 1000);
      const remainingSeconds = Number(reset) - now;

      if (remainingSeconds > 0) {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        message = `Too many attempts,  please try again in ${minutes}m:${seconds}s`;
      }
    }

    throw new Error(message);
  }

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response;
}
