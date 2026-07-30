import type { CSSObject } from '../../_util/cssinjs';
import { Keyframes } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { initFadeMotion } from '../../style/motion/fade';
import { resetComponent } from '../../style';
import { initMotion } from '../../style/motion/motion';
import getOffset from '../util';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
}

type FloatButtonToken = FullToken<'FloatButton'> & {
  floatButtonColor: string;
  floatButtonBackgroundColor: string;
  floatButtonHoverBackgroundColor: string;
  floatButtonFontSize: number;
  floatButtonSize: number;
  floatButtonIconSize: number;
  floatButtonBodySize: number;
  floatButtonBodyPadding: number;
  badgeOffset: number;
  dotOffsetInCircle: number;
  dotOffsetInSquare: number;

  // Position
  floatButtonInsetBlockEnd: number;
  floatButtonInsetInlineEnd: number;
};

const initFloatButtonGroupMotion = (token: FloatButtonToken) => {
  const { componentCls, floatButtonSize, motionDurationSlow, motionEaseInOutCirc } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const size = `${floatButtonSize}px`;
  const negSize = `-${floatButtonSize}px`;

  const moveTopIn = new Keyframes('antFloatButtonMoveTopIn', {
    '0%': { transform: `translate3d(0, ${size}, 0)`, transformOrigin: '0 0', opacity: 0 },
    '100%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
  });
  const moveTopOut = new Keyframes('antFloatButtonMoveTopOut', {
    '0%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
    '100%': { transform: `translate3d(0, ${size}, 0)`, transformOrigin: '0 0', opacity: 0 },
  });
  const moveBottomIn = new Keyframes('antFloatButtonMoveBottomIn', {
    '0%': { transform: `translate3d(0, ${negSize}, 0)`, transformOrigin: '0 0', opacity: 0 },
    '100%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
  });
  const moveBottomOut = new Keyframes('antFloatButtonMoveBottomOut', {
    '0%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
    '100%': { transform: `translate3d(0, ${negSize}, 0)`, transformOrigin: '0 0', opacity: 0 },
  });
  const moveLeftIn = new Keyframes('antFloatButtonMoveLeftIn', {
    '0%': { transform: `translate3d(${size}, 0, 0)`, transformOrigin: '0 0', opacity: 0 },
    '100%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
  });
  const moveLeftOut = new Keyframes('antFloatButtonMoveLeftOut', {
    '0%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
    '100%': { transform: `translate3d(${size}, 0, 0)`, transformOrigin: '0 0', opacity: 0 },
  });
  const moveRightIn = new Keyframes('antFloatButtonMoveRightIn', {
    '0%': { transform: `translate3d(${negSize}, 0, 0)`, transformOrigin: '0 0', opacity: 0 },
    '100%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
  });
  const moveRightOut = new Keyframes('antFloatButtonMoveRightOut', {
    '0%': { transform: 'translate3d(0, 0, 0)', transformOrigin: '0 0', opacity: 1 },
    '100%': { transform: `translate3d(${negSize}, 0, 0)`, transformOrigin: '0 0', opacity: 0 },
  });

  return [
    {
      [groupPrefixCls]: {
        [`&${groupPrefixCls}-top ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveTopIn,
          moveTopOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-bottom ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveBottomIn,
          moveBottomOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-left ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveLeftIn,
          moveLeftOut,
          motionDurationSlow,
          true,
        ),
        [`&${groupPrefixCls}-right ${groupPrefixCls}-wrap`]: initMotion(
          `${groupPrefixCls}-wrap`,
          moveRightIn,
          moveRightOut,
          motionDurationSlow,
          true,
        ),
      },
    },
    {
      [`${groupPrefixCls}-wrap`]: {
        [`&${groupPrefixCls}-wrap-enter, &${groupPrefixCls}-wrap-appear`]: {
          opacity: 0,
          animationTimingFunction: motionEaseInOutCirc,
        },
        [`&${groupPrefixCls}-wrap-leave`]: {
          opacity: 1,
          animationTimingFunction: motionEaseInOutCirc,
        },
      },
    },
  ];
};

// ============================== Group ==============================
const floatButtonGroupStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const {
    antCls,
    componentCls,
    floatButtonSize,
    margin,
    borderRadiusLG,
    borderRadiusSM,
    badgeOffset,
    floatButtonBodyPadding,
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const offset = floatButtonSize + margin;
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      zIndex: 99,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      position: 'fixed',
      height: 'auto',
      boxShadow: 'none',
      minWidth: floatButtonSize,
      minHeight: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      insetBlockEnd: token.floatButtonInsetBlockEnd,
      borderRadius: borderRadiusLG,

      [`${groupPrefixCls}-wrap`]: {
        zIndex: -1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      },
      [`&${groupPrefixCls}-rtl`]: {
        direction: 'rtl',
      },
      [componentCls]: {
        position: 'static',
      },
    },
    [`${groupPrefixCls}-top > ${groupPrefixCls}-wrap`]: {
      flexDirection: 'column',
      top: 'auto',
      bottom: offset,
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: margin,
        bottom: -margin,
      },
    },
    [`${groupPrefixCls}-bottom > ${groupPrefixCls}-wrap`]: {
      flexDirection: 'column',
      top: offset,
      bottom: 'auto',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: margin,
        top: -margin,
      },
    },
    [`${groupPrefixCls}-right > ${groupPrefixCls}-wrap`]: {
      flexDirection: 'row',
      left: offset,
      right: 'auto',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: margin,
        height: '100%',
        left: -margin,
      },
    },
    [`${groupPrefixCls}-left > ${groupPrefixCls}-wrap`]: {
      flexDirection: 'row',
      left: 'auto',
      right: offset,
      '&::after': {
        content: '""',
        position: 'absolute',
        width: margin,
        height: '100%',
        right: -margin,
      },
    },
    [`${groupPrefixCls}-circle`]: {
      gap: margin,
      [`${groupPrefixCls}-wrap`]: {
        gap: margin,
      },
      [`${componentCls}-circle:not(:last-child)`]: {
        [`${componentCls}-body`]: {
          width: floatButtonSize,
          height: floatButtonSize,
          borderRadius: '50%',
        },
      },
    },
    [`${groupPrefixCls}-square`]: {
      [`${componentCls}-square`]: {
        borderRadius: 0,
        padding: 0,
        '&:first-child': {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG,
        },
        '&:last-child': {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG,
        },
        '&:not(:last-child)': {
          borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
        [`${antCls}-badge`]: {
          [`${antCls}-badge-count`]: {
            top: -(floatButtonBodyPadding + badgeOffset),
            insetInlineEnd: -(floatButtonBodyPadding + badgeOffset),
          },
        },
      },
      [`${groupPrefixCls}-wrap`]: {
        borderRadius: borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        [`${componentCls}-square`]: {
          boxShadow: 'none',
          marginTop: 0,
          borderRadius: 0,
          padding: floatButtonBodyPadding,
          [`${componentCls}-body`]: {
            width: token.floatButtonBodySize,
            height: token.floatButtonBodySize,
            borderRadius: borderRadiusSM,
          },
        },
      },
    },
    [`${groupPrefixCls}-top > ${groupPrefixCls}-wrap, ${groupPrefixCls}-bottom > ${groupPrefixCls}-wrap`]:
      {
        [`> ${componentCls}-square`]: {
          '&:first-child': {
            borderStartStartRadius: borderRadiusLG,
            borderStartEndRadius: borderRadiusLG,
          },
          '&:last-child': {
            borderEndStartRadius: borderRadiusLG,
            borderEndEndRadius: borderRadiusLG,
          },
          '&:not(:last-child)': {
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
          },
        },
      },
    [`${groupPrefixCls}-left > ${groupPrefixCls}-wrap, ${groupPrefixCls}-right > ${groupPrefixCls}-wrap`]:
      {
        [`> ${componentCls}-square`]: {
          '&:first-child': {
            borderStartStartRadius: borderRadiusLG,
            borderEndStartRadius: borderRadiusLG,
          },
          '&:last-child': {
            borderStartEndRadius: borderRadiusLG,
            borderEndEndRadius: borderRadiusLG,
          },
          '&:not(:last-child)': {
            borderBottom: 'none',
            borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
          },
        },
      },

    [`${groupPrefixCls}-circle-shadow`]: {
      boxShadow: 'none',
    },
    [`${groupPrefixCls}-square-shadow`]: {
      boxShadow: token.boxShadowSecondary,
      [`${componentCls}-square`]: {
        boxShadow: 'none',
        padding: floatButtonBodyPadding,
        [`${componentCls}-body`]: {
          width: token.floatButtonBodySize,
          height: token.floatButtonBodySize,
          borderRadius: borderRadiusSM,
        },
      },
    },
  };
};

// ============================== Shared ==============================
const sharedFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const {
    antCls,
    componentCls,
    floatButtonBodyPadding,
    floatButtonIconSize,
    floatButtonSize,
    borderRadiusLG,
    badgeOffset,
    dotOffsetInSquare,
    dotOffsetInCircle,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      border: 'none',
      position: 'fixed',
      cursor: 'pointer',
      zIndex: 99,
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      insetBlockEnd: token.floatButtonInsetBlockEnd,
      boxShadow: token.boxShadowSecondary,

      // Pure Panel
      '&-pure': {
        position: 'relative',
        inset: 'auto',
      },

      '&:empty': {
        display: 'none',
      },
      [`${antCls}-badge`]: {
        width: '100%',
        height: '100%',
        [`${antCls}-badge-count`]: {
          transform: 'translate(0, 0)',
          transformOrigin: 'center',
          top: -badgeOffset,
          insetInlineEnd: -badgeOffset,
        },
      },
      [`${componentCls}-body`]: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: `all ${token.motionDurationMid}`,
        [`${componentCls}-content`]: {
          overflow: 'hidden',
          textAlign: 'center',
          minHeight: floatButtonSize,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: `${floatButtonBodyPadding / 2}px ${floatButtonBodyPadding}px`,
          [`${componentCls}-icon`]: {
            textAlign: 'center',
            margin: 'auto',
            width: floatButtonIconSize,
            fontSize: floatButtonIconSize,
            lineHeight: 1,
          },
        },
      },
    },
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: '50%',
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInCircle,
          insetInlineEnd: dotOffsetInCircle,
        },
      },
      [`${componentCls}-body`]: {
        borderRadius: '50%',
      },
    },
    [`${componentCls}-square`]: {
      height: 'auto',
      minHeight: floatButtonSize,
      borderRadius: borderRadiusLG,
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInSquare,
          insetInlineEnd: dotOffsetInSquare,
        },
      },
      [`${componentCls}-body`]: {
        height: 'auto',
        borderRadius: borderRadiusLG,
      },
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.floatButtonBackgroundColor,
      transition: `background-color ${token.motionDurationMid}`,
      [`${componentCls}-body`]: {
        backgroundColor: token.floatButtonBackgroundColor,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorFillContent,
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorText,
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: `${token.fontSizeLG}px`,
            color: token.colorText,
            fontSize: token.fontSizeSM,
          },
        },
      },
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorPrimary,
        transition: `background-color ${token.motionDurationMid}`,
        '&:hover': {
          backgroundColor: token.colorPrimaryHover,
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorTextLightSolid,
          },
          [`${componentCls}-description`]: {
            display: 'flex',
            alignItems: 'center',
            lineHeight: `${token.fontSizeLG}px`,
            color: token.colorTextLightSolid,
            fontSize: token.fontSizeSM,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook<'FloatButton'>('FloatButton', token => {
  const {
    colorTextLightSolid,
    colorBgElevated,
    controlHeightLG,
    marginXXL,
    marginLG,
    fontSize,
    fontSizeIcon,
    controlItemBgHover,
    paddingXXS,
    borderRadiusLG,
  } = token;
  const floatButtonToken = mergeToken<FloatButtonToken>(token, {
    floatButtonBackgroundColor: colorBgElevated,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: fontSizeIcon * 1.5,
    floatButtonSize: controlHeightLG,

    floatButtonInsetBlockEnd: marginXXL,
    floatButtonInsetInlineEnd: marginLG,
    floatButtonBodySize: controlHeightLG - paddingXXS * 2,
    // 这里的 paddingXXS 是简写，完整逻辑是 (controlHeightLG - (controlHeightLG - paddingXXS * 2)) / 2,
    floatButtonBodyPadding: paddingXXS,
    badgeOffset: paddingXXS * 1.5,
    dotOffsetInCircle: getOffset(controlHeightLG / 2),
    dotOffsetInSquare: getOffset(borderRadiusLG),
  });
  return [
    floatButtonGroupStyle(floatButtonToken),
    sharedFloatButtonStyle(floatButtonToken),
    initFadeMotion(token),
    initFloatButtonGroupMotion(floatButtonToken),
  ];
});
