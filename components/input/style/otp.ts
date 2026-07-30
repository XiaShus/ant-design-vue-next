import type { CSSObject } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

type OTPToken = FullToken<'Input'>;

const genOTPStyle: GenerateStyle<OTPToken> = token => {
  const { componentCls, paddingXS, paddingXXS, colorText } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      columnGap: paddingXS,

      [`${componentCls}-input-wrapper`]: {
        position: 'relative',
        [`${componentCls}-mask-icon`]: {
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          insetInlineEnd: '50%',
          transform: 'translate(50%, -50%)',
          pointerEvents: 'none',
        },
        [`${componentCls}-mask-input`]: {
          color: 'transparent',
          caretColor: colorText,
          '&::selection': {
            color: 'transparent',
          },
        },
      },

      [`&-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-input`]: {
        textAlign: 'center',
        paddingInline: paddingXXS,
        width: token.controlHeight,
      },

      [`&${componentCls}-sm ${componentCls}-input`]: {
        width: token.controlHeightSM,
        paddingInline: Math.max(Math.floor(paddingXXS / 2), 2),
      },

      [`&${componentCls}-lg ${componentCls}-input`]: {
        width: token.controlHeightLG,
        paddingInline: paddingXS,
      },

      [`${componentCls}-separator`]: {
        display: 'inline-flex',
        alignItems: 'center',
        color: token.colorTextSecondary,
      },
    } as CSSObject,
  };
};

export default genComponentStyleHook('Input', token => {
  return [genOTPStyle(mergeToken<OTPToken>(token, {}))];
});
