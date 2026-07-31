---
category: Components
type: 数据展示
title: Statistic
subtitle: 统计数值
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
---

展示统计数值。

## 何时使用

- 当需要突出某个或某组数字时
- 当需要展示带描述的统计类数据时使用

## API

### Statistic

| 参数             | 说明             | 类型                         | 默认值 | 版本   |
| ---------------- | ---------------- | ---------------------------- | ------ | ------ |
| decimalSeparator | 设置小数点       | string                       | .      |        |
| formatter        | 自定义数值展示   | v-slot \| ({value}) => VNode | -      |        |
| groupSeparator   | 设置千分位标识符 | string                       | ,      |        |
| loading          | 数值是否加载中   | boolean                      | false  | 4.78.0 |
| precision        | 数值精度         | number                       | -      |        |
| prefix           | 设置数值的前缀   | string \| v-slot             | -      |        |
| suffix           | 设置数值的后缀   | string \| v-slot             | -      |        |
| title            | 数值的标题       | string \| v-slot             | -      |        |
| value            | 数值内容         | string \| number             | -      |        |
| valueStyle       | 设置数值的样式   | style                        | -      |        |

### Statistic.Timer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 计时方向 | `countdown` \| `countup` | `countdown` | 4.31.0 |
| format | 格式化时间展示，参考 [dayjs](https://day.js.org/) | string | `HH:mm:ss` | 4.31.0 |
| prefix | 设置数值的前缀 | string \| v-slot | - | 4.31.0 |
| suffix | 设置数值的后缀 | string \| v-slot | - | 4.31.0 |
| title | 数值的标题 | string \| v-slot | - | 4.31.0 |
| value | 倒计时目标时间，或正计时起始时间（毫秒时间戳） | number | - | 4.31.0 |
| valueStyle | 设置数值的样式 | style | - | 4.31.0 |

#### Statistic.Timer 事件

| 事件名称 | 说明             | 回调参数                | 版本   |
| -------- | ---------------- | ----------------------- | ------ |
| finish   | 倒计时完成时触发 | () => void              | 4.31.0 |
| change   | 时间变化时触发   | (value: number) => void | 4.31.0 |

### Statistic.Countdown

> 推荐使用 `Statistic.Timer` 并设置 `type="countdown"`（对齐 antd ≥ 5.25）。

| 参数       | 说明                                                | 类型             | 默认值     |
| ---------- | --------------------------------------------------- | ---------------- | ---------- |
| format     | 格式化倒计时展示，参考 [dayjs](https://day.js.org/) | string           | 'HH:mm:ss' |
| prefix     | 设置数值的前缀                                      | string \| v-slot | -          |
| suffix     | 设置数值的后缀                                      | string \| v-slot | -          |
| title      | 数值的标题                                          | string \| v-slot | -          |
| value      | 数值内容                                            | number \| dayjs  | -          |
| valueStyle | 设置数值的样式                                      | style            | -          |

#### Statistic.Countdown 事件

| 事件名称 | 说明             | 回调参数   |
| -------- | ---------------- | ---------- |
| finish   | 倒计时完成时触发 | () => void |
