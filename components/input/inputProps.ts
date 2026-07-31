import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import omit from '../_util/omit';
import type { VueNode } from '../_util/type';
import { eventType, objectType } from '../_util/type';
import type { CompositionEventHandler } from '../_util/EventInterface';
import { inputProps as vcInputProps } from '../vc-input/inputProps';

export const inputDefaultValue = Symbol() as unknown as string;

export type InputSemanticName =
  | 'input'
  | 'prefix'
  | 'suffix'
  | 'count'
  | 'affixWrapper'
  | 'wrapper'
  | 'group';
export type InputClassNamesType = Partial<Record<InputSemanticName, string>>;
export type InputStylesType = Partial<Record<InputSemanticName, CSSProperties>>;

export type TextAreaSemanticName = 'textarea' | 'count' | 'affixWrapper';
export type TextAreaClassNamesType = Partial<Record<TextAreaSemanticName, string>>;
export type TextAreaStylesType = Partial<Record<TextAreaSemanticName, CSSProperties>>;

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}
const inputProps = () => {
  return {
    ...omit(vcInputProps(), [
      'wrapperClassName',
      'groupClassName',
      'inputClassName',
      'affixWrapperClassName',
      'affixWrapperStyle',
      'inputStyle',
      'prefixClassName',
      'prefixStyle',
      'suffixClassName',
      'suffixStyle',
    ]),
    /** Semantic structure className (antd ≥ 5.4). */
    classNames: objectType<InputClassNamesType>(),
    /** Semantic structure style (antd ≥ 5.4). */
    styles: objectType<InputStylesType>(),
  };
};
export default inputProps;
export type InputProps = Partial<ExtractPropTypes<ReturnType<typeof inputProps>>>;
export interface ShowCountProps {
  formatter: (args: { count: number; maxlength?: number }) => VueNode;
}
const textAreaProps = () => ({
  ...omit(inputProps(), ['prefix', 'addonBefore', 'addonAfter', 'suffix']),
  rows: Number,
  autosize: { type: [Boolean, Object] as PropType<boolean | AutoSizeType>, default: undefined },
  autoSize: { type: [Boolean, Object] as PropType<boolean | AutoSizeType>, default: undefined },
  onResize: { type: Function as PropType<(size: { width: number; height: number }) => void> },
  onCompositionstart: eventType<CompositionEventHandler>(),
  onCompositionend: eventType<CompositionEventHandler>(),
  valueModifiers: Object,
  /** Semantic structure className (antd ≥ 5.4). */
  classNames: objectType<TextAreaClassNamesType>(),
  /** Semantic structure style (antd ≥ 5.4). */
  styles: objectType<TextAreaStylesType>(),
});

export { textAreaProps };

export type TextAreaProps = Partial<ExtractPropTypes<ReturnType<typeof textAreaProps>>>;
