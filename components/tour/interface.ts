import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import { tourProps as VCTourProps, tourStepProps as VCTourStepProps } from '../vc-tour';
import type { VueNode } from '../_util/type';
import { functionType, someType } from '../_util/type';
import PropTypes from '../_util/vue-types';

export type TourActionsRender = (
  originNode: VueNode,
  info: { current: number; total: number },
) => VueNode;

export const tourProps = () => ({
  ...VCTourProps(),
  steps: { type: Array as PropType<TourStepProps[]> },
  prefixCls: { type: String },
  current: { type: Number },
  type: { type: String as PropType<'default' | 'primary'> }, //	default	类型，影响底色与文字颜色
  /** Custom action buttons (antd ≥ 5.25). */
  actionsRender: functionType<TourActionsRender>(),
  /** Customize close icon; `false` / `null` hides it (antd ≥ 5.9). */
  closeIcon: someType<VueNode | boolean>([Boolean, Object, String, Number, Function]),
  'onUpdate:current': Function as PropType<(val: number) => void>,
});

export type TourProps = Partial<ExtractPropTypes<ReturnType<typeof tourProps>>>;

export interface TourBtnProps {
  children?: () => VueNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const tourStepProps = () => ({
  ...VCTourStepProps(),
  cover: { type: Object as PropType<VueNode> }, // 展示的图片或者视频
  nextButtonProps: {
    type: Object as PropType<TourBtnProps>,
  },
  prevButtonProps: {
    type: Object as PropType<TourBtnProps>,
  },
  current: { type: Number },
  type: { type: String as PropType<'default' | 'primary'> }, //	default	类型，影响底色与文字颜色
  /** Custom action buttons (antd ≥ 5.25). */
  actionsRender: functionType<TourActionsRender>(),
  /** Customize close icon; `false` / `null` hides it (antd ≥ 5.9). */
  closeIcon: PropTypes.any,
});

export type TourStepProps = Partial<ExtractPropTypes<ReturnType<typeof tourStepProps>>>;

export interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
