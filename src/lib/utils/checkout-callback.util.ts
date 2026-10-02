/**
 * Detects locale paths like `/en/checkout`, `/checkout`, or absolute URLs pointing at checkout.
 */
export function callbackUrlIncludesCheckout(callbackUrlParam: string | null): boolean {
  if (!callbackUrlParam || !callbackUrlParam.trim()) {
    return false;
  }

  try {
    const decoded = decodeURIComponent(callbackUrlParam.trim());
    let pathOnly = decoded.split("?")[0] ?? "";

    if (decoded.startsWith("http")) {
      pathOnly = new URL(decoded).pathname;
    }

    const segments = pathOnly.split("/").filter(Boolean);

    return segments.includes("checkout");
  } catch {
    return false;
  }
}
