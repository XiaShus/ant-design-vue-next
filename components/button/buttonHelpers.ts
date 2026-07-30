import type { ButtonType } from './buttonTypes';

export type ButtonVariantType = 'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link';

export type ButtonColorType = 'default' | 'primary' | 'danger';

export type ColorVariantPairType = [color?: ButtonColorType, variant?: ButtonVariantType];

export const ButtonTypeMap: Partial<Record<ButtonType, ColorVariantPairType>> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  link: ['primary', 'link'],
  text: ['default', 'text'],
  ghost: ['default', 'outlined'],
};

export function isUnBorderedButtonVariant(variant?: ButtonVariantType) {
  return variant === 'text' || variant === 'link';
}
