import { flattenChildren } from '../_util/props-util';
import type { ExtractPropTypes, PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { booleanType, stringType, withInstall } from '../_util/type';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import useStyle from './style';

export type DividerVariant = 'dashed' | 'dotted' | 'solid';
export type DividerSize = 'small' | 'middle' | 'medium' | 'large';

export const dividerProps = () => ({
  prefixCls: String,
  type: {
    type: String as PropType<'horizontal' | 'vertical' | ''>,
    default: 'horizontal',
  },
  /** @deprecated Please use `variant="dashed"` instead. */
  dashed: booleanType(false),
  /** Line style (antd ≥ 5.20). */
  variant: stringType<DividerVariant>(),
  /** Horizontal spacing size (antd ≥ 5.25). */
  size: stringType<DividerSize>(),
  orientation: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
  },
  plain: booleanType(false),
  orientationMargin: [String, Number],
});
export type DividerProps = Partial<ExtractPropTypes<ReturnType<typeof dividerProps>>>;

const Divider = defineComponent({
  name: 'ADivider',
  inheritAttrs: false,
  compatConfig: { MODE: 3 },
  props: dividerProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls: prefixClsRef, direction } = useConfigInject('divider', props);
    const [wrapSSR, hashId] = useStyle(prefixClsRef);
    const hasCustomMarginLeft = computed(
      () => props.orientation === 'left' && props.orientationMargin != null,
    );
    const hasCustomMarginRight = computed(
      () => props.orientation === 'right' && props.orientationMargin != null,
    );
    const mergedVariant = computed<DividerVariant>(() => {
      if (props.variant) {
        return props.variant;
      }
      return props.dashed ? 'dashed' : 'solid';
    });
    const sizeClass = computed(() => {
      const { size } = props;
      if (size === 'small') {
        return 'sm';
      }
      if (size === 'large') {
        return 'lg';
      }
      if (size === 'middle' || size === 'medium') {
        return 'md';
      }
      return null;
    });
    const classString = computed(() => {
      const { type, plain } = props;
      const prefixCls = prefixClsRef.value;
      const variant = mergedVariant.value;
      return {
        [prefixCls]: true,
        [hashId.value]: !!hashId.value,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-dashed`]: variant === 'dashed',
        [`${prefixCls}-dotted`]: variant === 'dotted',
        [`${prefixCls}-plain`]: !!plain,
        [`${prefixCls}-rtl`]: direction.value === 'rtl',
        [`${prefixCls}-${sizeClass.value}`]: !!sizeClass.value && type !== 'vertical',
        [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft.value,
        [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight.value,
      };
    });
    const innerStyle = computed(() => {
      const marginValue =
        typeof props.orientationMargin === 'number'
          ? `${props.orientationMargin}px`
          : props.orientationMargin;
      return {
        ...(hasCustomMarginLeft.value && { marginLeft: marginValue }),
        ...(hasCustomMarginRight.value && { marginRight: marginValue }),
      };
    });
    const orientationPrefix = computed(() =>
      props.orientation.length > 0 ? '-' + props.orientation : props.orientation,
    );

    return () => {
      const children = flattenChildren(slots.default?.());
      return wrapSSR(
        <div
          {...attrs}
          class={[
            classString.value,
            children.length
              ? `${prefixClsRef.value}-with-text ${prefixClsRef.value}-with-text${orientationPrefix.value}`
              : '',
            attrs.class,
          ]}
          role="separator"
        >
          {children.length ? (
            <span class={`${prefixClsRef.value}-inner-text`} style={innerStyle.value}>
              {children}
            </span>
          ) : null}
        </div>,
      );
    };
  },
});

export default withInstall(Divider);
