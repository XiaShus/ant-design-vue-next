---
category: Components
type: Data Display
title: Statistic
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BPWDRbSYxJ4AAAAAAAAAAAAADrJ8AQ/original
---

Display statistic number.

## When To Use

- When want to highlight some data.
- When want to display statistic data with description.

## API

### Statistic

| Property         | Description                   | Type                        | Default |
| ---------------- | ----------------------------- | --------------------------- | ------- |
| decimalSeparator | decimal separator             | string                      | .       |
| formatter        | customize value display logic | v-slot \|({value}) => VNode | -       |
| groupSeparator   | group separator               | string                      | ,       |
| precision        | precision of input value      | number                      | -       |
| prefix           | prefix node of value          | string \| v-slot            | -       |
| suffix           | suffix node of value          | string \| v-slot            | -       |
| title            | Display title                 | string \| v-slot            | -       |
| value            | Display value                 | string \| number            | -       |
| valueStyle       | Set value css style           | style                       | -       |

### Statistic.Timer

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | Timer direction | `countdown` \| `countup` | `countdown` | 4.31.0 |
| format | Format as [dayjs](https://day.js.org/) | string | `HH:mm:ss` | 4.31.0 |
| prefix | prefix node of value | string \| v-slot | - | 4.31.0 |
| suffix | suffix node of value | string \| v-slot | - | 4.31.0 |
| title | Display title | string \| v-slot | - | 4.31.0 |
| value | Target time for countdown, or start time for countup (ms) | number | - | 4.31.0 |
| valueStyle | Set value css style | style | - | 4.31.0 |

#### Statistic.Timer Events

| Events Name | Description                     | Arguments               | Version |
| ----------- | ------------------------------- | ----------------------- | ------- |
| finish      | Trigger when countdown finishes | () => void              | 4.31.0  |
| change      | Trigger when time changes       | (value: number) => void | 4.31.0  |

### Statistic.Countdown

> Prefer `Statistic.Timer` with `type="countdown"` (antd ≥ 5.25).

| Property   | Description                            | Type             | Default    |
| ---------- | -------------------------------------- | ---------------- | ---------- |
| format     | Format as [dayjs](https://day.js.org/) | string           | 'HH:mm:ss' |
| prefix     | prefix node of value                   | string \| v-slot | -          |
| suffix     | suffix node of value                   | string \| v-slot | -          |
| title      | Display title                          | string \| v-slot | -          |
| value      | Set target countdown time              | number \| dayjs  | -          |
| valueStyle | Set value css style                    | style            | -          |

#### Statistic.Countdown Events

| Events Name | Description            | Arguments  |     |
| ----------- | ---------------------- | ---------- | --- |
| finish      | Trigger when time's up | () => void | -   |
