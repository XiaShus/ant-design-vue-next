import { computed, type ComputedRef } from 'vue';
import type { VariantType } from '../VariantContext';
import { useInjectVariant } from '../VariantContext';

export type ResolvedVariant = Exclude<VariantType, undefined>;

/**
 * Resolve component variant (antd ≥ 5.13).
 * Priority: `variant` prop > `bordered={false}` → borderless > ConfigProvider.variant > outlined.
 */
export default function useVariant(props: {
  variant?: VariantType;
  bordered?: boolean;
}): ComputedRef<ResolvedVariant> {
  const contextVariant = useInjectVariant();
  return computed(() => {
    if (props.variant) {
      return props.variant;
    }
    if (props.bordered === false) {
      return 'borderless';
    }
    return contextVariant.value || 'outlined';
  });
}
