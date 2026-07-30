import { anyType, functionType, objectType, stringType } from '../_util/type';
import type { StatusRender } from './QrcodeStatus';

export interface ImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
}

export type IconSize = number | { width: number; height: number };

export const qrProps = () => {
  return {
    size: { type: Number, default: 160 },
    value: { type: String, required: true },
    type: stringType<'canvas' | 'svg'>('canvas'),
    color: String,
    bgColor: String,
    includeMargin: Boolean,
    imageSettings: objectType<ImageSettings>(),
  };
};

export const qrcodeProps = () => {
  return {
    ...qrProps(),
    errorLevel: stringType<'L' | 'M' | 'Q' | 'H'>('M'),

    icon: String,
    /** Include image size. Object form since 4.26.0 (antd ≥ 5.19). */
    iconSize: anyType<IconSize>(40),

    status: stringType<'active' | 'expired' | 'loading' | 'scanned'>('active'),
    /** Custom status overlay render (antd ≥ 5.20). Also available as `statusRender` slot. */
    statusRender: functionType<StatusRender>(),
    bordered: { type: Boolean, default: true },
  };
};

export interface QRCodeCanvasColor {
  dark?: string; // 默认#000000ff
  light?: string; // 默认#ffffffff
}

export interface QRCodeCanvasOptions {
  version?: number;
  errorCorrectionLevel?: string; // 默认"M"
  maskPattern?: number; // 遮罩符号的掩码图案
  toSJISFunc?: Function; // 将汉字转换为其 Shift JIS 值的帮助程序函数
  margin?: number;
  scale?: number;
  small?: boolean;
  width: number;
  color?: QRCodeCanvasColor;
}
