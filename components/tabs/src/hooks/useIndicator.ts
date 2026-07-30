import type { CSSProperties, Ref } from 'vue';
import { computed, onBeforeUnmount, shallowRef, watch } from 'vue';
import raf from '../../../_util/raf';
import type { TabOffset } from '../interface';

export type GetIndicatorSize = number | ((origin: number) => number);

export type TabsIndicator = {
  size?: GetIndicatorSize;
  align?: 'start' | 'center' | 'end';
};

export default function useIndicator(options: {
  activeTabOffset: Ref<TabOffset | undefined>;
  horizontal: Ref<boolean>;
  rtl: Ref<boolean>;
  indicator?: Ref<TabsIndicator | undefined>;
}) {
  const { activeTabOffset, horizontal, rtl, indicator } = options;
  const inkStyle = shallowRef<CSSProperties>();
  let inkBarRafRef: number;

  const cleanInkBarRaf = () => {
    raf.cancel(inkBarRafRef);
  };

  const getLength = (origin: number) => {
    const size = indicator?.value?.size;
    if (typeof size === 'function') {
      return size(origin);
    }
    if (typeof size === 'number') {
      return size;
    }
    return origin;
  };

  watch(
    [activeTabOffset, horizontal, rtl, () => indicator?.value?.size, () => indicator?.value?.align],
    () => {
      const newInkStyle: CSSProperties = {};
      const offset = activeTabOffset.value;
      const align = indicator?.value?.align ?? 'center';

      if (offset) {
        if (horizontal.value) {
          newInkStyle.width = getLength(offset.width);
          const key = rtl.value ? 'right' : 'left';
          if (align === 'start') {
            newInkStyle[key] = offset[key];
          } else if (align === 'center') {
            newInkStyle[key] = offset[key] + offset.width / 2;
            newInkStyle.transform = rtl.value ? 'translateX(50%)' : 'translateX(-50%)';
          } else if (align === 'end') {
            newInkStyle[key] = offset[key] + offset.width;
            newInkStyle.transform = 'translateX(-100%)';
          }
        } else {
          newInkStyle.height = getLength(offset.height);
          if (align === 'start') {
            newInkStyle.top = offset.top;
          } else if (align === 'center') {
            newInkStyle.top = offset.top + offset.height / 2;
            newInkStyle.transform = 'translateY(-50%)';
          } else if (align === 'end') {
            newInkStyle.top = offset.top + offset.height;
            newInkStyle.transform = 'translateY(-100%)';
          }
        }
      }

      cleanInkBarRaf();
      inkBarRafRef = raf(() => {
        inkStyle.value = newInkStyle;
      });
    },
    { flush: 'post', immediate: true },
  );

  onBeforeUnmount(() => {
    cleanInkBarRaf();
  });

  return { style: computed(() => inkStyle.value) };
}
