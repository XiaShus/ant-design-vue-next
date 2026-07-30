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
  } = token;

  const barCls = `${componentCls}-bar`;

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
      transition: `background ${token.motionDurationSlow}`,
    },
    [`&:hover:not(${barCls}-disabled) ${barCls}-dragger, &-active ${barCls}-dragger`]: {
      background: colorPrimary,
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
    // hover fill for bar area
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
