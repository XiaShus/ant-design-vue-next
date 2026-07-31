---
category: Components
type: 数据展示
title: Image
subtitle: 图片
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FbOCS6aFMeUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LVQ3R5JjjJEAAAAAAAAAAAAADrJ8AQ/original
---

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像描述 | string | - | 2.0.0 |
| fallback | 加载失败容错地址 | string | - | 2.0.0 |
| height | 图像高度 | string \| number | - | 2.0.0 |
| placeholder | 加载占位, 为 `true` 时使用默认占位 | boolean \| slot | - | 2.0.0 |
| preview | 预览参数，为 `false` 时禁用 | boolean \| [previewType](#previewtype) | true | 2.0.0 |
| src | 图片地址 | string | - | 2.0.0 |
| previewMask | 自定义 mask | false \| function \| slot | - | 3.2.0 |
| width | 图像宽度 | string \| number | - | 2.0.0 |

### 事件

| 事件名称 | 说明         | 回调参数               | 版本  |
| -------- | ------------ | ---------------------- | ----- |
| error    | 加载错误回调 | (event: Event) => void | 3.2.0 |

### previewType

```ts
{
  visible?: boolean;
  onVisibleChange?: (visible, prevVisible) => void;
  getContainer: string | HTMLElement | (() => HTMLElement);
  src?: string;
  maskClassName?: string;
  current?: number;
  /** 自定义工具栏（对齐 antd ≥ 5.7）。`4.52.0+` */
  toolbarRender?: (
    originalNode: VNode,
    info: {
      icons: {
        flipYIcon: VNode;
        flipXIcon: VNode;
        rotateLeftIcon: VNode;
        rotateRightIcon: VNode;
        zoomOutIcon: VNode;
        zoomInIcon: VNode;
      };
      actions: {
        onActive?: (index: number) => void;
        onFlipY: () => void;
        onFlipX: () => void;
        onRotateLeft: () => void;
        onRotateRight: () => void;
        onZoomOut: () => void;
        onZoomIn: () => void;
        onReset: () => void;
        onClose: () => void;
      };
      transform: {
        x: number;
        y: number;
        rotate: number;
        scale: number;
        flipX: boolean;
        flipY: boolean;
      };
      current: number;
      total: number;
      image: { url: string; alt?: string; width?: number | string; height?: number | string };
    },
  ) => any;
  /** 预览图是否可拖拽。`4.67.0+`（对齐 antd ≥ 5.8） */
  movable?: boolean;
  /** 自定义预览图片节点。`4.67.0+`（对齐 antd ≥ 5.7） */
  imageRender?: (
    originalNode: VNode,
    info: {
      transform: {
        x: number;
        y: number;
        rotate: number;
        scale: number;
        flipX: boolean;
        flipY: boolean;
      };
      image: { url: string; alt?: string; width?: number | string; height?: number | string };
    },
  ) => any;
  /** 缩放步进。`4.79.0+`（对齐 antd ≥ 5.7） */
  scaleStep?: number; // 默认 0.5
  /** 最小缩放比例。`4.79.0+`（对齐 antd ≥ 5.7） */
  minScale?: number; // 默认 1
  /** 最大缩放比例。`4.79.0+`（对齐 antd ≥ 5.7） */
  maxScale?: number; // 默认 50
  /** 自定义关闭图标。`4.79.0+`（对齐 antd ≥ 5.7） */
  closeIcon?: VNode;
  /** 隐藏时销毁预览 DOM。`4.79.0+`（对齐 antd ≥ 5.25） */
  destroyOnHidden?: boolean;
}
```

其他属性见 [&lt;img>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)
