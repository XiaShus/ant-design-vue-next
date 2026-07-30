import type { ExtractPropTypes } from 'vue';
import { computed, defineComponent } from 'vue';
import type { VueNode } from '../_util/type';
import { someType } from '../_util/type';
import type { ProgressSize } from './props';
import { progressProps } from './props';
import { getSize } from './utils';

export const stepsProps = () => ({
  ...progressProps(),
  steps: Number,
  /** Gap between step items in px (from `steps.gap`) */
  stepGap: Number,
  strokeColor: someType<string | string[]>(),
  trailColor: String,
});

export type StepsProps = Partial<ExtractPropTypes<ReturnType<typeof stepsProps>>>;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Steps',
  props: stepsProps(),
  setup(props, { slots }) {
    const current = computed(() => Math.round((props.steps || 0) * ((props.percent || 0) / 100)));
    const mergedSize = computed(
      () => props.size ?? [props.size === 'small' ? 2 : 14, props.strokeWidth || 8],
    );
    const sizeRef = computed(() =>
      getSize(mergedSize.value as ProgressSize, 'step', {
        steps: props.steps,
        strokeWidth: props.strokeWidth || 8,
      }),
    );

    const styledSteps = computed(() => {
      const { steps = 0, strokeColor, trailColor, prefixCls, stepGap } = props;

      const temp: VueNode[] = [];
      for (let i = 0; i < steps; i += 1) {
        const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
        const cls = {
          [`${prefixCls}-steps-item`]: true,
          [`${prefixCls}-steps-item-active`]: i <= current.value - 1,
        };
        temp.push(
          <div
            key={i}
            class={cls}
            style={{
              backgroundColor: i <= current.value - 1 ? color : trailColor,
              width: `${sizeRef.value.width / steps}px`,
              height: `${sizeRef.value.height}px`,
              ...(stepGap !== undefined && i < steps - 1
                ? { marginInlineEnd: `${stepGap}px` }
                : null),
            }}
          />,
        );
      }
      return temp;
    });

    return () => (
      <div class={`${props.prefixCls}-steps-outer`}>
        {styledSteps.value}
        {slots.default?.()}
      </div>
    );
  },
});
