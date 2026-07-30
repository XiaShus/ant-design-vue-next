import type { Ref, InjectionKey, ComputedRef } from 'vue';
import type { AnchorDirection } from './Anchor';
import { computed, inject, provide } from 'vue';

export interface AnchorContext {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: Ref<string>;
  scrollTo: (link: string) => void;
  handleClick: (e: Event, info: { title: any; href: string }) => void;
  direction: ComputedRef<AnchorDirection>;
  /** Replace href in history instead of pushing (antd ≥ 5.7). */
  replace: ComputedRef<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function noop(..._any: any[]): any {}

export const AnchorContextKey: InjectionKey<AnchorContext> = Symbol('anchorContextKey');

const useProvideAnchor = (state: AnchorContext) => {
  provide(AnchorContextKey, state);
};

const useInjectAnchor = () => {
  return inject(AnchorContextKey, {
    registerLink: noop,
    unregisterLink: noop,
    scrollTo: noop,
    activeLink: computed(() => ''),
    handleClick: noop,
    direction: computed(() => 'vertical'),
    replace: computed(() => false),
  } as AnchorContext);
};

export { useInjectAnchor, useProvideAnchor };
export default useProvideAnchor;
