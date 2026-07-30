import { TinyColor } from '@ctrl/tinycolor';

export type ColorGenInput =
  | string
  | TinyColor
  | AggregationColor
  | { r: number; g: number; b: number; a?: number }
  | { h: number; s: number; b: number; a?: number }
  | { h: number; s: number; v: number; a?: number };

/**
 * Color value wrapper aligned with antd AggregationColor / Color API.
 * Backed by `@ctrl/tinycolor` (already used across ant-design-vue).
 */
export class AggregationColor {
  /** TinyColor instance (not private: Vue UnwrapRef strips `private` fields from class types). */
  metaColor: TinyColor;

  /** Marks a cleared / empty color (allowClear). */
  cleared = false;

  constructor(color?: ColorGenInput | null) {
    if (color instanceof AggregationColor) {
      this.metaColor = color.metaColor.clone();
      this.cleared = color.cleared;
      return;
    }
    if (color == null || color === '') {
      this.metaColor = new TinyColor('#000000').setAlpha(0);
      this.cleared = true;
      return;
    }
    if (
      typeof color === 'object' &&
      'b' in color &&
      !('v' in color) &&
      'h' in color &&
      's' in color
    ) {
      // antd uses HSB; TinyColor uses HSV — same channels for this purpose
      const { h, s, b, a = 1 } = color as { h: number; s: number; b: number; a?: number };
      this.metaColor = new TinyColor({ h, s, v: b, a });
      return;
    }
    this.metaColor = new TinyColor(color as any);
  }

  clone() {
    return new AggregationColor(this);
  }

  toHsb() {
    const { h, s, v, a } = this.metaColor.toHsv();
    return { h, s, b: v, a };
  }

  toHsbString() {
    const { h, s, b, a } = this.toHsb();
    const hh = Math.round(h);
    const ss = Math.round(s * 100);
    const bb = Math.round(b * 100);
    if (a < 1) {
      return `hsba(${hh}, ${ss}%, ${bb}%, ${Number(a.toFixed(2))})`;
    }
    return `hsb(${hh}, ${ss}%, ${bb}%)`;
  }

  toHex() {
    return this.toHexString().replace(/^#/, '');
  }

  toHexString() {
    return this.metaColor.getAlpha() < 1
      ? this.metaColor.toHex8String()
      : this.metaColor.toHexString();
  }

  toRgb() {
    return this.metaColor.toRgb();
  }

  toRgbString() {
    return this.metaColor.toRgbString();
  }

  toCssString() {
    return this.toRgbString();
  }

  equals(color: AggregationColor | null) {
    if (!color) return false;
    return this.toHexString() === color.toHexString() && this.cleared === color.cleared;
  }

  /** @internal */
  getTinyColor() {
    return this.metaColor;
  }
}

export type Color = AggregationColor;
