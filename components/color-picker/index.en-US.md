---
category: Components
type: Data Entry
title: ColorPicker
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PpY4RY4819UAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*epqATLSTMZcAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

Used for color selection. Aligns with Ant Design React `ColorPicker` (antd ≥ 5.5) common APIs.

Shipped in **ant-design-vue-next@4.3.0** (community continuation).

## When To Use

Used when the user needs to make a customized color selection.

## API

> Available since `ant-design-vue-next@4.3.0`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| value(v-model) | Color value | `string \| AggregationColor` | - | 4.3.0 |
| defaultValue | Default color | `string \| AggregationColor` | - | 4.3.0 |
| format | Color format | `hex \| rgb \| hsb` | - | 4.3.0 |
| defaultFormat | Default format | `hex \| rgb \| hsb` | `hex` | 4.3.0 |
| allowClear | Allow clearing | boolean | false | 4.3.0 |
| presets | Preset colors | `{ label, colors, defaultOpen?, key? }[]` | - | 4.3.0 |
| disabled | Disable | boolean | - | 4.3.0 |
| disabledAlpha | Disable alpha | boolean | false | 4.3.0 |
| disabledFormat | Hide format selector | boolean | false | 4.19.0 |
| open(v-model) | Popup open | boolean | - | 4.3.0 |
| trigger | Trigger mode | `hover \| click` | `click` | 4.3.0 |
| placement | Placement | same as Tooltip | `bottomLeft` | 4.3.0 |
| arrow | Arrow | `boolean \| { pointAtCenter?: boolean }` | true | 4.3.0 |
| showText | Show color text | `boolean \| (color) => any` | false | 4.3.0 |
| size | Trigger size | `large \| middle \| small` | - | 4.3.0 |
| destroyOnHidden | Destroy popup on hide (antd ≥ 5.25; alias of `destroyTooltipOnHide`) | boolean | false | 4.14.0 |
| panelRender | Custom panel; `extra.components` has bound `Picker` / `Presets` (or use the same-named slot) | `(panel, extra) => any` | - | 4.15.0 |
| getPopupContainer | Popup container | `(node) => HTMLElement` | - | 4.3.0 |

### Events

| Event          | Description    | Arguments                                        | Version |
| -------------- | -------------- | ------------------------------------------------ | ------- |
| change         | Color changed  | `(value: AggregationColor, css: string) => void` | 4.3.0   |
| changeComplete | Pick finished  | `(value: AggregationColor) => void`              | 4.3.0   |
| formatChange   | Format changed | `(format) => void`                               | 4.3.0   |
| openChange     | Open changed   | `(open: boolean) => void`                        | 4.3.0   |
| clear          | Cleared        | `() => void`                                     | 4.3.0   |

### Soft-skipped vs antd 5

| Feature                                 | Status                  |
| --------------------------------------- | ----------------------- |
| Gradient `mode`                         | soft-skip (later minor) |
| antd 6 semantic `classNames` / `styles` | stage B                 |

Default slot customizes the trigger. `panelRender` slot args: `{ panel, components }`.
