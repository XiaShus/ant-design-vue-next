import type { ExtractPropTypes, PropType, CSSProperties } from 'vue';
import type { VueNode } from '../_util/type';

export type SplitterLayout = 'horizontal' | 'vertical';

export type PanelSize = number | string;

export type PanelCollapsible =
  | boolean
  | { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean | 'auto' };

export function panelProps() {
  return {
    size: { type: [Number, String] as PropType<PanelSize> },
    defaultSize: { type: [Number, String] as PropType<PanelSize> },
    min: { type: [Number, String] as PropType<PanelSize> },
    max: { type: [Number, String] as PropType<PanelSize> },
    resizable: { type: Boolean, default: true },
    collapsible: {
      type: [Boolean, Object] as PropType<PanelCollapsible>,
      default: false,
    },
    destroyOnHidden: { type: Boolean, default: undefined },
  };
}

export type PanelProps = Partial<ExtractPropTypes<ReturnType<typeof panelProps>>> & {
  className?: string;
  style?: CSSProperties;
};

export function splitterProps() {
  return {
    layout: { type: String as PropType<SplitterLayout>, default: 'horizontal' },
    lazy: { type: Boolean, default: false },
    rootClassName: String,
  };
}

export type SplitterProps = Partial<ExtractPropTypes<ReturnType<typeof splitterProps>>>;

export type { VueNode };
