---
category: Components
subtitle: 分隔面板
type: 布局
title: Splitter
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*k4V4RK76WzMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*L4X5RbCZneAAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

可拖拽调整的分割面板布局。对齐 Ant Design React `Splitter`（antd ≥ 5.21）常用 API。

自 **ant-design-vue-next@4.4.0** 起提供。

## 何时使用

需要水平或垂直分割区域，并允许用户拖拽调整各区域尺寸时。

## API

> 子节点仅支持 `Splitter.Panel`。

### Splitter

| 参数   | 说明                           | 类型                     | 默认值       | 版本  |
| ------ | ------------------------------ | ------------------------ | ------------ | ----- |
| layout | 布局方向                       | `horizontal \| vertical` | `horizontal` | 4.4.0 |
| lazy   | 懒拖拽预览（暂软跳过完整实现） | boolean                  | false        | 4.4.0 |

### 事件

| 事件名称    | 说明     | 回调参数                    | 版本  |
| ----------- | -------- | --------------------------- | ----- |
| resize      | 尺寸变化 | `(sizes: number[]) => void` | 4.4.0 |
| resizeStart | 开始拖拽 | `(sizes: number[]) => void` | 4.4.0 |
| resizeEnd   | 结束拖拽 | `(sizes: number[]) => void` | 4.4.0 |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultSize | 初始尺寸（px 或 `%`） | `number \| string` | - | 4.4.0 |
| size | 受控尺寸 | `number \| string` | - | 4.4.0 |
| min / max | 阈值 | `number \| string` | - | 4.4.0 |
| resizable | 是否可拖拽 | boolean | true | 4.4.0 |
| collapsible | 快速折叠 | boolean \| object | false | 4.4.0（API 保留，行为后续补齐） |
| destroyOnHidden | 折叠销毁内容 | boolean | - | 4.4.0 |

### 差异 / 软跳过

| 能力                                       | 状态         |
| ------------------------------------------ | ------------ |
| 完整 collapsible UI / lazy 预览条          | ⏭ 后续小版本 |
| antd 6 `orientation` / semantic classNames | ⏭ 阶段 B     |
