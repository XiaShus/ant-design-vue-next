---
category: Components
type: Other
cols: 1
title: ConfigProvider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

This component provides a configuration to all Vue components underneath itself via the [provide / inject](https://vuejs.org/v2/api/#provide-inject), In the render tree all components will have access to the provided config.

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

Some components use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```html
<a-config-provider :csp="{ nonce: 'YourNonceCode' }">
  <a-button>My Button</a-button>
</a-config-provider>
```

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | Set `false` to remove space between 2 chinese characters on Button. Prefer `button.autoInsertSpace` | boolean | true |  |
| button | Set Button common props | { color?: `default` \| `primary` \| `danger`, variant?: `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link`, autoInsertSpace?: boolean } | - | 4.50.0 |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - | 3.0 |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` | 3.0 |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Prefer `popupMatchSelectWidth` (antd ≥ 5.5 rename) | boolean \| number | - | 3.0 |
| popupMatchSelectWidth | Same as `dropdownMatchSelectWidth` (preferred name) | boolean \| number | - | 4.6.0 |
| form | Set Form common props | { validateMessages?: [ValidateMessages](/components/form/#validatemessages), requiredMark?: boolean \| `optional` \| ((labelNode, info) => any), colon?: boolean, scrollToFirstError?: boolean \| [ScrollFocusOptions](/components/form/#scrollfocusoptions) } | - | 3.0；`scrollToFirstError`: 4.63.0；`requiredMark` renderProps: 4.73.0 |
| getPopupContainer | to set the container of the popup element. The default is to create a `div` element in `body`. | Function(triggerNode, dialogContext) | `() => document.body` |  |
| getTargetContainer | Config Affix, Anchor scroll target container | () => HTMLElement | () => window | 3.0 |
| input | Set Input common props | { autocomplete?: string } | - | 3.0 |
| locale | language package setting, you can find the packages in [ant-design-vue/es/locale](http://unpkg.com/ant-design-vue/es/locale/) | object | - | 1.5.0 |
| pageHeader | Unify the ghost of pageHeader ,Ref [pageHeader]\(&lt;(/components/page-header)> | { ghost:boolean } | 'true' | 1.5.0 |
| prefixCls | set prefix class | string | ant |  |
| renderEmpty | set empty content of components. Ref [Empty](/components/empty/) | slot-scope \| Function(componentName: string): VNode | - |  |
| alert | Set Alert common props | { className?: string, style?: CSSProperties, closeIcon?: VueNode, closable?: boolean \| object } | - | 4.79.0 |
| avatar | Set Avatar common props | { className?: string, style?: CSSProperties } | - | 4.80.0 |
| breadcrumb | Set Breadcrumb common props | { className?: string, style?: CSSProperties, separator?: VueNode } | - | 4.79.0 |
| card | Set Card common props | { className?: string, style?: CSSProperties } | - | 4.80.0 |
| empty | Set Empty common props | { className?: string, style?: CSSProperties } | - | 4.80.0 |
| progress | Set Progress common props | { className?: string, style?: CSSProperties } | - | 4.80.0 |
| space | Set Space common props | { size?: SizeType \| number, className?: string, style?: CSSProperties } | - | 3.0 / className·style: 4.79.0 |
| transfer | Set Transfer common props | { selectionsIcon?: VueNode } | - | 4.36.0 |
| transformCellText | Table data can be changed again before rendering. The default configuration of general user empty data. | Function({ text, column, record, index }) => any | - | 1.5.4 |
| variant | Set variant of data entry components (antd ≥ 5.19) | `outlined` \| `filled` \| `borderless` \| `underlined` | - | 4.8.0 |
| virtual | Disable virtual scroll when set to false | boolean | true | 3.0 |
| warning | Config warning level; `strict: false` softens to warn | { strict?: boolean } | - | 4.7.0 |
| flex | Set Flex common props | { vertical?: boolean } | - | 4.78.0 |
| wave | Config wave effect | { disabled?: boolean } | - | 4.0.7 |

### ConfigProvider.config() `3.0.0+`

Setting global prefix / theme injection for static `Modal` / `Message` / `Notification`.

```jsx
ConfigProvider.config({
  prefixCls: 'ant',
});
```

or

```jsx
// some cinfig support reactively, you can change prefixCls.value = 'other'
const prefixCls = ref('ant');
ConfigProvider.config({
  prefixCls,
});
```

#### holderRender `4.7.0+` (antd ≥ 5.13)

Wrap static `Modal.confirm` / `message` / `notification` trees (often with a themed ConfigProvider). Does not affect hooks / `App.useApp()`.

```jsx
ConfigProvider.config({
  holderRender: children => (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>{children}</ConfigProvider>
  ),
});
```

#### warning `4.7.0+` (antd ≥ 5.10)

```jsx
ConfigProvider.config({
  warning: { strict: false },
});
```

### ConfigProvider.useConfig() `4.6.0+`

Read `componentSize` / `componentDisabled` from the nearest `ConfigProvider` (aligned with antd ≥ 5.3). Also available as named export `useConfig`.

```ts
import { ConfigProvider, useConfig } from 'ant-design-vue-next';

const { componentSize, componentDisabled } = ConfigProvider.useConfig();
// or: const { componentSize, componentDisabled } = useConfig();
```

| Field | Description | Type |
| --- | --- | --- |
| componentSize | Component size | `ComputedRef<'small' \| 'middle' \| 'large' \| undefined>` |
| componentDisabled | Component disabled | `ComputedRef<boolean \| undefined>` |

## FAQ

#### Does the locale problem still exist in DatePicker even if ConfigProvider `locale` is used?

Please make sure you set dayjs locale by `dayjs.locale('zh-cn')` or that you don't have two different versions of dayjs.

#### Modal throw error when setting `getPopupContainer`?

When you config `getPopupContainer` to parentNode globally, Modal will throw error of `triggerNode is undefined` because it did not have a triggerNode.

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

#### Why can't ConfigProvider props (like `prefixCls` and `theme`) affect VueNode inside `message.info`, `notification.open`, `Modal.confirm`?

antd will dynamic create Vue instance by `Vue.render` when call message methods. Whose context is different with origin code located context.

From `4.7.0`, use `ConfigProvider.config({ holderRender })` to wrap those static trees, or prefer hooks / `App.useApp()`.
