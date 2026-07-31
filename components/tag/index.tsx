import type { HTMLAttributes, App, PropType, ExtractPropTypes, Plugin, CSSProperties } from 'vue';
import { shallowRef, defineComponent, watchEffect, computed } from 'vue';
import classNames from '../_util/classNames';
import PropTypes from '../_util/vue-types';
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import Wave from '../_util/wave';
import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { isPresetColor, isPresetStatusColor } from '../_util/colors';
import { eventType, objectType } from '../_util/type';
import type { CustomSlotsType, LiteralUnion } from '../_util/type';

import CheckableTag from './CheckableTag';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import warning from '../_util/warning';

import useStyle from './style';

export type TagSemanticName = 'root' | 'icon' | 'content' | 'closeIcon';
export type TagClassNamesType = Partial<Record<TagSemanticName, string>>;
export type TagStylesType = Partial<Record<TagSemanticName, CSSProperties>>;

export const tagProps = () => ({
  prefixCls: String,
  color: {
    type: String as PropType<LiteralUnion<PresetColorType | PresetStatusColorType>>,
  },
  closable: { type: Boolean, default: false },
  closeIcon: PropTypes.any,
  /** @deprecated `visible` will be removed in next major version. */
  visible: { type: Boolean, default: undefined },
  onClose: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
  onClick: eventType<(e: MouseEvent) => void>(),
  'onUpdate:visible': Function as PropType<(vis: boolean) => void>,
  icon: PropTypes.any,
  bordered: { type: Boolean, default: true },
  /** Semantic structure className (antd ≥ 5.23). */
  classNames: objectType<TagClassNamesType>(),
  /** Semantic structure style (antd ≥ 5.23). */
  styles: objectType<TagStylesType>(),
});

export type TagProps = HTMLAttributes & Partial<ExtractPropTypes<ReturnType<typeof tagProps>>>;

const Tag = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATag',
  inheritAttrs: false,
  props: tagProps(),
  // emits: ['update:visible', 'close'],
  slots: Object as CustomSlotsType<{
    closeIcon: any;
    icon: any;
    default: any;
  }>,
  setup(props, { slots, emit, attrs }) {
    const { prefixCls, direction } = useConfigInject('tag', props);

    const [wrapSSR, hashId] = useStyle(prefixCls);

    const visible = shallowRef(true);

    // Warning for deprecated usage
    if (process.env.NODE_ENV !== 'production') {
      warning(
        props.visible === undefined,
        'Tag',
        '`visible` is deprecated, please use `<Tag v-show="visible" />` instead.',
      );
    }

    watchEffect(() => {
      if (props.visible !== undefined) {
        visible.value = props.visible!;
      }
    });

    const handleCloseClick = (e: MouseEvent) => {
      e.stopPropagation();
      emit('update:visible', false);
      emit('close', e);

      if (e.defaultPrevented) {
        return;
      }
      if (props.visible === undefined) {
        visible.value = false;
      }
    };

    // const isPresetColor = computed(() => {
    //   const { color } = props;
    //   if (!color) {
    //     return false;
    //   }
    //   return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
    // });

    const isInternalColor = computed(
      () => isPresetColor(props.color) || isPresetStatusColor(props.color),
    );

    const tagClassName = computed(() =>
      classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-${props.color}`]: isInternalColor.value,
        [`${prefixCls.value}-has-color`]: props.color && !isInternalColor.value,
        [`${prefixCls.value}-hidden`]: !visible.value,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${prefixCls.value}-borderless`]: !props.bordered,
      }),
    );
    const handleClick = (e: MouseEvent) => {
      emit('click', e);
    };
    return () => {
      const {
        icon = slots.icon?.(),
        color,
        closeIcon = slots.closeIcon?.(),
        closable = false,
      } = props;

      const renderCloseIcon = () => {
        if (closable) {
          return closeIcon ? (
            <span
              class={[`${prefixCls.value}-close-icon`, props.classNames?.closeIcon]}
              style={props.styles?.closeIcon}
              onClick={handleCloseClick}
            >
              {closeIcon}
            </span>
          ) : (
            <CloseOutlined
              class={[`${prefixCls.value}-close-icon`, props.classNames?.closeIcon]}
              style={props.styles?.closeIcon}
              onClick={handleCloseClick}
            />
          );
        }
        return null;
      };

      const tagStyle = {
        backgroundColor: color && !isInternalColor.value ? color : undefined,
        ...props.styles?.root,
      };

      const iconNode = icon || null;
      const children = slots.default?.();
      const contentNode =
        props.classNames?.content || props.styles?.content ? (
          <span class={props.classNames?.content} style={props.styles?.content}>
            {children}
          </span>
        ) : (
          children
        );
      const kids = iconNode ? (
        <>
          {props.classNames?.icon || props.styles?.icon ? (
            <span class={props.classNames?.icon} style={props.styles?.icon}>
              {iconNode}
            </span>
          ) : (
            iconNode
          )}
          {props.classNames?.content || props.styles?.content ? (
            contentNode
          ) : (
            <span>{children}</span>
          )}
        </>
      ) : (
        contentNode
      );

      const isNeedWave = props.onClick !== undefined;
      const tagNode = (
        <span
          {...attrs}
          onClick={handleClick}
          class={[tagClassName.value, props.classNames?.root, attrs.class]}
          style={[tagStyle, attrs.style as CSSProperties]}
        >
          {kids}
          {renderCloseIcon()}
        </span>
      );

      return wrapSSR(isNeedWave ? <Wave>{tagNode}</Wave> : tagNode);
    };
  },
});

Tag.CheckableTag = CheckableTag;

Tag.install = function (app: App) {
  app.component(Tag.name, Tag);
  app.component(CheckableTag.name, CheckableTag);
  return app;
};

export { CheckableTag };

export default Tag as typeof Tag &
  Plugin & {
    readonly CheckableTag: typeof CheckableTag;
  };
