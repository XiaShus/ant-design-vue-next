import type { CSSObject } from '../../_util/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent } from '../../style';

export interface ComponentToken {}

interface ColorPickerToken extends FullToken<'ColorPicker'> {
  colorPickerWidth: number;
  colorPickerHandlerSize: number;
  colorPickerSliderHeight: number;
  colorPickerPreviewSize: number;
  colorPickerPresetColorSize: number;
}

const genColorPickerStyle: GenerateStyle<ColorPickerToken> = token => {
  const {
    componentCls,
    colorPickerWidth,
    colorPickerHandlerSize,
    colorPickerSliderHeight,
    colorPickerPreviewSize,
    colorPickerPresetColorSize,
    colorBorder,
    colorSplit,
    borderRadiusSM,
    borderRadius,
    motionDurationMid,
    colorBgContainer,
    colorText,
    fontSizeSM,
    marginXXS,
    marginXS,
    paddingXXS,
    paddingXS,
    lineWidth,
    controlHeightSM,
    controlHeightLG,
  } = token;

  const handler: CSSObject = {
    position: 'absolute',
    width: colorPickerHandlerSize,
    height: colorPickerHandlerSize,
    border: `${lineWidth * 2}px solid ${colorBgContainer}`,
    borderRadius: '50%',
    boxShadow: token.boxShadowSecondary,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  };

  return {
    [componentCls]: {
      ...resetComponent(token),
    },
    [`${componentCls}-trigger`]: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: marginXXS,
      paddingInline: paddingXXS,
      paddingBlock: paddingXXS,
      border: `${lineWidth}px solid ${colorBorder}`,
      borderRadius,
      background: colorBgContainer,
      cursor: 'pointer',
      transition: `all ${motionDurationMid}`,
      [`&-disabled`]: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      [`&-sm`]: {
        minHeight: controlHeightSM,
      },
      [`&-lg`]: {
        minHeight: controlHeightLG,
      },
      [`&:not(${componentCls}-trigger-disabled):hover`]: {
        borderColor: token.colorPrimaryHover,
      },
      [`&-active`]: {
        borderColor: token.colorPrimary,
        boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
      },
      [`${componentCls}-trigger-text`]: {
        fontSize: fontSizeSM,
        color: colorText,
        maxWidth: 160,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    [`${componentCls}-color-block`]: {
      position: 'relative',
      width: colorPickerPreviewSize,
      height: colorPickerPreviewSize,
      borderRadius: borderRadiusSM,
      background:
        'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0) 0 0 / 8px 8px',
      overflow: 'hidden',
      [`&-inner`]: {
        width: '100%',
        height: '100%',
      },
    },
    [`${componentCls}-overlay`]: {
      [`${componentCls}-panel`]: {
        width: colorPickerWidth,
        padding: paddingXS,
      },
      [`${componentCls}-saturation`]: {
        position: 'relative',
        width: '100%',
        height: colorPickerWidth - paddingXS * 2,
        marginBottom: marginXS,
        borderRadius: borderRadiusSM,
        backgroundImage:
          'linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, rgba(255,255,255,0))',
        cursor: 'crosshair',
        [`&-handler`]: {
          ...handler,
          top: 0,
          left: 0,
        },
      },
      [`${componentCls}-slider-container`]: {
        display: 'flex',
        alignItems: 'center',
        gap: marginXS,
        marginBottom: marginXS,
      },
      [`${componentCls}-slider-group`]: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: marginXXS,
      },
      [`${componentCls}-slider`]: {
        position: 'relative',
        height: colorPickerSliderHeight,
        borderRadius: colorPickerSliderHeight,
        cursor: 'pointer',
        [`&-hue`]: {
          background:
            'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
        },
        [`&-alpha`]: {
          backgroundColor: colorBgContainer,
          backgroundImage:
            'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0)',
          backgroundSize: '8px 8px',
        },
        [`&-handler`]: handler,
      },
      [`${componentCls}-input-container`]: {
        display: 'flex',
        alignItems: 'center',
        gap: marginXXS,
        marginBottom: marginXS,
        [`.ant-input`]: {
          flex: 1,
        },
      },
      [`${componentCls}-clear`]: {
        width: controlHeightSM - 8,
        height: controlHeightSM - 8,
        border: `${lineWidth}px solid ${colorSplit}`,
        borderRadius: borderRadiusSM,
        cursor: 'pointer',
        position: 'relative',
        background:
          'conic-gradient(rgba(0,0,0,0.06) 0 25%, transparent 0 50%, rgba(0,0,0,0.06) 0 75%, transparent 0) 0 0 / 8px 8px',
        [`&::after`]: {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom right, transparent calc(50% - 1px), ${token.colorError} calc(50% - 1px), ${token.colorError} calc(50% + 1px), transparent calc(50% + 1px))`,
        },
      },
      [`${componentCls}-presets`]: {
        borderTop: `${lineWidth}px solid ${colorSplit}`,
        paddingTop: marginXS,
      },
      [`${componentCls}-presets-label`]: {
        marginBottom: marginXXS,
        fontSize: fontSizeSM,
        color: colorText,
      },
      [`${componentCls}-presets-colors`]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: marginXXS,
      },
      [`${componentCls}-presets-color`]: {
        width: colorPickerPresetColorSize,
        height: colorPickerPresetColorSize,
        borderRadius: borderRadiusSM,
        border: `${lineWidth}px solid ${colorSplit}`,
        cursor: 'pointer',
      },
      [`${componentCls}-presets-group + ${componentCls}-presets-group`]: {
        marginTop: marginXS,
      },
    },
  };
};

export default genComponentStyleHook<'ColorPicker'>('ColorPicker', token =>
  genColorPickerStyle(
    mergeToken<ColorPickerToken>(token, {
      colorPickerWidth: 234,
      colorPickerHandlerSize: 16,
      colorPickerSliderHeight: 8,
      colorPickerPreviewSize: 28,
      colorPickerPresetColorSize: 24,
    }),
  ),
);
