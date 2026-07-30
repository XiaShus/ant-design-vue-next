import type { InjectionKey, Ref } from 'vue';
import { computed, inject, ref, provide } from 'vue';

/** Align with antd ≥ 5.13 / ConfigProvider ≥ 5.19 (`underlined` deferred). */
export type VariantType = 'outlined' | 'borderless' | 'filled' | 'underlined' | undefined;

const VariantContextKey: InjectionKey<Ref<VariantType>> = Symbol('VariantContextKey');

export const useInjectVariant = () => {
  return inject(VariantContextKey, ref<VariantType>(undefined));
};

export const useProviderVariant = (variant: Ref<VariantType>) => {
  const parentVariant = useInjectVariant();
  provide(
    VariantContextKey,
    computed(() => variant.value ?? parentVariant.value),
  );
  return variant;
};
