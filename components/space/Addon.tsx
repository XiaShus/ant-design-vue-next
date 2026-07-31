import { computed, defineComponent } from 'vue';
import type { ExtractPropTypes } from 'vue';
import classNames from '../_util/classNames';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import { useCompactItemContext } from './Compact';
import useStyle from './style/addon';

export const spaceAddonProps = () => ({
  prefixCls: String,
});

export type SpaceAddonProps = Partial<ExtractPropTypes<ReturnType<typeof spaceAddonProps>>>;

const Addon = defineComponent({
  name: 'ASpaceAddon',
  inheritAttrs: false,
  props: spaceAddonProps(),
  setup(props, { attrs, slots }) {
    const { prefixCls, direction: directionConfig } = useConfigInject('space-addon', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const { compactItemClassnames, compactSize } = useCompactItemContext(
      prefixCls,
      directionConfig,
    );

    const classes = computed(() =>
      classNames(
        prefixCls.value,
        hashId.value,
        compactItemClassnames.value,
        {
          [`${prefixCls.value}-${compactSize.value}`]: compactSize.value,
        },
        attrs.class,
      ),
    );

    return () =>
      wrapSSR(
        <div {...attrs} class={classes.value}>
          {slots.default?.()}
        </div>,
      );
  },
});

export default Addon;
