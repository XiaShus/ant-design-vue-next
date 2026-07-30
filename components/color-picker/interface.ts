import type { Component, ExtractPropTypes, PropType, VNodeChild } from 'vue';
import type { VueNode } from '../_util/type';
import { functionType } from '../_util/type';
import type { SizeType } from '../config-provider';
import type { TooltipPlacement } from '../tooltip/abstractTooltipProps';
import type { AggregationColor, ColorGenInput } from './color';

export type ColorFormatType = 'hex' | 'rgb' | 'hsb';

export type TriggerType = 'click' | 'hover';

export type ColorValueType = string | AggregationColor | null;

export interface PresetsItem {
  label: VueNode;
  colors: (string | AggregationColor)[];
  defaultOpen?: boolean;
  key?: string | number;
}

export interface PanelRenderExtra {
  components: {
    Picker: Component;
    Presets: Component;
  };
}

export type PanelRender = (panel: VueNode, extra: PanelRenderExtra) => VueNode;

export type ColorPickerProps = Partial<ExtractPropTypes<ReturnType<typeof colorPickerProps>>>;

export function colorPickerProps() {
  return {
    value: { type: [String, Object] as PropType<ColorValueType> },
    defaultValue: { type: [String, Object] as PropType<ColorValueType> },
    format: { type: String as PropType<ColorFormatType> },
    defaultFormat: { type: String as PropType<ColorFormatType>, default: 'hex' },
    allowClear: { type: Boolean, default: false },
    presets: { type: Array as PropType<PresetsItem[]> },
    disabled: { type: Boolean, default: undefined },
    disabledAlpha: { type: Boolean, default: false },
    open: { type: Boolean, default: undefined },
    trigger: { type: String as PropType<TriggerType>, default: 'click' },
    placement: { type: String as PropType<TooltipPlacement>, default: 'bottomLeft' },
    arrow: {
      type: [Boolean, Object] as PropType<boolean | { pointAtCenter?: boolean }>,
      default: true,
    },
    showText: {
      type: [Boolean, Function] as PropType<boolean | ((color: AggregationColor) => VNodeChild)>,
      default: false,
    },
    size: { type: String as PropType<SizeType> },
    rootClassName: String,
    getPopupContainer: { type: Function as PropType<(node: HTMLElement) => HTMLElement> },
    /** Custom panel layout (antd ≥ 5.5). Also available as `panelRender` slot. */
    panelRender: functionType<PanelRender>(),
    /** @deprecated Please use `destroyOnHidden` instead (antd ≥ 5.25). */
    destroyTooltipOnHide: { type: Boolean, default: false },
    destroyOnHidden: { type: Boolean, default: undefined },
  };
}

export type { ColorGenInput, AggregationColor };
