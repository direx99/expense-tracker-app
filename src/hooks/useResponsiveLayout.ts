import { useWindowDimensions } from "react-native";

export function useResponsiveLayout() {
  const { width } = useWindowDimensions();
  const isCompact = width < 375;
  const isTablet = width >= 768;

  return {
    contentPadding: isTablet ? 32 : isCompact ? 16 : 20,
    contentWidth: Math.min(width, 720),
    isCompact,
    isTablet,
  };
}
