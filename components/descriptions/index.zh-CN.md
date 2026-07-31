---
category: Components
type: 数据展示
title: Descriptions
subtitle: 描述列表
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*fHdlTpif6XQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d27AQJrowGAAAAAAAAAAAAAADrJ8AQ/original
---

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### Descriptions props

| 参数 | 说明 | 类型 | 默认值 | 版本 |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |  |  |
| classNames | 语义化结构 className | { root?: string; header?: string; title?: string; extra?: string; label?: string; content?: string } | - | 4.67.0 |  |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true |  |  |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 |  |  |  |
| contentStyle | 自定义内容样式，请使用 `styles.content` | CSSProperties | - | 2.2.0 |  |  |
| extra | 描述列表的操作区域，显示在右上方 | string \| VNode \| slot | - | 2.0.0 |  |  |
| items | 描述列表的内容配置 | [DescriptionsItemType](#descriptionsitemtype)[] | - | 4.32.0 |  |  |
| labelStyle | 自定义标签样式，请使用 `styles.label` | CSSProperties | - | 2.2.0 |  |  |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` |  |  |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | `default` |  |
| styles | 语义化结构 style | { root?: CSSProperties; header?: CSSProperties; title?: CSSProperties; extra?: CSSProperties; label?: CSSProperties; content?: CSSProperties } | - | 4.67.0 |  |  |
| title | 描述列表的标题，显示在最顶部 | string \| VNode \| slot | - |  |  |  |

#### DescriptionsItemType

```ts
type DescriptionsItemType = {
  key?: string | number;
  label?: VueNode;
  children?: VueNode;
  span?: number;
  labelStyle?: CSSProperties;
  contentStyle?: CSSProperties;
};
```

### Item props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| contentStyle | 自定义内容样式，请使用 `styles.content` | CSSProperties | - | 2.2.0 |
| label | 内容的描述 | string \| VNode \| slot | - |  |
| labelStyle | 自定义标签样式，请使用 `styles.label` | CSSProperties | - | 2.2.0 |
| span | 包含列的数量 | number | 1 |  |

> span 是 Descriptions.Item 的数量。 span={2} 会占用两个 DescriptionsItem 的宽度。
