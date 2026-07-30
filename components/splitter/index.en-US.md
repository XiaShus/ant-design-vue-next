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
| lazy | Lazy drag preview (soft-skipped full impl) | boolean | false | 4.4.0 |

### Events

| Event       | Description  | Arguments                   | Version |
| ----------- | ------------ | --------------------------- | ------- |
| resize      | Size changed | `(sizes: number[]) => void` | 4.4.0   |
| resizeStart | Drag start   | `(sizes: number[]) => void` | 4.4.0   |
| resizeEnd   | Drag end     | `(sizes: number[]) => void` | 4.4.0   |

### Panel

| Property        | Description              | Type               | Default | Version              |
| --------------- | ------------------------ | ------------------ | ------- | -------------------- |
| defaultSize     | Initial size (px or `%`) | `number \| string` | -       | 4.4.0                |
| size            | Controlled size          | `number \| string` | -       | 4.4.0                |
| min / max       | Thresholds               | `number \| string` | -       | 4.4.0                |
| resizable       | Enable drag              | boolean            | true    | 4.4.0                |
| collapsible     | Quick folding            | boolean \| object  | false   | 4.4.0 (API reserved) |
| destroyOnHidden | Destroy when collapsed   | boolean            | -       | 4.4.0                |

### Soft-skipped

| Feature                                    | Status      |
| ------------------------------------------ | ----------- |
| Full collapsible UI / lazy preview bar     | later minor |
| antd 6 `orientation` / semantic classNames | stage B     |
