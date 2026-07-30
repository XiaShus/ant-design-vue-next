import type { PanelSize } from './interface';

export function isPercent(size?: PanelSize): size is string {
  return typeof size === 'string' && size.trim().endsWith('%');
}

export function parseSizeToPx(
  size: PanelSize | undefined,
  containerSize: number,
): number | undefined {
  if (size === undefined || size === null || size === '') return undefined;
  if (isPercent(size)) {
    const n = Number.parseFloat(size);
    if (Number.isNaN(n)) return undefined;
    return (n / 100) * containerSize;
  }
  const n = Number(size);
  return Number.isNaN(n) ? undefined : n;
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
