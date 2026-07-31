import type { PropType, ExtractPropTypes, CSSProperties, Plugin, App } from 'vue';
import { defineComponent, computed, ref, watch, Fragment } from 'vue';
import PropTypes from '../_util/vue-types';
import { filterEmpty } from '../_util/props-util';
import type { SizeType } from '../config-provider';
import type { CustomSlotsType, VueNode } from '../_util/type';
import { booleanType, objectType, someType, tuple } from '../_util/type';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import useFlexGapSupport from '../_util/hooks/useFlexGapSupport';
import classNames from '../_util/classNames';
import Compact from './Compact';

import useStyle from './style';

export type SpaceSize = SizeType | number;
export type SpaceOrientation = 'horizontal' | 'vertical';
export type SpaceSemanticName = 'root' | 'item' | 'separator';
export type SpaceClassNamesType = Partial<Record<SpaceSemanticName, string>>;
export type SpaceStylesType = Partial<Record<SpaceSemanticName, CSSProperties>>;
const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};
export const spaceProps = () => ({
  prefixCls: String,
  size: {
    type: [String, Number, Array] as PropType<SpaceSize | [SpaceSize, SpaceSize]>,
  },
  direction: PropTypes.oneOf(tuple('horizontal', 'vertical')).def('horizontal'),
  /** The space direction (preferred alias of direction) */
  orientation: PropTypes.oneOf(tuple('horizontal', 'vertical')),
  /** Syntactic sugar for `orientation="vertical"` */
  vertical: booleanType(),
  align: PropTypes.oneOf(tuple('start', 'end', 'center', 'baseline')),
  wrap: booleanType(),
  split: someType<VueNode>([Object, String, Number, Boolean]),
  /** Set separator between items (preferred alias of split) */
  separator: someType<VueNode>([Object, String, Number, Boolean]),
  /** Semantic structure className (antd ≥ 5.x). */
  classNames: objectType<SpaceClassNamesType>(),
  /** Semantic structure style (antd ≥ 5.x). */
  styles: objectType<SpaceStylesType>(),
});

export type SpaceProps = Partial<ExtractPropTypes<ReturnType<typeof spaceProps>>>;

function getNumberSize(size: SpaceSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASpace',
  inheritAttrs: false,
  props: spaceProps(),
  slots: Object as CustomSlotsType<{
    split?: any;
    separator?: any;
    default?: any;
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, space, direction: directionConfig } = useConfigInject('space', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const supportFlexGap = useFlexGapSupport();
    const size = computed(() => props.size ?? space?.value?.size ?? 'small');
    const horizontalSize = ref<number>();
    const verticalSize = ref<number>();
    watch(
      size,
      () => {
        [horizontalSize.value, verticalSize.value] = (
          (Array.isArray(size.value) ? size.value : [size.value, size.value]) as [
            SpaceSize,
            SpaceSize,
          ]
        ).map(item => getNumberSize(item));
      },
      { immediate: true },
    );

    const mergedOrientation = computed((): SpaceOrientation => {
      if (props.orientation === 'vertical' || props.orientation === 'horizontal') {
        return props.orientation;
      }
      if (props.vertical) {
        return 'vertical';
      }
      return props.direction === 'vertical' ? 'vertical' : 'horizontal';
    });

    const mergedAlign = computed(() =>
      props.align === undefined && mergedOrientation.value === 'horizontal'
        ? 'center'
        : props.align,
    );
    const cn = computed(() => {
      return classNames(
        prefixCls.value,
        hashId.value,
        `${prefixCls.value}-${mergedOrientation.value}`,
        {
          [`${prefixCls.value}-rtl`]: directionConfig.value === 'rtl',
          [`${prefixCls.value}-align-${mergedAlign.value}`]: mergedAlign.value,
        },
        props.classNames?.root,
      );
    });

    const marginDirection = computed(() =>
      directionConfig.value === 'rtl' ? 'marginLeft' : 'marginRight',
    );
    const style = computed(() => {
      const gapStyle: CSSProperties = {};
      if (supportFlexGap.value) {
        gapStyle.columnGap = `${horizontalSize.value}px`;
        gapStyle.rowGap = `${verticalSize.value}px`;
      }
      return {
        ...gapStyle,
        ...(props.wrap && { flexWrap: 'wrap', marginBottom: `${-verticalSize.value}px` }),
        ...props.styles?.root,
      } as CSSProperties;
    });
    return () => {
      const { wrap, classNames: semanticClassNames, styles: semanticStyles } = props;
      const direction = mergedOrientation.value;
      const children = slots.default?.();
      const items = filterEmpty(children);
      const len = items.length;

      if (len === 0) {
        return null;
      }
      const split = props.separator ?? props.split ?? slots.separator?.() ?? slots.split?.();
      const itemClassName = `${prefixCls.value}-item`;
      const horizontalSizeVal = horizontalSize.value;
      const latestIndex = len - 1;
      return (
        <div
          {...attrs}
          class={[cn.value, attrs.class]}
          style={[style.value, attrs.style as CSSProperties]}
        >
          {items.map((child, index) => {
            let originIndex = children.indexOf(child);
            if (originIndex === -1) {
              originIndex = `$$space-${index}`;
            }
            let itemStyle: CSSProperties = {};
            if (!supportFlexGap.value) {
              if (direction === 'vertical') {
                if (index < latestIndex) {
                  itemStyle = { marginBottom: `${horizontalSizeVal / (split ? 2 : 1)}px` };
                }
              } else {
                itemStyle = {
                  ...(index < latestIndex && {
                    [marginDirection.value]: `${horizontalSizeVal / (split ? 2 : 1)}px`,
                  }),
                  ...(wrap && { paddingBottom: `${verticalSize.value}px` }),
                };
              }
            }

            return wrapSSR(
              <Fragment key={originIndex}>
                <div
                  class={classNames(itemClassName, semanticClassNames?.item)}
                  style={{ ...itemStyle, ...semanticStyles?.item }}
                >
                  {child}
                </div>
                {index < latestIndex && split && (
                  <span
                    class={classNames(`${itemClassName}-split`, semanticClassNames?.separator)}
                    style={{ ...itemStyle, ...semanticStyles?.separator }}
                  >
                    {split}
                  </span>
                )}
              </Fragment>,
            );
          })}
        </div>
      );
    };
  },
});

Space.Compact = Compact;

Space.install = function (app: App) {
  app.component(Space.name, Space);
  app.component(Compact.name, Compact);
  return app;
};

export { Compact };

export default Space as typeof Space &
  Plugin & {
    readonly Compact: typeof Compact;
  };
