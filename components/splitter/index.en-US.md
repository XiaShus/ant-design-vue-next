---
category: Components
type: Layout
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*k4V4RK76WzMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*L4X5RbCZneAAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

Resizable split panel layout. Aligns with Ant Design React `Splitter` (antd ≥ 5.21) common APIs.

Available since **ant-design-vue-next@4.4.0**.

## When To Use

Separate areas horizontally or vertically and allow dragging to adjust panel sizes.

## API

> Children only support `Splitter.Panel`.

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout direction | `horizontal \| vertical` | `horizontal` | 4.4.0 |
| lazy | Lazy drag: show preview bar while dragging, apply on mouse up | boolean | false | 4.16.0 |

### Events

| Event       | Description     | Arguments                   | Version |
| ----------- | --------------- | --------------------------- | ------- |
| resize      | Size changed    | `(sizes: number[]) => void` | 4.4.0   |
| resizeStart | Drag start      | `(sizes: number[]) => void` | 4.4.0   |
| resizeEnd   | Drag end        | `(sizes: number[]) => void` | 4.4.0   |
| collapse    | Collapse change | `(sizes: number[]) => void` | 4.16.0  |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultSize | Initial size (px or `%`) | `number \| string` | - | 4.4.0 |
| size | Controlled size | `number \| string` | - | 4.4.0 |
| min / max | Thresholds | `number \| string` | - | 4.4.0 |
| resizable | Enable drag | boolean | true | 4.4.0 |
| collapsible | Quick folding; `true` enables both sides | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | false | 4.16.0 |
| destroyOnHidden | Destroy when collapsed | boolean | - | 4.4.0 |

### Soft-skipped

| Feature                                    | Status  |
| ------------------------------------------ | ------- |
| antd 6 `orientation` / semantic classNames | stage B |
