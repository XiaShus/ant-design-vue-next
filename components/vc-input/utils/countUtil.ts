import type { VueNode } from '../../_util/type';
import type { CountConfig, ShowCountProps } from '../inputProps';

export function resolveCountConfig(
  count?: CountConfig,
  showCount?: boolean | ShowCountProps,
): CountConfig | false {
  if (count) {
    return count;
  }
  if (showCount) {
    if (typeof showCount === 'object' && showCount) {
      return {
        show: (info: { value: string; count: number; maxLength?: number }) =>
          showCount.formatter({
            count: info.count,
            maxlength: info.maxLength,
            value: info.value,
          }),
      };
    }
    return { show: true };
  }
  return false;
}

export function getCountLength(value: string, strategy?: (value: string) => number) {
  if (strategy) {
    return strategy(value);
  }
  return [...value].length;
}

export function formatCountDisplay(
  config: CountConfig,
  value: string,
  count: number,
  maxLength?: number,
): VueNode {
  const { show, max } = config;
  if (typeof show === 'function') {
    return show({ value, count, maxLength: maxLength ?? max });
  }
  const limit = maxLength ?? max;
  return `${count}${limit != null ? ` / ${limit}` : ''}`;
}
