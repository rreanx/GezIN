import colors from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Returns the design tokens for the current resolved color scheme,
 * which respects the user's stored preference (system / light / dark)
 * via ThemeContext.
 */
export function useColors() {
  const { resolved } = useTheme();
  const palette = resolved === "dark" ? colors.dark : colors.light;
  return { ...palette, radius: colors.radius };
}
