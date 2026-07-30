---
category: Components
subtitle: 颜色选择器
type: 数据录入
title: ColorPicker
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RY4819UAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*epqATLSTMZcAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

用于颜色选择。对齐 Ant Design React `ColorPicker`（antd ≥ 5.5）的常用 API。

本组件自 **ant-design-vue-next@4.3.0** 起提供（社区续作新增）。

## 何时使用

当用户需要自定义选取颜色时使用。

## API

> 自 `ant-design-vue-next@4.3.0` 起可用。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| value(v-model) | 颜色值 | `string \| AggregationColor` | - | 4.3.0 |
| defaultValue | 默认颜色 | `string \| AggregationColor` | - | 4.3.0 |
| format | 颜色格式 | `hex \| rgb \| hsb` | - | 4.3.0 |
| defaultFormat | 默认格式 | `hex \| rgb \| hsb` | `hex` | 4.3.0 |
| allowClear | 允许清除颜色 | boolean | false | 4.3.0 |
| presets | 预设颜色 | `{ label, colors, defaultOpen?, key? }[]` | - | 4.3.0 |
| disabled | 禁用 | boolean | - | 4.3.0 |
| disabledAlpha | 禁用透明度 | boolean | false | 4.3.0 |
| open(v-model) | 是否打开弹层 | boolean | - | 4.3.0 |
| trigger | 触发方式 | `hover \| click` | `click` | 4.3.0 |
| placement | 弹出位置 | 同 Tooltip | `bottomLeft` | 4.3.0 |
| arrow | 箭头 | `boolean \| { pointAtCenter?: boolean }` | true | 4.3.0 |
| showText | 显示颜色文本 | `boolean \| (color) => any` | false | 4.3.0 |
| size | 触发器尺寸 | `large \| middle \| small` | - | 4.3.0 |
| destroyOnHidden | 关闭后是否销毁弹层（对齐 antd ≥ 5.25；兼容 `destroyTooltipOnHide`） | boolean | false | 4.14.0 |
| panelRender | 自定义面板内容；`extra.components` 含已绑定的 `Picker` / `Presets`（也可用同名插槽） | `(panel, extra) => any` | - | 4.15.0 |
| getPopupContainer | 弹层渲染容器 | `(node) => HTMLElement` | - | 4.3.0 |

### 事件

| 事件名称       | 说明     | 回调参数                                         | 版本  |
| -------------- | -------- | ------------------------------------------------ | ----- |
| change         | 颜色变化 | `(value: AggregationColor, css: string) => void` | 4.3.0 |
| changeComplete | 拾色结束 | `(value: AggregationColor) => void`              | 4.3.0 |
| formatChange   | 格式变化 | `(format) => void`                               | 4.3.0 |
| openChange     | 开关变化 | `(open: boolean) => void`                        | 4.3.0 |
| clear          | 清除     | `() => void`                                     | 4.3.0 |

### AggregationColor（Color）

| 方法                | 说明       | 版本  |
| ------------------- | ---------- | ----- |
| toHex / toHexString | hex        | 4.3.0 |
| toRgb / toRgbString | rgb        | 4.3.0 |
| toHsb / toHsbString | hsb        | 4.3.0 |
| toCssString         | CSS 字符串 | 4.3.0 |

### 差异 / 软跳过（相对 antd 5）

| 能力                                  | 状态                   |
| ------------------------------------- | ---------------------- |
| `mode` 渐变色                         | ⏭ 软跳过（后续小版本） |
| antd 6 `classNames` / `styles` 语义化 | ⏭ 阶段 B               |

默认插槽可用于自定义触发器；`panelRender` 插槽参数为 `{ panel, components }`。
