export function buildQueryString(
  params?: QueryParams | URLSearchParams
): string {
  // If NO params
  if (!params) return "";

  // If it's already a URLSearchParams, return it as string
  if (params instanceof URLSearchParams) {
    return params.toString();
  }

  const searchParams = new URLSearchParams();

  // Build
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Handle array values (append each separately)
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  // Return query string
  return searchParams.toString();
}
