import type { CSSProperties, ExtractPropTypes } from 'vue';
import { computed, defineComponent } from 'vue';
import classNames from '../_util/classNames';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { booleanType } from '../_util/type';
import type { CustomSlotsType } from '../_util/type';
import useStyle from './style';

export const skeletonNodeProps = () => ({
  prefixCls: String,
  /** Show animation effect */
  active: booleanType(),
});

export type SkeletonNodeProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonNodeProps>>>;

const SkeletonNode = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeletonNode',
  inheritAttrs: false,
  props: skeletonNodeProps(),
  slots: Object as CustomSlotsType<{
    default: any;
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('skeleton', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const cls = computed(() =>
      classNames(
        prefixCls.value,
        `${prefixCls.value}-element`,
        {
          [`${prefixCls.value}-active`]: props.active,
        },
        hashId.value,
        attrs.class,
      ),
    );
    return () => {
      // Reuse image element styles (antd 5.x Skeleton.Node).
      return wrapSSR(
        <div class={cls.value}>
          <div class={`${prefixCls.value}-image`} style={attrs.style as CSSProperties}>
            {slots.default?.()}
          </div>
        </div>,
      );
    };
  },
});

export default SkeletonNode;
