export function lerp(v0: number, v1: number, t: number) {
  return v0 * (1 - t) + v1 * t;
}
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
