import { AggregationColor } from './color';
import type { ColorGenInput } from './color';
import type { ColorValueType } from './interface';

export const generateColor = (color?: ColorGenInput | ColorValueType | null): AggregationColor => {
  if (color instanceof AggregationColor) {
    return color;
  }
  return new AggregationColor(color as ColorGenInput);
};

export const getRoundNumber = (value: number) => Math.round(Number(value || 0));

export const getColorAlpha = (color: AggregationColor) => getRoundNumber(color.toHsb().a * 100);
