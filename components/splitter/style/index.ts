import type { CSSObject } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';

export interface ComponentToken {
  splitBarSize: number;
  splitTriggerSize: number;
  splitBarDraggableSize: number;
}

interface SplitterToken extends FullToken<'Splitter'> {}

const genSplitterStyle: GenerateStyle<SplitterToken> = token => {
  const {
    componentCls,
    splitBarSize,
    splitTriggerSize,
    splitBarDraggableSize,
    colorFill,
    controlItemBgHover,
    controlItemBgActive,
    colorPrimary,
    colorText,
    colorBgElevated,
    borderRadiusSM,
    fontSizeSM,
    motionDurationSlow,
  } = token;

  const barCls = `${componentCls}-bar`;

  const collapseBar: CSSObject = {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colorText,
    background: colorBgElevated,
    borderRadius: borderRadiusSM,
    cursor: 'pointer',
    fontSize: fontSizeSM,
    opacity: 0,
    transition: `opacity ${motionDurationSlow}`,
    [`&-always-visible`]: {
      opacity: 1,
    },
    [`&-always-hidden`]: {
      display: 'none',
    },
    [`&-hover-only`]: {},
    [`${barCls}-collapse-icon`]: {
      fontSize: 10,
      pointerEvents: 'none',
    },
  };

  const barCommon: CSSObject = {
    position: 'relative',
    flex: 'none',
    background: 'transparent',
    userSelect: 'none',
    [`&-disabled`]: {
      cursor: 'default',
    },
    [`${barCls}-dragger`]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: colorFill,
      borderRadius: token.borderRadiusXS,
      transition: `background ${motionDurationSlow}`,
    },
    [`&:hover:not(${barCls}-disabled) ${barCls}-dragger, &-active ${barCls}-dragger`]: {
      background: colorPrimary,
    },
    [`&:hover ${barCls}-collapse-bar-hover-only, &-active ${barCls}-collapse-bar-hover-only`]: {
      opacity: 1,
    },
    [`${barCls}-collapse-bar`]: collapseBar,
    [`${barCls}-preview`]: {
      position: 'absolute',
      background: colorPrimary,
      opacity: 0.35,
      pointerEvents: 'none',
      zIndex: 2,
    },
  };

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'stretch',

      [`&-horizontal`]: {
        flexDirection: 'row',
        [`${barCls}`]: {
          ...barCommon,
          width: splitTriggerSize,
          cursor: 'col-resize',
          [`${barCls}-dragger`]: {
            width: splitBarSize,
            height: splitBarDraggableSize,
          },
          [`${barCls}-collapse-bar`]: {
            width: 16,
            height: 24,
            top: '50%',
            transform: 'translateY(-50%)',
          },
          [`${barCls}-collapse-bar-start`]: {
            insetInlineStart: '100%',
            marginInlineStart: 2,
          },
          [`${barCls}-collapse-bar-end`]: {
            insetInlineEnd: '100%',
            marginInlineEnd: 2,
          },
          [`${barCls}-preview`]: {
            top: 0,
            bottom: 0,
            width: splitBarSize,
            insetInlineStart: `calc(50% + var(--splitter-bar-preview-offset, 0px))`,
            transform: 'translateX(-50%)',
          },
        },
      },

      [`&-vertical`]: {
        flexDirection: 'column',
        [`${barCls}`]: {
          ...barCommon,
          height: splitTriggerSize,
          cursor: 'row-resize',
          [`${barCls}-dragger`]: {
            width: splitBarDraggableSize,
            height: splitBarSize,
          },
          [`${barCls}-collapse-bar`]: {
            width: 24,
            height: 16,
            left: '50%',
            transform: 'translateX(-50%)',
          },
          [`${barCls}-collapse-bar-start`]: {
            top: '100%',
            marginTop: 2,
          },
          [`${barCls}-collapse-bar-end`]: {
            bottom: '100%',
            marginBottom: 2,
          },
          [`${barCls}-preview`]: {
            left: 0,
            right: 0,
            height: splitBarSize,
            top: `calc(50% + var(--splitter-bar-preview-offset, 0px))`,
            transform: 'translateY(-50%)',
          },
        },
      },

      [`&-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-panel`]: {
        minWidth: 0,
        minHeight: 0,
        [`&-hidden`]: {
          overflow: 'hidden',
          padding: 0,
          border: 'none',
        },
      },
    },
    [`${componentCls} ${barCls}:hover:not(${barCls}-disabled)`]: {
      background: controlItemBgHover,
    },
    [`${componentCls} ${barCls}-active`]: {
      background: controlItemBgActive,
    },
  };
};

export default genComponentStyleHook<'Splitter'>(
  'Splitter',
  token =>
    genSplitterStyle(
      mergeToken<SplitterToken>(token, {
        splitBarSize: 2,
        splitTriggerSize: 6,
        splitBarDraggableSize: 20,
      }),
    ),
  () => ({
    splitBarSize: 2,
    splitTriggerSize: 6,
    splitBarDraggableSize: 20,
  }),
);
