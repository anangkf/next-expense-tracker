/**
 * A curated list of 12 aesthetically pleasing pastel colors.
 * The palette is designed to be visually distinct and harmonious.
 */
const PREDEFINED_PASTEL_PALETTE = [
  "oklch(0.75 0.2 40)", // 1. Pastel Red
  "oklch(0.8 0.2 80)", // 2. Pastel Orange
  "oklch(0.85 0.2 110)", // 3. Pastel Yellow
  "oklch(0.8 0.2 135)", // 4. Pastel Lime Green
  "oklch(0.75 0.2 150)", // 5. Pastel Green
  "oklch(0.8 0.2 185)", // 6. Pastel Cyan
  "oklch(0.75 0.2 220)", // 7. Pastel Light Blue
  "oklch(0.7 0.2 255)", // 8. Pastel Blue
  "oklch(0.7 0.2 280)", // 9. Pastel Indigo
  "oklch(0.75 0.2 310)", // 10. Pastel Violet
  "oklch(0.75 0.2 340)", // 11. Pastel Magenta
  "oklch(0.75 0.2 15)", // 12. Pastel Rose
];

/**
 * Generates a color scheme with a gradient from a starting hue to an ending hue.
 * The default gradient is from red to green.
 *
 * @param count The number of colors to generate.
 * @returns An array of color strings in oklch format.
 */
export const generateColorScheme = (count: number): string[] => {
  if (count <= 0) {
    return [];
  }

  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    // Loop through the palette if the count is larger than the palette size
    colors.push(
      PREDEFINED_PASTEL_PALETTE[i % PREDEFINED_PASTEL_PALETTE.length],
    );
  }

  return colors;
};
