<docs>
---
order: 8
title:
  zh-CN: 语义化结构样式
  en-US: Custom semantic style
---

## zh-CN

通过 `classNames` / `styles` 自定义语义化结构。

## en-US

Customize semantic structure via `classNames` / `styles`.
</docs>

<template>
  <a-space
    :class-names="{ item: 'demo-space-item', separator: 'demo-space-sep' }"
    :styles="{ item: { background: 'rgba(0, 0, 0, 0.02)', padding: '4px 8px' } }"
    separator="|"
  >
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
  </a-space>
</template>

<style scoped>
:deep(.demo-space-item) {
  border-radius: 4px;
}
:deep(.demo-space-sep) {
  color: #bbb;
}
</style>
