import type { CSSInterpolation, CSSObject } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import genGroupStyle from './group';
import { genFocusStyle } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  // FIXME: should be removed
  colorOutlineDefault: string;
  buttonPaddingHorizontal: number;
}

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const { componentCls, iconCls } = token;

  return {
    [componentCls]: {
      outline: 'none',
      position: 'relative',
      display: 'inline-block',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      backgroundImage: 'none',
      backgroundColor: 'transparent',
      border: `${token.lineWidth}px ${token.lineType} transparent`,
      cursor: 'pointer',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: 'none',
      touchAction: 'manipulation',
      lineHeight: token.lineHeight,
      color: token.colorText,

      '> span': {
        display: 'inline-block',
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS,
      },

      '> a': {
        color: 'currentColor',
      },

      '&:not(:disabled)': {
        ...genFocusStyle(token),
      },

      // make `btn-icon-only` not too narrow
      [`&-icon-only${componentCls}-compact-item`]: {
        flex: 'none',
      },
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]:
          {
            position: 'relative',

            '&:before': {
              position: 'absolute',
              top: -token.lineWidth,
              insetInlineStart: -token.lineWidth,
              display: 'inline-block',
              width: token.lineWidth,
              height: `calc(100% + ${token.lineWidth * 2}px)`,
              backgroundColor: token.colorPrimaryHover,
              content: '""',
            },
          },
      },
      // Special styles for Primary Button
      '&-compact-vertical-item': {
        [`&${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]:
            {
              position: 'relative',

              '&:before': {
                position: 'absolute',
                top: -token.lineWidth,
                insetInlineStart: -token.lineWidth,
                display: 'inline-block',
                width: `calc(100% + ${token.lineWidth * 2}px)`,
                height: token.lineWidth,
                backgroundColor: token.colorPrimaryHover,
                content: '""',
              },
            },
        },
      },
    },
  };
};

const genHoverActiveButtonStyle = (hoverStyle: CSSObject, activeStyle: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover': hoverStyle,
    '&:active': activeStyle,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2,
});

// =============================== Type ===============================
const genDisabledStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  cursor: 'not-allowed',
  borderColor: token.colorBorder,
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  boxShadow: 'none',
});

const genGhostButtonStyle = (
  btnCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
  hoverStyle?: CSSObject,
  activeStyle?: CSSObject,
): CSSObject => ({
  [`&${btnCls}-background-ghost`]: {
    color: textColor || undefined,
    backgroundColor: 'transparent',
    borderColor: borderColor || undefined,
    boxShadow: 'none',

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: 'transparent',
        ...hoverStyle,
      },
      {
        backgroundColor: 'transparent',
        ...activeStyle,
      },
    ),

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
});

const genSolidDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    ...genDisabledStyle(token),
  },
});

const genSolidButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidDisabledButtonStyle(token),
});

const genPureDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
  },
});

// Type: Default
const genDefaultButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.colorBgContainer,
  borderColor: token.colorBorder,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.colorBgContainer,
    token.colorBgContainer,
    token.colorTextDisabled,
    token.colorBorder,
  ),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,
    borderColor: token.colorError,

    ...genHoverActiveButtonStyle(
      {
        color: token.colorErrorHover,
        borderColor: token.colorErrorBorderHover,
      },
      {
        color: token.colorErrorActive,
        borderColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      token.componentCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Primary
const genPrimaryButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  color: token.colorTextLightSolid,
  backgroundColor: token.colorPrimary,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryHover,
    },
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.colorPrimary,
    token.colorPrimary,
    token.colorTextDisabled,
    token.colorBorder,
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),

  [`&${token.componentCls}-dangerous`]: {
    backgroundColor: token.colorError,
    boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: token.colorErrorHover,
      },
      {
        backgroundColor: token.colorErrorActive,
      },
    ),

    ...genGhostButtonStyle(
      token.componentCls,
      token.colorError,
      token.colorError,
      token.colorTextDisabled,
      token.colorBorder,
      {
        color: token.colorErrorHover,
        borderColor: token.colorErrorHover,
      },
      {
        color: token.colorErrorActive,
        borderColor: token.colorErrorActive,
      },
    ),
    ...genSolidDisabledButtonStyle(token),
  },
});

// Type: Dashed
const genDashedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genDefaultButtonStyle(token),
  borderStyle: 'dashed',
});

// Type: Link
const genLinkButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  color: token.colorLink,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorLinkHover,
    },
    {
      color: token.colorLinkActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,

    ...genHoverActiveButtonStyle(
      {
        color: token.colorErrorHover,
      },
      {
        color: token.colorErrorActive,
      },
    ),

    ...genPureDisabledButtonStyle(token),
  },
});

// Type: Text
const genTextButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genHoverActiveButtonStyle(
    {
      color: token.colorText,
      backgroundColor: token.colorBgTextHover,
    },
    {
      color: token.colorText,
      backgroundColor: token.colorBgTextActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  [`&${token.componentCls}-dangerous`]: {
    color: token.colorError,

    ...genPureDisabledButtonStyle(token),
    ...genHoverActiveButtonStyle(
      {
        color: token.colorErrorHover,
        backgroundColor: token.colorErrorBg,
      },
      {
        color: token.colorErrorHover,
        backgroundColor: token.colorErrorBg,
      },
    ),
  },
});

// Href and Disabled
const genDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genDisabledStyle(token),
  [`&${token.componentCls}:hover`]: {
    ...genDisabledStyle(token),
  },
});

const genTypeButtonStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
    [`${componentCls}-disabled`]: genDisabledButtonStyle(token),
  };
};

/** Additive styles for Button `color` + `variant` API (antd ≥ 5.21) */
const genColorVariantButtonStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;
  const colorDefault = `${componentCls}-color-default`;
  const colorPrimary = `${componentCls}-color-primary`;
  const colorDanger = `${componentCls}-color-danger`;
  const variantSolid = `${componentCls}-variant-solid`;
  const variantOutlined = `${componentCls}-variant-outlined`;
  const variantDashed = `${componentCls}-variant-dashed`;
  const variantFilled = `${componentCls}-variant-filled`;
  const variantText = `${componentCls}-variant-text`;
  const variantLink = `${componentCls}-variant-link`;

  return {
    // default + outlined/dashed (~ type=default / dashed)
    [`${componentCls}${colorDefault}${variantOutlined}`]: genDefaultButtonStyle(token),
    [`${componentCls}${colorDefault}${variantDashed}`]: genDashedButtonStyle(token),
    // default + solid
    [`${componentCls}${colorDefault}${variantSolid}`]: {
      ...genSolidButtonStyle(token),
      color: token.colorTextLightSolid,
      backgroundColor: token.colorText,
      borderColor: token.colorText,
      ...genHoverActiveButtonStyle(
        {
          color: token.colorTextLightSolid,
          backgroundColor: token.colorTextSecondary,
          borderColor: token.colorTextSecondary,
        },
        {
          color: token.colorTextLightSolid,
          backgroundColor: token.colorTextTertiary,
          borderColor: token.colorTextTertiary,
        },
      ),
    },
    // default + filled
    [`${componentCls}${colorDefault}${variantFilled}`]: {
      ...genSolidButtonStyle(token),
      color: token.colorText,
      backgroundColor: token.colorFillTertiary,
      borderColor: 'transparent',
      boxShadow: 'none',
      ...genHoverActiveButtonStyle(
        {
          backgroundColor: token.colorFillSecondary,
        },
        {
          backgroundColor: token.colorFill,
        },
      ),
    },
    // default + text / link
    [`${componentCls}${colorDefault}${variantText}`]: genTextButtonStyle(token),
    [`${componentCls}${colorDefault}${variantLink}`]: {
      ...genLinkButtonStyle(token),
      color: token.colorText,
      ...genHoverActiveButtonStyle(
        { color: token.colorPrimaryHover },
        { color: token.colorPrimaryActive },
      ),
    },

    // primary + solid (~ type=primary)
    [`${componentCls}${colorPrimary}${variantSolid}`]: genPrimaryButtonStyle(token),
    // primary + outlined / dashed
    [`${componentCls}${colorPrimary}${variantOutlined}, ${componentCls}${colorPrimary}${variantDashed}`]:
      {
        ...genSolidButtonStyle(token),
        color: token.colorPrimary,
        borderColor: token.colorPrimary,
        backgroundColor: token.colorBgContainer,
        ...genHoverActiveButtonStyle(
          {
            color: token.colorPrimaryHover,
            borderColor: token.colorPrimaryHover,
          },
          {
            color: token.colorPrimaryActive,
            borderColor: token.colorPrimaryActive,
          },
        ),
      },
    [`${componentCls}${colorPrimary}${variantDashed}`]: {
      borderStyle: 'dashed',
    },
    // primary + filled
    [`${componentCls}${colorPrimary}${variantFilled}`]: {
      ...genSolidButtonStyle(token),
      color: token.colorPrimary,
      backgroundColor: token.colorPrimaryBg,
      borderColor: 'transparent',
      boxShadow: 'none',
      ...genHoverActiveButtonStyle(
        {
          backgroundColor: token.colorPrimaryBgHover,
        },
        {
          backgroundColor: token.colorPrimaryBorder,
        },
      ),
    },
    // primary + text / link
    [`${componentCls}${colorPrimary}${variantText}`]: {
      ...genTextButtonStyle(token),
      color: token.colorPrimary,
      ...genHoverActiveButtonStyle(
        {
          color: token.colorPrimaryHover,
          backgroundColor: token.colorPrimaryBg,
        },
        {
          color: token.colorPrimaryActive,
          backgroundColor: token.colorPrimaryBgHover,
        },
      ),
    },
    [`${componentCls}${colorPrimary}${variantLink}`]: genLinkButtonStyle(token),

    // danger + solid
    [`${componentCls}${colorDanger}${variantSolid}`]: {
      ...genSolidButtonStyle(token),
      color: token.colorTextLightSolid,
      backgroundColor: token.colorError,
      borderColor: token.colorError,
      ...genHoverActiveButtonStyle(
        {
          backgroundColor: token.colorErrorHover,
          borderColor: token.colorErrorHover,
        },
        {
          backgroundColor: token.colorErrorActive,
          borderColor: token.colorErrorActive,
        },
      ),
    },
    // danger + outlined / dashed
    [`${componentCls}${colorDanger}${variantOutlined}, ${componentCls}${colorDanger}${variantDashed}`]:
      {
        ...genSolidButtonStyle(token),
        color: token.colorError,
        borderColor: token.colorError,
        backgroundColor: token.colorBgContainer,
        ...genHoverActiveButtonStyle(
          {
            color: token.colorErrorHover,
            borderColor: token.colorErrorBorderHover,
          },
          {
            color: token.colorErrorActive,
            borderColor: token.colorErrorActive,
          },
        ),
      },
    [`${componentCls}${colorDanger}${variantDashed}`]: {
      borderStyle: 'dashed',
    },
    // danger + filled
    [`${componentCls}${colorDanger}${variantFilled}`]: {
      ...genSolidButtonStyle(token),
      color: token.colorError,
      backgroundColor: token.colorErrorBg,
      borderColor: 'transparent',
      boxShadow: 'none',
      ...genHoverActiveButtonStyle(
        {
          backgroundColor: token.colorErrorBgHover,
        },
        {
          backgroundColor: token.colorErrorBorder,
        },
      ),
    },
    // danger + text / link
    [`${componentCls}${colorDanger}${variantText}`]: {
      ...genTextButtonStyle(token),
      color: token.colorError,
      ...genHoverActiveButtonStyle(
        {
          color: token.colorErrorHover,
          backgroundColor: token.colorErrorBg,
        },
        {
          color: token.colorErrorHover,
          backgroundColor: token.colorErrorBgHover,
        },
      ),
    },
    [`${componentCls}${colorDanger}${variantLink}`]: {
      ...genLinkButtonStyle(token),
      color: token.colorError,
      ...genHoverActiveButtonStyle(
        { color: token.colorErrorHover },
        { color: token.colorErrorActive },
      ),
    },
  };
};

// =============================== Size ===============================
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls: string = ''): CSSInterpolation => {
  const {
    componentCls,
    iconCls,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    buttonPaddingHorizontal,
  } = token;

  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth);
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth;

  const iconOnlyCls = `${componentCls}-icon-only`;

  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius,

        [`&${iconOnlyCls}`]: {
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          [`&${componentCls}-round`]: {
            width: 'auto',
          },
          '> span': {
            transform: 'scale(1.143)', // 14px -> 16px
          },
        },

        // Loading
        [`&${componentCls}-loading`]: {
          opacity: token.opacityLoading,
          cursor: 'default',
        },

        [`${componentCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`&:not(${iconOnlyCls}):not(${componentCls}-icon-end) ${componentCls}-loading-icon > ${iconCls}`]:
          {
            marginInlineEnd: token.marginXS,
          },

        [`&${componentCls}-icon-end:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]:
          {
            marginInlineStart: token.marginXS,
          },
      },
    },

    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token),
    },
  ];
};

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = token => genSizeButtonStyle(token);

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = token => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: 8, // Fixed padding
    borderRadius: token.borderRadiusSM,
  });

  return genSizeButtonStyle(smallToken, `${token.componentCls}-sm`);
};

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = token => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.fontSizeLG,
    borderRadius: token.borderRadiusLG,
  });

  return genSizeButtonStyle(largeToken, `${token.componentCls}-lg`);
};

const genBlockButtonStyle: GenerateStyle<ButtonToken> = token => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: '100%',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Button', token => {
  const { controlTmpOutline, paddingContentHorizontal } = token;
  const buttonToken = mergeToken<ButtonToken>(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal,
  });

  return [
    // Shared
    genSharedButtonStyle(buttonToken),

    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),

    // Block
    genBlockButtonStyle(buttonToken),

    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(buttonToken),

    // color + variant API
    genColorVariantButtonStyle(buttonToken),

    // Button Group
    genGroupStyle(buttonToken),

    // Space Compact
    genCompactItemStyle(token, { focus: false }),
    genCompactItemVerticalStyle(token),
  ];
});
