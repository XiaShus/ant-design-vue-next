# ant-design-vue-next 对齐看板

> **当前阶段：A** — 以 `ant-design-vue@4.2.6` 为基线，优先补齐 React **antd 5.x** 剩余缺口。  
> **阶段 B（未开工）**：单独规划对齐 antd 6（勿宣称已完整对齐）。  
> 对照版本参考：antd React **5.x 末期能力**（及文档中标注的 5.x 引入版本）；antd 6 新件单独标「阶段 B」。

图例：

| 标记 | 含义                              |
| ---- | --------------------------------- |
| ✅   | Vue Next 已有，与 antd 5 主干可用 |
| ⚠️   | 已有但 API / 行为有缺口或差异     |
| ❌   | 缺失（阶段 A 候选）               |
| ⏭    | 软跳过 / 阶段 B（antd 6 或大改）  |
| 🔄   | 本仓库续作中新增或增强            |

与平行社区方案 [`antdv-next`](https://github.com/antdv-next/antdv-next) **不合并、不冒充**；本表只跟踪本仓库相对 antd / 原 antdv 的进度。

---

## General

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| General | Button | ✅ | ✅ | [button](../../components/button) | — |
| General | FloatButton | ✅ 5.0 | ✅ | [float-button](../../components/float-button) | — |
| General | Icon | ✅ | ✅（`@ant-design/icons-vue`） | — | 图标包独立 |
| General | Typography | ✅ | ✅ | [typography](../../components/typography) | — |

## Layout

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Layout | Divider | ✅ | ✅ | [divider](../../components/divider) | — |
| Layout | Flex | ✅ 5.10 | ✅ | [flex](../../components/flex) | — |
| Layout | Grid | ✅ | ✅ | [grid](../../components/grid) | — |
| Layout | Layout | ✅ | ✅ | [layout](../../components/layout) | — |
| Layout | Space | ✅ | ✅ | [space](../../components/space) | — |
| Layout | Splitter | ✅ 5.21 | 🔄 ✅ 4.4.0 | [splitter](../../components/splitter) | 拖拽/min/max/受控；⏭ 完整 collapsible / lazy |
| Layout | Masonry | ✅ 6.0 | ⏭ | — | 阶段 B（antd 6） |

## Navigation

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Navigation | Anchor | ✅ | ✅ | [anchor](../../components/anchor) | — |
| Navigation | Breadcrumb | ✅ | ✅ | [breadcrumb](../../components/breadcrumb) | — |
| Navigation | Dropdown | ✅ | ✅ | [dropdown](../../components/dropdown) | — |
| Navigation | Menu | ✅ | ✅ | [menu](../../components/menu) | — |
| Navigation | Pagination | ✅ | ✅ | [pagination](../../components/pagination) | — |
| Navigation | Steps | ✅ | ✅ | [steps](../../components/steps) | — |
| Navigation | Tabs | ✅ | ✅ | [tabs](../../components/tabs) | — |

## Data Entry

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Data Entry | AutoComplete | ✅ | ✅ | [auto-complete](../../components/auto-complete) | — |
| Data Entry | Cascader | ✅ | ✅ | [cascader](../../components/cascader) | — |
| Data Entry | Checkbox | ✅ | ✅ | [checkbox](../../components/checkbox) | — |
| Data Entry | ColorPicker | ✅ 5.5 | 🔄 ✅ 4.3.0 | [color-picker](../../components/color-picker) | 单色/预设/清除/格式；⏭ 渐变 mode、panelRender |
| Data Entry | DatePicker | ✅ | ✅ | [date-picker](../../components/date-picker) | ⚠️ 与 antd 5 晚期 props 可能有差，按需补 |
| Data Entry | Form | ✅ | ✅ | [form](../../components/form) | ⚠️ 高频，逐项对齐 |
| Data Entry | Input | ✅ | ✅ | [input](../../components/input) | ❌ 缺 `Input.OTP`（antd 5.12+） |
| Data Entry | InputNumber | ✅ | ✅ | [input-number](../../components/input-number) | — |
| Data Entry | Mentions | ✅ | ✅ | [mentions](../../components/mentions) | — |
| Data Entry | Radio | ✅ | ✅ | [radio](../../components/radio) | — |
| Data Entry | Rate | ✅ | ✅ | [rate](../../components/rate) | — |
| Data Entry | Select | ✅ | ✅ | [select](../../components/select) | ⚠️ 按需补缺口 |
| Data Entry | Slider | ✅ | ✅ | [slider](../../components/slider) | — |
| Data Entry | Switch | ✅ | ✅ | [switch](../../components/switch) | — |
| Data Entry | TimePicker | ✅ | ✅ | [time-picker](../../components/time-picker) | — |
| Data Entry | Transfer | ✅ | ✅ | [transfer](../../components/transfer) | — |
| Data Entry | TreeSelect | ✅ | ✅ | [tree-select](../../components/tree-select) | — |
| Data Entry | Upload | ✅ | ✅ | [upload](../../components/upload) | — |

## Data Display

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Data Display | Avatar | ✅ | ✅ | [avatar](../../components/avatar) | — |
| Data Display | Badge | ✅ | ✅ | [badge](../../components/badge) | — |
| Data Display | Calendar | ✅ | ✅ | [calendar](../../components/calendar) | — |
| Data Display | Card | ✅ | ✅ | [card](../../components/card) | — |
| Data Display | Carousel | ✅ | ✅ | [carousel](../../components/carousel) | — |
| Data Display | Collapse | ✅ | ✅ | [collapse](../../components/collapse) | — |
| Data Display | Descriptions | ✅ | ✅ | [descriptions](../../components/descriptions) | — |
| Data Display | Empty | ✅ | ✅ | [empty](../../components/empty) | — |
| Data Display | Image | ✅ | ✅ | [image](../../components/image) | — |
| Data Display | List | ✅ | ✅ | [list](../../components/list) | React 6 标 DEPRECATED；阶段 B 再议 |
| Data Display | Popover | ✅ | ✅ | [popover](../../components/popover) | — |
| Data Display | QRCode | ✅ 5.1 | ✅ | [qrcode](../../components/qrcode) | — |
| Data Display | Segmented | ✅ | ✅ | [segmented](../../components/segmented) | — |
| Data Display | Statistic | ✅ | ✅ | [statistic](../../components/statistic) | — |
| Data Display | Table | ✅ | ✅ | [table](../../components/table) | ⚠️ 高频，逐项对齐 |
| Data Display | Tag | ✅ | ✅ | [tag](../../components/tag) | — |
| Data Display | Timeline | ✅ | ✅ | [timeline](../../components/timeline) | — |
| Data Display | Tooltip | ✅ | ✅ | [tooltip](../../components/tooltip) | — |
| Data Display | Tour | ✅ 5.0 | ✅ | [tour](../../components/tour) | — |
| Data Display | Tree | ✅ | ✅ | [tree](../../components/tree) | — |

## Feedback

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Feedback | Alert | ✅ | ✅ | [alert](../../components/alert) | — |
| Feedback | Drawer | ✅ | ✅ | [drawer](../../components/drawer) | — |
| Feedback | Message | ✅ | ✅ | [message](../../components/message) | — |
| Feedback | Modal | ✅ | ✅ | [modal](../../components/modal) | ⚠️ 按需补缺口 |
| Feedback | Notification | ✅ | ✅ | [notification](../../components/notification) | — |
| Feedback | Popconfirm | ✅ | ✅ | [popconfirm](../../components/popconfirm) | — |
| Feedback | Progress | ✅ | ✅ | [progress](../../components/progress) | — |
| Feedback | Result | ✅ | ✅ | [result](../../components/result) | — |
| Feedback | Skeleton | ✅ | ✅ | [skeleton](../../components/skeleton) | — |
| Feedback | Spin | ✅ | ✅ | [spin](../../components/spin) | — |
| Feedback | Watermark | ✅ 5.1 | ✅ | [watermark](../../components/watermark) | — |

## Other

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Other | Affix | ✅ | ✅ | [affix](../../components/affix) | — |
| Other | App | ✅ 5.1 | ✅ | [app](../../components/app) | — |
| Other | ConfigProvider | ✅ | ✅ | [config-provider](../../components/config-provider) | ⚠️ 主题 / css-in-js 与 antd 5 剩余差异待盘点 |
| Other | BorderBeam | ✅ 6.4 | ⏭ | — | 阶段 B |
| Other | theme / css-in-js | ✅ | ✅（沿用 antdv 混合栈） | — | 不在首周做完整重写 |

---

## 阶段 A 候选队列（按可感知价值）

1. ~~**ColorPicker**（antd 5.5）~~ — ✅ `4.3.0`
2. ~~**Splitter**（antd 5.21）~~ — ✅ `4.4.0`
3. **Input.OTP**（antd 5.12）— 下一候选
4. ConfigProvider / 主题剩余差异（拆小 PR）
5. Table / Form / DatePicker / Select / Modal 高频 API 缺口（逐项发版）
6. ColorPicker 渐变 `mode` / `panelRender`；Splitter collapsible / lazy 补齐

## 阶段 B（仅规划，不急实现）

- Masonry、BorderBeam 等 antd 6 组件
- antd 6 语义化 classNames/styles、更大范围 API 变更
- 完整 css-in-js / Design Token 与 React 6 对齐方案文档

---

_上次更新：`4.4.0` Splitter。每发一版请同步改本表。_
