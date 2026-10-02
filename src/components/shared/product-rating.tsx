import { Star } from "lucide-react";

import { getStarStates, type StarState } from "@/lib/utils/star-rating";
import { cn } from "@/lib/utils/tailwind-merge";

const STAR_CLASSES: Record<StarState, string> = {
  full: "fill-yellow-500 text-yellow-500",
  partial: "fill-none text-yellow-500 stroke-yellow-500 stroke-1",
  empty: "fill-none text-gray-300 stroke-gray-300 stroke-1",
};

export function displayProductRating(ratingAVG: number | undefined): React.ReactNode {
  return getStarStates(ratingAVG).map((state, position) => (
    // Stars are a fixed row that never reorders, so the position is a stable key.
    <Star key={position} aria-hidden="true" className={cn("w-4 h-4", STAR_CLASSES[state])} />
  ));
}
