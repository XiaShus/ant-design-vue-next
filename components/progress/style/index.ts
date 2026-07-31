import type { CSSObject } from '../../_util/cssinjs';
import { Keyframes } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';

export interface ComponentToken {}

export const LineStrokeColorVar = '--progress-line-stroke-color';
export const Percent = '--progress-percent';

interface ProgressToken extends FullToken<'Progress'> {
  progressLineRadius: number;
  progressInfoTextColor: string;
  progressRemainingColor: string;
  progressDefaultColor: string;
  progressStepMinWidth: number;
  progressStepMarginInlineEnd: number;
  progressActiveMotionDuration: string;
}

const antProgressActive = new Keyframes('antProgressActive', {
  '0%': {
    transform: 'translateX(-100%) scaleX(0)',
    opacity: 0.1,
  },
  '20%': {
    transform: 'translateX(-100%) scaleX(0)',
    opacity: 0.5,
  },
  to: {
    transform: 'translateX(0) scaleX(1)',
    opacity: 0,
  },
});

const genBaseStyle: GenerateStyle<ProgressToken> = token => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      ...resetComponent(token),

      display: 'inline-block',

      '&-rtl': {
        direction: 'rtl',
      },

      '&-line': {
        position: 'relative',
        width: '100%',
        fontSize: token.fontSize,
      },

      [`${progressCls}-outer`]: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
      },

      [`${progressCls}-inner`]: {
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        flex: 1,
        overflow: 'hidden',
        verticalAlign: 'middle',
        backgroundColor: token.progressRemainingColor,
        borderRadius: token.progressLineRadius,
      },

      [`${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorInfo,
        },
      },

      [`${progressCls}-success-bg, ${progressCls}-bg`]: {
        position: 'relative',
        backgroundColor: token.colorInfo,
        borderRadius: token.progressLineRadius,
        transition: `all ${token.motionDurationSlow} ${token.motionEaseInOutCirc}`,
      },

      [`${progressCls}-layout-bottom`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [`${progressCls}-text`]: {
          width: 'max-content',
          marginInlineStart: 0,
          marginTop: token.marginXXS,
        },
      },

      [`${progressCls}-bg`]: {
        overflow: 'hidden',
        '&::after': {
          content: '""',
          background: `var(${LineStrokeColorVar})`,
          height: '100%',
          width: `calc(1 / var(${Percent}) * 100%)`,
          display: 'block',
        },
        [`&${progressCls}-bg-inner`]: {
          minWidth: 'max-content',
          '&::after': {
            content: 'none',
          },
          [`${progressCls}-text-inner`]: {
            color: token.colorWhite,
            [`&${progressCls}-text-bright`]: {
              color: 'rgba(0, 0, 0, 0.45)',
            },
          },
        },
      },

      [`${progressCls}-success-bg`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        backgroundColor: token.colorSuccess,
      },

      [`${progressCls}-text`]: {
        display: 'inline-block',
        marginInlineStart: token.marginXS,
        color: token.progressInfoTextColor,
        lineHeight: 1,
        width: '2em',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        verticalAlign: 'middle',
        wordBreak: 'normal',
        [iconPrefixCls]: {
          fontSize: token.fontSize,
        },
        [`&${progressCls}-text-outer`]: {
          width: 'max-content',
        },
        [`&${progressCls}-text-outer${progressCls}-text-start`]: {
          width: 'max-content',
          marginInlineStart: 0,
          marginInlineEnd: token.marginXS,
        },
      },

      [`${progressCls}-text-inner`]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginInlineStart: 0,
        padding: `0 ${token.paddingXXS}px`,
        [`&${progressCls}-text-start`]: {
          justifyContent: 'flex-start',
        },
        [`&${progressCls}-text-end`]: {
          justifyContent: 'flex-end',
        },
      },

      [`&${progressCls}-status-active`]: {
        [`${progressCls}-bg::before`]: {
          position: 'absolute',
          inset: 0,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.progressLineRadius,
          opacity: 0,
          animationName: antProgressActive,
          animationDuration: token.progressActiveMotionDuration,
          animationTimingFunction: token.motionEaseOutQuint,
          animationIterationCount: 'infinite',
          content: '""',
        },
      },

      [`&${progressCls}-status-exception`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorError,
        },
        [`${progressCls}-text`]: {
          color: token.colorError,
        },
      },

      [`&${progressCls}-status-exception ${progressCls}-inner:not(${progressCls}-circle-gradient)`]:
        {
          [`${progressCls}-circle-path`]: {
            stroke: token.colorError,
          },
        },

      [`&${progressCls}-status-success`]: {
        [`${progressCls}-bg`]: {
          backgroundColor: token.colorSuccess,
        },
        [`${progressCls}-text`]: {
          color: token.colorSuccess,
        },
      },

      [`&${progressCls}-status-success ${progressCls}-inner:not(${progressCls}-circle-gradient)`]: {
        [`${progressCls}-circle-path`]: {
          stroke: token.colorSuccess,
        },
      },
    },
  };
};

const genCircleStyle: GenerateStyle<ProgressToken> = token => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-circle-trail`]: {
        stroke: token.progressRemainingColor,
      },

      [`&${progressCls}-circle ${progressCls}-inner`]: {
        position: 'relative',
        lineHeight: 1,
        backgroundColor: 'transparent',
      },

      [`&${progressCls}-circle ${progressCls}-text`]: {
        position: 'absolute',
        insetBlockStart: '50%',
        insetInlineStart: 0,
        width: '100%',
        margin: 0,
        padding: 0,
        color: token.colorText,
        lineHeight: 1,
        whiteSpace: 'normal',
        textAlign: 'center',
        transform: 'translateY(-50%)',

        [iconPrefixCls]: {
          fontSize: `${token.fontSize / token.fontSizeSM}em`,
        },
      },

      [`${progressCls}-circle&-status-exception`]: {
        [`${progressCls}-text`]: {
          color: token.colorError,
        },
      },

      [`${progressCls}-circle&-status-success`]: {
        [`${progressCls}-text`]: {
          color: token.colorSuccess,
        },
      },
    },
    [`${progressCls}-inline-circle`]: {
      lineHeight: 1,
      [`${progressCls}-inner`]: {
        verticalAlign: 'bottom',
      },
    },
  };
};

const genStepStyle: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-steps`]: {
        display: 'inline-block',
        '&-outer': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        '&-item': {
          flexShrink: 0,
          minWidth: token.progressStepMinWidth,
          marginInlineEnd: token.progressStepMarginInlineEnd,
          backgroundColor: token.progressRemainingColor,
          transition: `all ${token.motionDurationSlow}`,

          '&-active': {
            backgroundColor: token.colorInfo,
          },
        },
      },
    },
  };
};

const genSmallLine: GenerateStyle<ProgressToken> = (token: ProgressToken): CSSObject => {
  const { componentCls: progressCls, iconCls: iconPrefixCls } = token;

  return {
    [progressCls]: {
      [`${progressCls}-small&-line, ${progressCls}-small&-line ${progressCls}-text ${iconPrefixCls}`]:
        {
          fontSize: token.fontSizeSM,
        },
    },
  };
};

export default genComponentStyleHook('Progress', token => {
  const progressStepMarginInlineEnd = token.marginXXS / 2;

  const progressToken = mergeToken<ProgressToken>(token, {
    progressLineRadius: 100, // magic for capsule shape, should be a very large number
    progressInfoTextColor: token.colorText,
    progressDefaultColor: token.colorInfo,
    progressRemainingColor: token.colorFillSecondary,
    progressStepMarginInlineEnd,
    progressStepMinWidth: progressStepMarginInlineEnd,
    progressActiveMotionDuration: '2.4s',
  });
  return [
    genBaseStyle(progressToken),
    genCircleStyle(progressToken),
    genStepStyle(progressToken),
    genSmallLine(progressToken),
  ];
});
