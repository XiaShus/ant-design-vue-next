---
category: Components
subtitle: 头像
type: 数据展示
title: Avatar
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JJBSS5lBG4IAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YbgyQaRGz-UAAAAAAAAAAAAADrJ8AQ/original
---

用来代表用户或事物，支持图片、图标或字符展示。

## 设计师专属

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，一键填充高逼格头像和文本。

## API

### Avatar

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像无法显示时的替代文本 | string | - |  |
| crossOrigin | cors 属性设置 | `'anonymous'` \| `'use-credentials'` \| `''` | - | 3.0 |
| draggable | 图片是否允许拖动 | boolean \| `'true'` \| `'false'` | - | 2.2.0 |
| gap | 字符类型距离左右两侧边界单位像素 | number | 4 | 2.2.0 |
| icon | 设置头像的图标类型，可设为 Icon 的 `type` 或 VNode | VNode \| slot | - |  |
| loadError | 图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为 | () => boolean | - |  |
| shape | 指定头像的形状 | `circle` \| `square` | `circle` |  |
| size | 设置头像的大小 | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` | 2.2.0 |
| src | 图片类头像的资源地址 | string | - |  |
| srcset | 设置图片类头像响应式资源地址 | string | - |  |

### Avatar.Group (2.2.0)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| max | 最大显示数相关配置 | `{ count?: number; style?: CSSProperties; popover?: PopoverProps }` | - | 4.28.0 |
| maxCount | 显示的最大头像个数，请使用 `max={{ count }}` | number | - |  |
| maxPopoverPlacement | 多余头像气泡弹出位置，请使用 `max={{ popover }}` | `top` \| `bottom` | `top` |  |
| maxPopoverTrigger | 设置多余头像 Popover 的触发方式，请使用 `max={{ popover }}` | `hover` \| `focus` \| `click` | `hover` | 3.0 |
| maxStyle | 多余头像样式，请使用 `max={{ style }}` | CSSProperties | - |  |
| size | 设置头像的大小 | number \| `large` \| `small` \| `default` \| { xs: number, sm: number, ...} | `default` |  |
| shape | 设置头像的形状 | `circle` \| `square` | `circle` | 4.0 |
