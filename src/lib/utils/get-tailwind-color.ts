import colors from "tailwindcss/colors";

type TailwindColorShades = {
  [shade: number]: string;
  DEFAULT?: string;
};

type TailwindColors = {
  [key: string]: string | TailwindColorShades;
};

export function getTailwindColor(name: string, shade = 300) {
  // Tailwind colors like red, blue, green are objects with shades
  const color = (colors as unknown as TailwindColors)[name];

  if (!color) return undefined;

  // if color is a string (like black/white), return it
  if (typeof color === "string") return color;

  // otherwise pick the shade
  return color[shade] || color.DEFAULT;
}
