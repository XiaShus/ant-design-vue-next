import { cloneElement } from '../_util/vnode';
import type { AvatarSize } from './Avatar';
import Avatar from './Avatar';
import Popover from '../popover';
import type { PopoverProps } from '../popover';
import type { PropType, ExtractPropTypes, CSSProperties } from 'vue';
import { computed, defineComponent, watchEffect } from 'vue';
import { flattenChildren, getPropsSlot } from '../_util/props-util';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import useStyle from './style';
import { useAvatarProviderContext } from './AvatarContext';
import { objectType } from '../_util/type';

/** Max display config (antd ≥ 5.18). */
export type AvatarGroupMax = {
  count?: number;
  style?: CSSProperties;
  popover?: PopoverProps;
};

export const groupProps = () => ({
  prefixCls: String,
  /** @deprecated Please use `max={{ count: number }}` */
  maxCount: Number,
  /** @deprecated Please use `max={{ style: CSSProperties }}` */
  maxStyle: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
  /** @deprecated Please use `max={{ popover: PopoverProps }}` */
  maxPopoverPlacement: { type: String as PropType<'top' | 'bottom'>, default: 'top' },
  /** @deprecated Please use `max={{ popover: PopoverProps }}` */
  maxPopoverTrigger: String as PropType<'hover' | 'focus' | 'click'>,
  /** Max display config (antd ≥ 5.18). */
  max: objectType<AvatarGroupMax>(),
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size: {
    type: [Number, String, Object] as PropType<AvatarSize>,
    default: 'default' as AvatarSize,
  },
  shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
});

export type AvatarGroupProps = Partial<ExtractPropTypes<ReturnType<typeof groupProps>>>;

const Group = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAvatarGroup',
  inheritAttrs: false,
  props: groupProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('avatar', props);
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    watchEffect(() => {
      const context = { size: props.size, shape: props.shape };
      useAvatarProviderContext(context);
    });
    return () => {
      const {
        maxCount,
        maxStyle,
        maxPopoverPlacement = 'top',
        maxPopoverTrigger = 'hover',
        shape,
        max,
      } = props;

      const cls = {
        [groupPrefixCls.value]: true,
        [`${groupPrefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${attrs.class}`]: !!attrs.class,
        [hashId.value]: true,
      };

      const children = getPropsSlot(slots, props);
      const childrenWithProps = flattenChildren(children).map((child, index) =>
        cloneElement(child, {
          key: `avatar-key-${index}`,
        }),
      );

      const mergeCount = max?.count ?? maxCount;
      const numOfChildren = childrenWithProps.length;
      if (mergeCount && mergeCount < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, mergeCount);
        const childrenHidden = childrenWithProps.slice(mergeCount, numOfChildren);

        const mergeStyle = max?.style ?? maxStyle;
        const mergePopoverTrigger = max?.popover?.trigger ?? maxPopoverTrigger;
        const mergePopoverPlacement = max?.popover?.placement ?? maxPopoverPlacement;

        childrenShow.push(
          <Popover
            key="avatar-popover-key"
            content={childrenHidden}
            {...(max?.popover || {})}
            trigger={mergePopoverTrigger as any}
            placement={mergePopoverPlacement as any}
            overlayClassName={[`${groupPrefixCls.value}-popover`, max?.popover?.overlayClassName]
              .filter(Boolean)
              .join(' ')}
          >
            <Avatar style={mergeStyle} shape={shape}>{`+${numOfChildren - mergeCount}`}</Avatar>
          </Popover>,
        );
        return wrapSSR(
          <div {...attrs} class={cls} style={attrs.style as CSSProperties}>
            {childrenShow}
          </div>,
        );
      }

      return wrapSSR(
        <div {...attrs} class={cls} style={attrs.style as CSSProperties}>
          {childrenWithProps}
        </div>,
      );
    };
  },
});

export default Group;
