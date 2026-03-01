export const THEMES = [
  {
    name: "zinc",
    label: "Zinc",
    color: "hsl(240 5.9% 10%)",
  },
  {
    name: "rose",
    label: "Rose",
    color: "hsl(346.8 77.2% 49.8%)",
  },
  {
    name: "blue",
    label: "Blue",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  {
    name: "green",
    label: "Green",
    color: "hsl(142.1 76.2% 36.3%)",
  },
  {
    name: "orange",
    label: "Orange",
    color: "hsl(24.6 95% 53.1%)",
  },
  {
    name: "violet",
    label: "Violet",
    color: "hsl(262.1 83.3% 57.8%)",
  },
  {
    name: "teal",
    label: "Teal",
    color: "hsl(172 66% 40%)",
  },
] as const;

export type ThemeName = (typeof THEMES)[number]["name"];

export const DEFAULT_THEME: ThemeName = "blue";
