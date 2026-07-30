import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import type { SizeType } from '../SizeContext';
import { useInjectSize } from '../SizeContext';
import { useInjectDisabled } from '../DisabledContext';

export interface UseConfigResult {
  /** Inherited `componentSize` from nearest ConfigProvider (antd ≥ 5.3). */
  componentSize: ComputedRef<SizeType>;
  /** Inherited `componentDisabled` from nearest ConfigProvider (antd ≥ 5.3). */
  componentDisabled: ComputedRef<boolean | undefined>;
}

/**
 * Read size / disabled from the nearest ConfigProvider.
 * Aligns with React `ConfigProvider.useConfig()` (antd ≥ 5.3.0).
 */
export function useConfig(): UseConfigResult {
  const size = useInjectSize();
  const disabled = useInjectDisabled();
  return {
    componentSize: computed(() => size.value),
    componentDisabled: computed(() => disabled.value),
  };
}

export default useConfig;
