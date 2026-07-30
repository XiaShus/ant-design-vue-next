import PropTypes from '../_util/vue-types';

import type { ExtractPropTypes, PropType } from 'vue';
import type { SizeType } from '../config-provider';
import { booleanType, eventType, stringType } from '../_util/type';
import type { MouseEventHandler } from '../_util/EventInterface';

import type { ButtonColorType, ButtonVariantType } from './buttonHelpers';

export type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonIconPlacement = 'start' | 'end';
export type { ButtonColorType, ButtonVariantType };

export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export type LegacyButtonType = ButtonType | 'danger';
export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

export const buttonProps = () => ({
  prefixCls: String,
  type: String as PropType<ButtonType>,
  htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
  shape: { type: String as PropType<ButtonShape> },
  size: {
    type: String as PropType<SizeType>,
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay?: number }>,
    default: (): boolean | { delay?: number } => false,
  },
  disabled: { type: Boolean, default: undefined },
  ghost: { type: Boolean, default: undefined },
  block: { type: Boolean, default: undefined },
  danger: { type: Boolean, default: undefined },
  icon: PropTypes.any,
  href: String,
  target: String,
  title: String,
  /** We default to providing a space between two Chinese characters; set to false to disable */
  autoInsertSpace: booleanType(),
  /** Set the icon position of button */
  iconPlacement: stringType<ButtonIconPlacement>(),
  /** @deprecated Please use `iconPlacement` instead */
  iconPosition: stringType<ButtonIconPlacement>(),
  /** Set button color (use with `variant`) */
  color: stringType<ButtonColorType>(),
  /** Set button variant (use with `color`) */
  variant: stringType<ButtonVariantType>(),
  onClick: eventType<MouseEventHandler>(),
  onMousedown: eventType<MouseEventHandler>(),
});

export type ButtonProps = Partial<ExtractPropTypes<ReturnType<typeof buttonProps>>>;

export default buttonProps;
