import type { CSSProperties, VNodeTypes, ExtractPropTypes } from 'vue';
import { computed, ref, defineComponent } from 'vue';
import VcSlider from '../vc-slider/src/Slider';
import VcRange from '../vc-slider/src/Range';
import VcHandle from '../vc-slider/src/Handle';

import type { VueNode, CustomSlotsType } from '../_util/type';
import {
  stringType,
  booleanType,
  someType,
  objectType,
  withInstall,
  functionType,
} from '../_util/type';
import type { TooltipPlacement } from '../tooltip/Tooltip';
import useConfigInject from '../config-provider/hooks/useConfigInject';
import SliderTooltip from './SliderTooltip';
import classNames from '../_util/classNames';
import { useInjectFormItemContext } from '../form/FormItemContext';
import type { FocusEventHandler } from '../_util/EventInterface';

// CSSINJS
import useStyle from './style';
import devWarning from '../vc-util/devWarning';

export type SliderValue = number | [number, number];

export interface SliderMarks {
  [key: number]:
    | VueNode
    | {
        style: CSSProperties;
        label: any;
      };
}

interface HandleGeneratorInfo {
  value?: number;
  dragging?: boolean;
  index: number;
}
export interface SliderRange {
  draggableTrack?: boolean;
}

/** Nested tooltip config (antd ≥ 5.x). Prefer over flat tip* / tooltip* props. */
export interface SliderTooltipConfig {
  open?: boolean;
  placement?: TooltipPlacement;
  formatter?: ((value?: number) => any) | null;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  autoAdjustOverflow?: boolean;
  prefixCls?: string;
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string;
  prefixCls?: string;
  info: HandleGeneratorInfo;
}) => VNodeTypes;
type Value = [number, number] | number;

const defaultTipFormatter = (value: number) => (typeof value === 'number' ? value.toString() : '');
export const sliderProps = () => ({
  id: String,
  prefixCls: String,
  tooltipPrefixCls: String,
  range: someType<boolean | SliderRange>([Boolean, Object]),
  reverse: booleanType(),
  min: Number,
  max: Number,
  step: someType<null | number>([Object, Number]),
  marks: objectType<SliderMarks>(),
  dots: booleanType(),
  value: someType<Value>([Array, Number]),
  defaultValue: someType<Value>([Array, Number]),
  included: booleanType(),
  disabled: booleanType(),
  vertical: booleanType(),
  /** @deprecated Prefer `tooltip.formatter` */
  tipFormatter: someType<((value?: number) => any) | null>(
    [Function, Object],
    () => defaultTipFormatter,
  ),
  /** @deprecated Prefer `tooltip.open` */
  tooltipOpen: booleanType(),
  /** @deprecated Prefer `tooltip.open` */
  tooltipVisible: booleanType(),
  /** @deprecated Prefer `tooltip.placement` */
  tooltipPlacement: stringType<TooltipPlacement>(),
  /** @deprecated Prefer `tooltip.getPopupContainer` */
  getTooltipPopupContainer: functionType<(triggerNode: HTMLElement) => HTMLElement>(),
  /** Tooltip config object (antd ≥ 5) */
  tooltip: objectType<SliderTooltipConfig>(),
  autofocus: booleanType(),
  handleStyle: someType<CSSProperties[] | CSSProperties>([Array, Object]),
  trackStyle: someType<CSSProperties[] | CSSProperties>([Array, Object]),
  onChange: functionType<(value: Value) => void>(),
  onAfterChange: functionType<(value: Value) => void>(),
  onFocus: functionType<FocusEventHandler>(),
  onBlur: functionType<FocusEventHandler>(),
  'onUpdate:value': functionType<(value: Value) => void>(),
});

export type SliderProps = Partial<ExtractPropTypes<ReturnType<typeof sliderProps>>>;
export type Visibles = { [index: number]: boolean };

const Slider = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASlider',
  inheritAttrs: false,
  props: sliderProps(),
  // emits: ['update:value', 'change', 'afterChange', 'blur'],
  slots: Object as CustomSlotsType<{
    mark?: any;
    default?: any;
  }>,
  setup(props, { attrs, slots, emit, expose }) {
    // Warning for deprecated usage
    if (process.env.NODE_ENV !== 'production') {
      (
        [
          ['tooltipVisible', 'tooltip.open'],
          ['tooltipOpen', 'tooltip.open'],
          ['tooltipPlacement', 'tooltip.placement'],
          ['getTooltipPopupContainer', 'tooltip.getPopupContainer'],
          ['tooltipPrefixCls', 'tooltip.prefixCls'],
        ] as const
      ).forEach(([deprecatedName, newName]) => {
        devWarning(
          (props as any)[deprecatedName] === undefined,
          'Slider',
          `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
        );
      });
    }
    const { prefixCls, rootPrefixCls, direction, getPopupContainer, configProvider } =
      useConfigInject('slider', props);

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const formItemContext = useInjectFormItemContext();
    const sliderRef = ref();
    const visibles = ref<Visibles>({});
    const toggleTooltipOpen = (index: number, visible: boolean) => {
      visibles.value[index] = visible;
    };

    const mergedTooltip = computed(() => {
      const tip = props.tooltip || {};
      const formatter =
        tip.formatter !== undefined
          ? tip.formatter
          : props.tipFormatter !== undefined
          ? props.tipFormatter
          : defaultTipFormatter;
      const open =
        tip.open !== undefined
          ? tip.open
          : props.tooltipOpen !== undefined
          ? props.tooltipOpen
          : props.tooltipVisible;
      const placement = tip.placement ?? props.tooltipPlacement;
      const getContainer = tip.getPopupContainer ?? props.getTooltipPopupContainer;
      return {
        formatter,
        open,
        placement,
        getPopupContainer: getContainer,
        autoAdjustOverflow: tip.autoAdjustOverflow,
        prefixCls: tip.prefixCls,
      };
    });

    const tooltipPlacement = computed(() => {
      if (mergedTooltip.value.placement) {
        return mergedTooltip.value.placement;
      }
      if (!props.vertical) {
        return 'top';
      }
      return direction.value === 'rtl' ? 'left' : 'right';
    });

    const focus = () => {
      sliderRef.value?.focus();
    };
    const blur = () => {
      sliderRef.value?.blur();
    };
    const handleChange = (val: SliderValue) => {
      emit('update:value', val);
      emit('change', val);
      formItemContext.onFieldChange();
    };
    const handleBlur = (e: FocusEvent) => {
      emit('blur', e);
    };
    expose({
      focus,
      blur,
    });
    const handleWithTooltip: HandleGeneratorFn = ({
      tooltipPrefixCls,
      info: { value, dragging, index, ...restProps },
    }) => {
      const {
        formatter: tipFormatter,
        open: tooltipOpen,
        getPopupContainer: tipGetPopup,
      } = mergedTooltip.value;
      const isTipFormatter = tipFormatter ? visibles.value[index] || dragging : false;
      const open = tooltipOpen || (tooltipOpen === undefined && isTipFormatter);
      return (
        <SliderTooltip
          prefixCls={tooltipPrefixCls}
          title={tipFormatter ? tipFormatter(value) : ''}
          open={open}
          placement={tooltipPlacement.value}
          autoAdjustOverflow={mergedTooltip.value.autoAdjustOverflow}
          transitionName={`${rootPrefixCls.value}-zoom-down`}
          key={index}
          overlayClassName={`${prefixCls.value}-tooltip`}
          getPopupContainer={tipGetPopup || getPopupContainer?.value}
        >
          <VcHandle
            {...restProps}
            value={value}
            onMouseenter={() => toggleTooltipOpen(index, true)}
            onMouseleave={() => toggleTooltipOpen(index, false)}
          />
        </SliderTooltip>
      );
    };
    return () => {
      const {
        tooltipPrefixCls: customizeTooltipPrefixCls,
        range,
        id = formItemContext.id.value,
        tooltip: _tooltip,
        tipFormatter: _tipFormatter,
        tooltipOpen: _tooltipOpen,
        tooltipVisible: _tooltipVisible,
        tooltipPlacement: _tooltipPlacement,
        getTooltipPopupContainer: _getTooltipPopupContainer,
        ...restProps
      } = props;
      const tooltipPrefixCls = configProvider.getPrefixCls(
        'tooltip',
        mergedTooltip.value.prefixCls || customizeTooltipPrefixCls,
      );
      const cls = classNames(
        attrs.class,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        hashId.value,
      );

      // make reverse default on rtl direction
      if (direction.value === 'rtl' && !restProps.vertical) {
        restProps.reverse = !restProps.reverse;
      }

      // extrack draggableTrack from range={{ ... }}
      let draggableTrack: boolean | undefined;
      if (typeof range === 'object') {
        draggableTrack = range.draggableTrack;
      }

      if (range) {
        return wrapSSR(
          <VcRange
            {...attrs}
            {...restProps}
            step={restProps.step!}
            draggableTrack={draggableTrack}
            class={cls}
            ref={sliderRef}
            handle={(info: HandleGeneratorInfo) =>
              handleWithTooltip({
                tooltipPrefixCls,
                prefixCls: prefixCls.value,
                info,
              })
            }
            prefixCls={prefixCls.value}
            onChange={handleChange}
            onBlur={handleBlur}
            v-slots={{ mark: slots.mark }}
          />,
        );
      }
      return wrapSSR(
        <VcSlider
          {...attrs}
          {...restProps}
          id={id}
          step={restProps.step!}
          class={cls}
          ref={sliderRef}
          handle={(info: HandleGeneratorInfo) =>
            handleWithTooltip({
              tooltipPrefixCls,
              prefixCls: prefixCls.value,
              info,
            })
          }
          prefixCls={prefixCls.value}
          onChange={handleChange}
          onBlur={handleBlur}
          v-slots={{ mark: slots.mark }}
        />,
      );
    };
  },
});

export default withInstall(Slider);
