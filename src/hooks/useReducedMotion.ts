import { AccessibilityInfo } from "react-native";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setShouldReduceMotion);
    const subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", setShouldReduceMotion);
    return () => subscription.remove();
  }, []);

  return shouldReduceMotion;
}
