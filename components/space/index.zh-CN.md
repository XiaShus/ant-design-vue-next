---
category: Components
type: 布局
subtitle: 间距
title: Space
cols: 1
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZiJ3SbOH9SUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*37T2R6O9oi0AAAAAAAAAAAAADrJ8AQ/original
---

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。
- 需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact（自 `ant-design-vue@4.0.0` 版本开始提供该组件）。

## API

### Space

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 对齐方式 | `start` \| `end` \|`center` \|`baseline` | - | 1.6.5 |
| classNames | 语义化结构 className | { root?: string; item?: string; separator?: string } | - | 4.76.0 |
| direction | 间距方向（也可用 `orientation`） | `vertical` \| `horizontal` | `horizontal` | 1.6.5 |
| orientation | 间距方向 | `vertical` \| `horizontal` | `horizontal` | 4.48.0 |
| separator | 设置分隔符 | VueNode \| v-slot:separator | - | 4.48.0 |
| size | 间距大小 | `small` \| `middle` \| `large` \| `number` | `small` | 1.6.5 |
| split | 设置拆分（也可用 `separator`） | VueNode \| v-slot:split | - | 2.2.0 |
| styles | 语义化结构 style | { root?: CSSProperties; item?: CSSProperties; separator?: CSSProperties } | - | 4.76.0 |
| vertical | `orientation="vertical"` 的语法糖 | boolean | `false` | 4.48.0 |
| wrap | 是否自动换行，仅在 `horizontal` 时有效 | boolean | false | 2.2.0 |

### Space.Compact

> 自 ant-design-vue@4.0.0 版本开始提供该组件。

需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact。支持的组件有：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- InputNumber
- Select
- TimePicker
- TreeSelect

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false | 4.0.0 |
| direction | 指定排列方向 | `vertical` \| `horizontal` | `horizontal` | 4.0.0 |
| orientation | `direction` 别名 | `vertical` \| `horizontal` | `horizontal` | 4.76.0 |
| size | 子组件大小 | `large` \| `middle` \| `small` | `middle` | 4.0.0 |
| vertical | `orientation="vertical"` 的语法糖 | boolean | `false` | 4.76.0 |

### Space.Addon

在 Compact 中创建自定义附属单元。自 `4.77.0` 起提供。

| 参数 | 说明                       | 类型    | 默认值 | 版本   |
| ---- | -------------------------- | ------- | ------ | ------ |
| -    | 通过默认插槽传入自定义内容 | VueNode | -      | 4.77.0 |
