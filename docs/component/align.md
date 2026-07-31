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
| General | Button | ✅ | ✅ | [button](../../components/button) | 🔄 `autoInsertSpace` ✅ 4.46.0；🔄 `iconPlacement` ✅ 4.47.0；🔄 `color` / `variant` ✅ 4.49.0 |
| General | FloatButton | ✅ 5.0 | ✅ | [float-button](../../components/float-button) | 🔄 Group `placement` / `closeIcon`、`htmlType` ✅ 4.51.0 |
| General | Icon | ✅ | ✅（`@ant-design/icons-vue`） | — | 图标包独立 |
| General | Typography | ✅ | ✅ | [typography](../../components/typography) | 🔄 `copyable.format` / `tabIndex`、`editable.tabIndex` ✅ 4.54.0 |

## Layout

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Layout | Divider | ✅ | ✅ | [divider](../../components/divider) | 🔄 `variant` / `size` ✅ 4.25.0 |
| Layout | Flex | ✅ 5.10 | ✅ | [flex](../../components/flex) | — |
| Layout | Grid | ✅ | ✅ | [grid](../../components/grid) | — |
| Layout | Layout | ✅ | ✅ | [layout](../../components/layout) | — |
| Layout | Space | ✅ | ✅ | [space](../../components/space) | 🔄 `orientation` / `vertical` / `separator` ✅ 4.48.0 |
| Layout | Splitter | ✅ 5.21 | 🔄 ✅ 4.4.0 | [splitter](../../components/splitter) | 拖拽/min/max/受控；🔄 collapsible / lazy ✅ 4.16.0 |
| Layout | Masonry | ✅ 6.0 | ⏭ | — | 阶段 B（antd 6） |

## Navigation

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Navigation | Anchor | ✅ | ✅ | [anchor](../../components/anchor) | 🔄 `replace` ✅ 4.39.0 |
| Navigation | Breadcrumb | ✅ | ✅ | [breadcrumb](../../components/breadcrumb) | 🔄 `items` ✅ 4.34.0 |
| Navigation | Dropdown | ✅ | ✅ | [dropdown](../../components/dropdown) | 🔄 `destroyOnHidden` ✅ 4.14.0 |
| Navigation | Menu | ✅ | ✅ | [menu](../../components/menu) | — |
| Navigation | Pagination | ✅ | ✅ | [pagination](../../components/pagination) | 🔄 `align` ✅ 4.35.0 |
| Navigation | Steps | ✅ | ✅ | [steps](../../components/steps) | — |
| Navigation | Tabs | ✅ | ✅ | [tabs](../../components/tabs) | 🔄 `destroyOnHidden` ✅ 4.14.0；🔄 `indicator` ✅ 4.42.0 |

## Data Entry

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Data Entry | AutoComplete | ✅ | ✅ | [auto-complete](../../components/auto-complete) | 🔄 `variant` ✅ 4.12.0（经 Select） |
| Data Entry | Cascader | ✅ | ✅ | [cascader](../../components/cascader) | 🔄 `variant` ✅ 4.10.0；🔄 `autoClearSearchValue` ✅ 4.53.0 |
| Data Entry | Checkbox | ✅ | ✅ | [checkbox](../../components/checkbox) | — |
| Data Entry | ColorPicker | ✅ 5.5 | 🔄 ✅ 4.3.0 | [color-picker](../../components/color-picker) | 单色/预设/清除/格式；🔄 `destroyOnHidden` ✅ 4.14.0；🔄 `panelRender` ✅ 4.15.0；🔄 `disabledFormat` ✅ 4.19.0；⏭ 渐变 mode |
| Data Entry | DatePicker | ✅ | ✅ | [date-picker](../../components/date-picker) | 🔄 `variant` ✅ 4.9.0；🔄 `needConfirm` ✅ 4.21.0；🔄 `showTime.changeOnScroll` ✅ 4.23.0；🔄 `cellRender` ✅ 4.61.0 |
| Data Entry | Form | ✅ | ✅ | [form](../../components/form) | 🔄 `variant` ✅ 4.10.0；🔄 `feedbackIcons` ✅ 4.40.0；🔄 `scrollToFirstError` `{ focus }` / `focusField` ✅ 4.57.0 |
| Data Entry | Input | ✅ | ✅ | [input](../../components/input) | 🔄 `Input.OTP` ✅ 4.5.0；`variant` ✅ 4.8.0；🔄 `underlined` ✅ 4.18.0 |
| Data Entry | InputNumber | ✅ | ✅ | [input-number](../../components/input-number) | 🔄 `variant` ✅ 4.9.0 |
| Data Entry | Mentions | ✅ | ✅ | [mentions](../../components/mentions) | 🔄 `variant` ✅ 4.12.0 |
| Data Entry | Radio | ✅ | ✅ | [radio](../../components/radio) | — |
| Data Entry | Rate | ✅ | ✅ | [rate](../../components/rate) | — |
| Data Entry | Select | ✅ | ✅ | [select](../../components/select) | 🔄 `variant` ✅ 4.9.0；🔄 `maxCount` ✅ 4.20.0 |
| Data Entry | Slider | ✅ | ✅ | [slider](../../components/slider) | 🔄 nested `tooltip` ✅ 4.56.0 |
| Data Entry | Switch | ✅ | ✅ | [switch](../../components/switch) | — |
| Data Entry | TimePicker | ✅ | ✅ | [time-picker](../../components/time-picker) | 🔄 `needConfirm` ✅ 4.21.0；🔄 `changeOnScroll` ✅ 4.23.0 |
| Data Entry | Transfer | ✅ | ✅ | [transfer](../../components/transfer) | 🔄 `selectionsIcon` ✅ 4.36.0 |
| Data Entry | TreeSelect | ✅ | ✅ | [tree-select](../../components/tree-select) | 🔄 `variant` ✅ 4.10.0；🔄 `maxCount` ✅ 4.20.0 |
| Data Entry | Upload | ✅ | ✅ | [upload](../../components/upload) | — |

## Data Display

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Data Display | Avatar | ✅ | ✅ | [avatar](../../components/avatar) | 🔄 Group `max` ✅ 4.28.0 |
| Data Display | Badge | ✅ | ✅ | [badge](../../components/badge) | — |
| Data Display | Calendar | ✅ | ✅ | [calendar](../../components/calendar) | 🔄 `cellRender` / `fullCellRender` ✅ 4.60.0；🔄 `showWeek` ✅ 4.62.0 |
| Data Display | Card | ✅ | ✅ | [card](../../components/card) | 🔄 `variant` ✅ 4.29.0 |
| Data Display | Carousel | ✅ | ✅ | [carousel](../../components/carousel) | — |
| Data Display | Collapse | ✅ | ✅ | [collapse](../../components/collapse) | 🔄 `destroyOnHidden` ✅ 4.14.0；🔄 `size` ✅ 4.30.0 |
| Data Display | Descriptions | ✅ | ✅ | [descriptions](../../components/descriptions) | 🔄 `items` ✅ 4.32.0 |
| Data Display | Empty | ✅ | ✅ | [empty](../../components/empty) | 🔄 `classNames` / `styles` ✅ 4.65.0 |
| Data Display | Image | ✅ | ✅ | [image](../../components/image) | 🔄 preview `toolbarRender` ✅ 4.52.0 |
| Data Display | List | ✅ | ✅ | [list](../../components/list) | React 6 标 DEPRECATED；阶段 B 再议 |
| Data Display | Popover | ✅ | ✅ | [popover](../../components/popover) | — |
| Data Display | QRCode | ✅ 5.1 | ✅ | [qrcode](../../components/qrcode) | 🔄 `statusRender` / object `iconSize` ✅ 4.26.0 |
| Data Display | Segmented | ✅ | ✅ | [segmented](../../components/segmented) | 🔄 `shape="round"` ✅ 4.45.0；⏭ `vertical` |
| Data Display | Statistic | ✅ | ✅ | [statistic](../../components/statistic) | 🔄 `Statistic.Timer` ✅ 4.31.0 |
| Data Display | Table | ✅ | ✅ | [table](../../components/table) | 🔄 Column `hidden` ✅ 4.13.0；🔄 `scrollTo` / `nativeElement` ✅ 4.17.0；🔄 `rowHoverable` ✅ 4.19.0；⏭ `virtual` |
| Data Display | Tag | ✅ | ✅ | [tag](../../components/tag) | — |
| Data Display | Timeline | ✅ | ✅ | [timeline](../../components/timeline) | 🔄 `items` ✅ 4.33.0 |
| Data Display | Tooltip | ✅ | ✅ | [tooltip](../../components/tooltip) | 🔄 `destroyOnHidden` ✅ 4.14.0（Popover / Popconfirm 同） |
| Data Display | Tour | ✅ 5.0 | ✅ | [tour](../../components/tour) | 🔄 `actionsRender` ✅ 4.37.0 |
| Data Display | Tree | ✅ | ✅ | [tree](../../components/tree) | — |

## Feedback

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Feedback | Alert | ✅ | ✅ | [alert](../../components/alert) | 🔄 object `closable` ✅ 4.27.0 |
| Feedback | Drawer | ✅ | ✅ | [drawer](../../components/drawer) | 🔄 `destroyOnHidden` ✅ 4.11.0；🔄 `loading` ✅ 4.64.0 |
| Feedback | Message | ✅ | ✅ | [message](../../components/message) | 🔄 `pauseOnHover` ✅ 4.44.0 |
| Feedback | Modal | ✅ | ✅ | [modal](../../components/modal) | 🔄 `destroyOnHidden` ✅ 4.11.0；🔄 `afterOpenChange` ✅ 4.22.0；🔄 `loading` ✅ 4.64.0 |
| Feedback | Notification | ✅ | ✅ | [notification](../../components/notification) | 🔄 `showProgress` / `pauseOnHover` ✅ 4.43.0 |
| Feedback | Popconfirm | ✅ | ✅ | [popconfirm](../../components/popconfirm) | — |
| Feedback | Progress | ✅ | ✅ | [progress](../../components/progress) | 🔄 object `size` ✅ 4.38.0；🔄 `steps` object `{ count, gap }` ✅ 4.55.0；🔄 `percentPosition` ✅ 4.58.0；🔄 `rounding` ✅ 4.59.0 |
| Feedback | Result | ✅ | ✅ | [result](../../components/result) | — |
| Feedback | Skeleton | ✅ | ✅ | [skeleton](../../components/skeleton) | 🔄 `Skeleton.Node` ✅ 4.41.0 |
| Feedback | Spin | ✅ | ✅ | [spin](../../components/spin) | 🔄 `fullscreen` ✅ 4.24.0 |
| Feedback | Watermark | ✅ 5.1 | ✅ | [watermark](../../components/watermark) | — |

## Other

| 分组 | 组件 | React `antd` | Vue Next | 文档链接 | 缺口备注 |
| --- | --- | --- | --- | --- | --- |
| Other | Affix | ✅ | ✅ | [affix](../../components/affix) | — |
| Other | App | ✅ 5.1 | ✅ | [app](../../components/app) | — |
| Other | ConfigProvider | ✅ | ✅ | [config-provider](../../components/config-provider) | 🔄 `useConfig` / `popupMatchSelectWidth`（4.6）；`holderRender` / `warning.strict`（4.7）；`variant`（4.8）；🔄 `underlined` ✅ 4.18.0；🔄 `transfer.selectionsIcon` ✅ 4.36.0；🔄 `button`（color/variant/autoInsertSpace）✅ 4.50.0；🔄 `form.scrollToFirstError` ✅ 4.63.0 |
| Other | BorderBeam | ✅ 6.4 | ⏭ | — | 阶段 B |
| Other | theme / css-in-js | ✅ | ✅（沿用 antdv 混合栈） | — | 不在首周做完整重写 |

---

## 阶段 A 候选队列（按可感知价值）

1. ~~**ColorPicker**（antd 5.5）~~ — ✅ `4.3.0`
2. ~~**Splitter**（antd 5.21）~~ — ✅ `4.4.0`
3. ~~**Input.OTP**（antd 5.12）~~ — ✅ `4.5.0`
4. ~~ConfigProvider `useConfig` + `popupMatchSelectWidth`~~ — ✅ `4.6.0`
5. ~~ConfigProvider `holderRender` / `warning.strict`~~ — ✅ `4.7.0`
6. ~~ConfigProvider / Input `variant`~~ — ✅ `4.8.0`
7. ~~Select / InputNumber / DatePicker `variant`~~ — ✅ `4.9.0`
8. ~~Form / Cascader / TreeSelect `variant`~~ — ✅ `4.10.0`
9. ~~Modal / Drawer `destroyOnHidden`~~ — ✅ `4.11.0`
10. ~~Mentions / AutoComplete `variant`~~ — ✅ `4.12.0`
11. ~~Table Column `hidden`~~ — ✅ `4.13.0`
12. ~~Tabs / Collapse / Tooltip / Dropdown `destroyOnHidden`~~ — ✅ `4.14.0`
13. ~~ColorPicker `panelRender`~~ — ✅ `4.15.0`
14. ~~Splitter collapsible / lazy~~ — ✅ `4.16.0`
15. ~~Table `scrollTo` / `nativeElement`~~ — ✅ `4.17.0`
16. ~~`variant="underlined"`~~ — ✅ `4.18.0`
17. ~~Table `rowHoverable` + ColorPicker `disabledFormat`~~ — ✅ `4.19.0`
18. ~~Select / TreeSelect `maxCount`~~ — ✅ `4.20.0`
19. ~~DatePicker / TimePicker `needConfirm`~~ — ✅ `4.21.0`
20. ~~Modal `afterOpenChange`~~ — ✅ `4.22.0`
21. ~~TimePicker `changeOnScroll`~~ — ✅ `4.23.0`
22. ~~Spin `fullscreen`~~ — ✅ `4.24.0`
23. ~~Divider `variant` / `size`~~ — ✅ `4.25.0`
24. ~~QRCode `statusRender` / object `iconSize`~~ — ✅ `4.26.0`
25. ~~Alert object `closable`~~ — ✅ `4.27.0`
26. ~~Avatar.Group `max`~~ — ✅ `4.28.0`
27. ~~Card `variant`~~ — ✅ `4.29.0`
28. ~~Collapse `size`~~ — ✅ `4.30.0`
29. ~~Statistic.Timer~~ — ✅ `4.31.0`
30. ~~Descriptions `items`~~ — ✅ `4.32.0`
31. ~~Timeline `items`~~ — ✅ `4.33.0`
32. ~~Breadcrumb `items`~~ — ✅ `4.34.0`
33. ~~Pagination `align`~~ — ✅ `4.35.0`
34. ~~Transfer `selectionsIcon`~~ — ✅ `4.36.0`
35. ~~Tour `actionsRender`~~ — ✅ `4.37.0`
36. ~~Progress object `size`~~ — ✅ `4.38.0`
37. ~~Anchor `replace`~~ — ✅ `4.39.0`
38. ~~Form `feedbackIcons`~~ — ✅ `4.40.0`
39. ~~Skeleton.Node~~ — ✅ `4.41.0`
40. ~~Tabs `indicator`~~ — ✅ `4.42.0`
41. ~~Notification `showProgress` / `pauseOnHover`~~ — ✅ `4.43.0`
42. ~~Message `pauseOnHover`~~ — ✅ `4.44.0`
43. ~~Segmented `shape="round"`~~ — ✅ `4.45.0`
44. ~~Button `autoInsertSpace`~~ — ✅ `4.46.0`
45. ~~Button `iconPlacement`~~ — ✅ `4.47.0`
46. ~~Space `orientation` / `separator` / `vertical`~~ — ✅ `4.48.0`
47. ~~Button `color` / `variant`~~ — ✅ `4.49.0`
48. ~~ConfigProvider `button`（color / variant / autoInsertSpace）~~ — ✅ `4.50.0`
49. ~~FloatButton.Group `placement` / `closeIcon` + `htmlType`~~ — ✅ `4.51.0`
50. ~~Image preview `toolbarRender`~~ — ✅ `4.52.0`
51. ~~Cascader `autoClearSearchValue`~~ — ✅ `4.53.0`
52. ~~Typography `copyable.format` / `tabIndex`~~ — ✅ `4.54.0`
53. ~~Progress `steps` object `{ count, gap }`~~ — ✅ `4.55.0`
54. ~~Slider nested `tooltip`~~ — ✅ `4.56.0`
55. ~~Form `scrollToFirstError` `{ focus }` / `focusField`~~ — ✅ `4.57.0`
56. ~~Progress `percentPosition`~~ — ✅ `4.58.0`
57. ~~Progress `rounding`~~ — ✅ `4.59.0`
58. ~~Calendar `cellRender` / `fullCellRender`~~ — ✅ `4.60.0`
59. ~~DatePicker `cellRender`~~ — ✅ `4.61.0`
60. ~~Calendar `showWeek`~~ — ✅ `4.62.0`
61. ~~ConfigProvider `form.scrollToFirstError`~~ — ✅ `4.63.0`
62. ~~Modal / Drawer `loading`~~ — ✅ `4.64.0`
63. ~~Empty `classNames` / `styles`~~ — ✅ `4.65.0`
64. Table `virtual` 按需拆版（多日）
65. ColorPicker 渐变 `mode`
66. Segmented `vertical`（需 MotionThumb 竖向）

## 阶段 B（仅规划，不急实现）

- Masonry、BorderBeam 等 antd 6 组件
- antd 6 语义化 classNames/styles、更大范围 API 变更
- 完整 css-in-js / Design Token 与 React 6 对齐方案文档

---

_上次更新：`4.65.0` Empty `classNames` / `styles`。每发一版请同步改本表。_
