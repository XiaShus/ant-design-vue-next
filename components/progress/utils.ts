import { presetPrimaryColors } from '@ant-design/colors';
import devWarning from '../vc-util/devWarning';
import type { CircleProps } from './Circle';
import type { ProgressProps, ProgressSize } from './props';

export function validProgress(progress: number | undefined) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}

export function getSuccessPercent({ success, successPercent }: ProgressProps) {
  let percent = successPercent;
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    devWarning(
      false,
      'Progress',
      '`success.progress` is deprecated. Please use `success.percent` instead.',
    );
    percent = success.progress;
  }
  if (success && 'percent' in success) {
    percent = success.percent;
  }
  return percent;
}

export function getPercentage({ percent, success, successPercent }: ProgressProps) {
  const realSuccessPercent = validProgress(getSuccessPercent({ success, successPercent }));
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
}

export function getStrokeColor({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<string, string>)[] {
  const { strokeColor: successColor } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null!];
}

function toWidthHeight(
  size: Exclude<ProgressSize, string | number | undefined>,
  defaultWidth: number,
  defaultHeight: number,
): [number, number] {
  if (Array.isArray(size)) {
    return [size[0] ?? defaultWidth, size[1] ?? defaultHeight];
  }
  return [size.width ?? defaultWidth, size.height ?? defaultHeight];
}

export const getSize = (
  size: ProgressProps['size'],
  type: ProgressProps['type'] | 'step',
  extra?: {
    steps?: number;
    strokeWidth?: number;
  },
): { width: number; height: number } => {
  let width = -1;
  let height = -1;
  if (type === 'step') {
    const steps = extra!.steps!;
    const strokeWidth = extra!.strokeWidth!;
    if (typeof size === 'string' || typeof size === 'undefined') {
      width = size === 'small' ? 2 : 14;
      height = strokeWidth ?? 8;
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width, height] = toWidthHeight(size, 14, 8);
    }
    width *= steps;
  } else if (type === 'line') {
    const strokeWidth = extra?.strokeWidth;
    if (typeof size === 'string' || typeof size === 'undefined') {
      height = strokeWidth || (size === 'small' ? 6 : 8);
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width, height] = toWidthHeight(size, -1, 8);
    }
  } else if (type === 'circle' || type === 'dashboard') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      [width, height] = size === 'small' ? [60, 60] : [120, 120];
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else if (Array.isArray(size)) {
      if (process.env.NODE_ENV !== 'production') {
        devWarning(
          false,
          'Progress',
          'Type "circle" and "dashboard" do not accept array as `size`, please use number or preset size instead.',
        );
      }
      width = size[0] ?? size[1] ?? 120;
      height = size[0] ?? size[1] ?? 120;
    } else if (size && typeof size === 'object') {
      if (process.env.NODE_ENV !== 'production') {
        devWarning(
          false,
          'Progress',
          'Type "circle" and "dashboard" do not accept object as `size`, please use number or preset size instead.',
        );
      }
      width = size.width ?? size.height ?? 120;
      height = size.width ?? size.height ?? 120;
    }
  }
  return { width, height };
};
