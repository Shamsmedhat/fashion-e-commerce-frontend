import { Star } from "lucide-react";
import { cn } from "./tailwind-merge";

export function displayProductRating(ratingAVG: number): React.ReactNode {
  return [...Array(5)].map((_, i) => {
    const rating = ratingAVG || 0;
    const isFilled = i < Math.floor(rating);
    const isPartial = !isFilled && i < Math.ceil(rating);

    return (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          isFilled
            ? "fill-yellow-500 text-yellow-500"
            : isPartial
            ? "fill-none text-yellow-500 stroke-yellow-500 stroke-1"
            : "fill-none text-gray-300 stroke-gray-300 stroke-1"
        )}
      />
    );
  });
}