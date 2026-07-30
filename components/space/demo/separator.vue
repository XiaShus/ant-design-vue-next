<docs>
---
order: 0.5
title:
  zh-CN: 分隔符（separator）
  en-US: Separator
---

## zh-CN

通过 `separator` 属性设置相邻组件分隔符；仍兼容 `split` 属性与插槽。

## en-US

Set item separators via the `separator` prop. The `split` prop and slot remain supported.
</docs>

<template>
  <a-space size="middle" separator="|">
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
  </a-space>
</template>
