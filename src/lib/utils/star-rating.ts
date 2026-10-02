export type StarState = "full" | "partial" | "empty";

// The state of each star for an average rating, e.g. 3.5 -> full, full, full, partial, empty.
export function getStarStates(rating: number | undefined, total = 5): StarState[] {
  const value = Math.min(Math.max(rating || 0, 0), total);

  return Array.from({ length: total }, (_, index) => {
    if (index < Math.floor(value)) return "full";
    if (index < Math.ceil(value)) return "partial";
    return "empty";
  });
}
