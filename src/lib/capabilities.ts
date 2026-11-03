/**
 * Performance check utility to strictly uphold the performance rules:
 * If hardwareConcurrency <= 4, deviceMemory <= 4, screen is narrow with reduced motion,
 * or WebGL is unsupported/failing, we provide a smooth 2D fallback.
 */

export function canRunWebGL(): boolean {
  if (typeof window === "undefined") return false;

  try {
    // 1. Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }

    // 2. Hardware concurrency check
    const cores = navigator.hardwareConcurrency || 4;
    if (cores <= 4) {
      return false;
    }

    // 3. Device memory check (if supported by Chromium browsers)
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (memory !== undefined && memory <= 4) {
      return false;
    }

    // 4. Test WebGL context availability
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    if (!gl) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
