import type { CSSProperties, ExtractPropTypes } from 'vue';
import type { SizeType } from '../config-provider/SizeContext';
import { anyType, booleanType, someType, stringType } from '../_util/type';

export const flexProps = () => ({
  prefixCls: stringType(),
  vertical: booleanType(),
  /** flex-wrap CSS value, or boolean shortcut (antd ≥ 5.17). */
  wrap: someType<boolean | CSSProperties['flex-wrap']>([Boolean, String]),
  justify: stringType<CSSProperties['justify-content']>(),
  align: stringType<CSSProperties['align-items']>(),
  flex: someType<CSSProperties['flex']>([Number, String]),
  gap: someType<CSSProperties['gap'] | SizeType>([Number, String]),
  component: anyType(),
});

export type FlexProps = Partial<ExtractPropTypes<ReturnType<typeof flexProps>> & HTMLElement>;
