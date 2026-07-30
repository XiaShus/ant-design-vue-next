---
category: Components
subtitle: 全局化配置
cols: 1
type: 其他
title: ConfigProvider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 Vue 的 [provide / inject](https://vuejs.org/v2/api/#provide-inject) 特性，只需在应用外围包裹一次即可全局生效。

```html
<template>
  <a-config-provider :getPopupContainer="getPopupContainer">
    <app />
  </a-config-provider>
</template>
<script>
  export default {
    methods: {
      getPopupContainer(el, dialogContext) {
        if (dialogContext) {
          return dialogContext.getDialogWrap();
        } else {
          return document.body;
        }
      },
    },
  };
</script>
```

### Content Security Policy

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```html
<a-config-provider :csp="{ nonce: 'YourNonceCode' }">
  <a-button>My Button</a-button>
</a-config-provider>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | true |  |
| componentSize | 设置 antd 组件大小 | `small` \| `middle` \| `large` | - | 3.0 |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - |  |
| direction | 设置文本展示方向。 [示例](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` | 3.0 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动。请优先使用 `popupMatchSelectWidth` | boolean \| number | - |  |
| popupMatchSelectWidth | 同 `dropdownMatchSelectWidth`（antd ≥ 5.5 推荐名） | boolean \| number | - | 4.6.0 |
| form | 设置 Form 组件的通用属性 | { validateMessages?: [ValidateMessages](/components/form/#validatemessages), requiredMark?: boolean \| `optional`, colon?: boolean} | - | 3.0 |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | Function(triggerNode, dialogContext) | () => document.body |  |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器。 | () => HTMLElement | () => window | 3.0 |
| input | 设置 Input 组件的通用属性 | { autocomplete?: string } | - | 3.0 |
| locale | 语言包配置，语言包可到 [ant-design-vue/es/locale](http://unpkg.com/ant-design-vue/es/locale/) 目录下寻找 | object | - | 1.5.0 |
| pageHeader | 统一设置 pageHeader 的 ghost，参考 [pageHeader](<(/components/page-header)>) | { ghost: boolean } | 'true' | 1.5.0 |
| prefixCls | 设置统一样式前缀。注意：需要配合 `less` 变量 `@ant-prefix` 使用 | string | `ant` |  |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty/) | slot \| Function(componentName: string): VNode | - |  |
| space | 设置 Space 的 `size`，参考 [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number` } | - | 3.0 |
| transfer | 设置 Transfer 组件的通用属性 | { selectionsIcon?: VueNode } | - | 4.36.0 |
| transformCellText | Table 数据渲染前可以再次改变，一般用户空数据的默认配置 | Function({ text, column, record, index }) => any | - | 1.5.4 |
| variant | 设置数据录入类组件的形态（对齐 antd ≥ 5.19） | `outlined` \| `filled` \| `borderless` \| `underlined` | - | 4.8.0 |
| virtual | 设置 `false` 时关闭虚拟滚动 | boolean | - | 3.0 |
| warning | 设置警告等级；`strict: false` 时降级为 warn | { strict?: boolean } | - | 4.7.0 |
| wave | 设置水波纹特效 | { disabled?: boolean } | - | 4.0.7 |

### ConfigProvider.config() `3.0.0+`

设置 `Modal`、`Message`、`Notification` 的全局前缀 / 主题注入等。

```jsx
ConfigProvider.config({
  prefixCls: 'ant',
});
```

or

```jsx
// 如下配置支持响应式数据，你可以通过 prefixCls.value = 'other' 直接改变
const prefixCls = ref('ant');
ConfigProvider.config({
  prefixCls,
});
```

#### holderRender `4.7.0+`（对齐 antd ≥ 5.13）

为静态 `Modal.confirm` / `message` / `notification` 注入外层渲染（常用于带 `theme` 的 ConfigProvider）。不影响 hooks / `App.useApp()`。

```jsx
ConfigProvider.config({
  holderRender: children => (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>{children}</ConfigProvider>
  ),
});
```

#### warning `4.7.0+`（对齐 antd ≥ 5.10）

```jsx
ConfigProvider.config({
  warning: { strict: false },
});
```

### ConfigProvider.useConfig() `4.6.0+`

读取最近一层 `ConfigProvider` 的 `componentSize` / `componentDisabled`（对齐 antd ≥ 5.3）。也支持具名导出 `useConfig`。

```ts
import { ConfigProvider, useConfig } from 'ant-design-vue-next';

const { componentSize, componentDisabled } = ConfigProvider.useConfig();
// 或：const { componentSize, componentDisabled } = useConfig();
```

| 字段              | 说明     | 类型                                                       |
| ----------------- | -------- | ---------------------------------------------------------- |
| componentSize     | 组件尺寸 | `ComputedRef<'small' \| 'middle' \| 'large' \| undefined>` |
| componentDisabled | 组件禁用 | `ComputedRef<boolean \| undefined>`                        |

## FAQ

#### 为什么我使用了 ConfigProvider `locale`，时间类组件的国际化还有问题？

请检查是否设置了 `dayjs.locale('zh-cn')`，或者是否有两个版本的 dayjs 共存。

#### 配置 `getPopupContainer` 导致 Modal 报错？

当如下全局设置 `getPopupContainer` 为触发节点的 parentNode 时，由于 Modal 的用法不存在 `triggerNode`，这样会导致 `triggerNode is undefined` 的报错，需要增加一个判断条件。

```diff
 <ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
 >
   <App />
 </ConfigProvider>
```

#### 为什么 message.info、notification.open 或 Modal.confirm 等方法内的 VueNode 无法继承 ConfigProvider 的属性？比如 `prefixCls` 和 `theme`。

静态方法是使用 Vue.render 重新渲染一个 Vue 根节点上，和主应用的 Vue 节点是脱离的。

自 `4.7.0` 起可用 `ConfigProvider.config({ holderRender })` 包裹这些静态树，或优先使用 hooks / `App.useApp()`。
