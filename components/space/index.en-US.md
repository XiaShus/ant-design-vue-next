---
category: Components
type: Layout
title: Space
cols: 1
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZiJ3SbOH9SUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*37T2R6O9oi0AAAAAAAAAAAAADrJ8AQ/original
---

Set components spacing.

## When To Use

- Avoid components clinging together and set a unified space.
- Use Space.Compact when child form components are compactly connected and the border is collapsed (After version `ant-design-vue@4.0.0` Supported).

## API

### Space

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | Align items | `start` \| `end` \|`center` \|`baseline` | - | 1.6.5 |
| direction | The space direction (also accepts `orientation`) | `vertical` \| `horizontal` | `horizontal` | 1.6.5 |
| orientation | The space direction | `vertical` \| `horizontal` | `horizontal` | 4.48.0 |
| separator | Set separator | VueNode \| v-slot:separator | - | 4.48.0 |
| size | The space size | `small` \| `middle` \| `large` \| `number` | `small` | 1.6.5 |
| split | Set split (also accepts `separator`) | VueNode \| v-slot:split | - | 2.2.0 |
| vertical | Syntactic sugar for `orientation="vertical"` | boolean | `false` | 4.48.0 |
| wrap | Auto wrap line, when `horizontal` effective | boolean | false | 2.2.0 |

### Space.Compact

Use Space.Compact when child form components are compactly connected and the border is collapsed. The supported components are：

- Button
- AutoComplete
- Cascader
- DatePicker
- Input/Input.Search
- Select
- TimePicker
- TreeSelect

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit width to its parent\'s width | boolean | false | 4.0.0 |
| direction | Set direction of layout | `vertical` \| `horizontal` | `horizontal` | 4.0.0 |
| size | Set child component size | `large` \| `middle` \| `small` | `middle` | 4.0.0 |
