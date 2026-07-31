import type { CSSObject } from '../../_util/cssinjs';
import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

interface SpaceToken extends FullToken<'Space'> {
  // Custom token here
}

const genSpaceAddonStyle: GenerateStyle<SpaceToken, CSSObject> = token => {
  const {
    componentCls,
    borderRadius,
    paddingSM,
    colorBorder,
    paddingXS,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
    colorBgContainerDisabled,
    lineWidth,
  } = token;

  return {
    [componentCls]: [
      {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        paddingInline: paddingSM,
        margin: 0,
        background: colorBgContainerDisabled,
        borderWidth: lineWidth,
        borderStyle: 'solid',
        borderColor: colorBorder,
        borderRadius,

        '&-large': {
          fontSize: fontSizeLG,
          borderRadius: borderRadiusLG,
        },
        '&-small': {
          paddingInline: paddingXS,
          borderRadius: borderRadiusSM,
          fontSize: fontSizeSM,
        },
        '&-compact-last-item': {
          borderEndStartRadius: 0,
          borderStartStartRadius: 0,
        },
        '&-compact-first-item': {
          borderEndEndRadius: 0,
          borderStartEndRadius: 0,
        },
        '&-compact-item:not(:first-child):not(:last-child)': {
          borderRadius: 0,
        },
        '&-compact-item:not(:last-child)': {
          borderInlineEndWidth: 0,
        },
      },
      genCompactItemStyle(token as any, {
        focus: false,
      }),
    ],
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Space', token => [genSpaceAddonStyle(token)]);
