<docs>
---
order: 12
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Badge 语义化结构样式。

## en-US

You can customize Badge semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-space size="large">
    <a-badge
      :count="5"
      :class-names="{ root: 'demo-badge-root', indicator: 'demo-badge-indicator' }"
      :styles="{ indicator: { background: '#1677ff' } }"
    >
      <a href="#" class="head-example" />
    </a-badge>
    <a-badge
      status="processing"
      text="Processing"
      :class-names="{ indicator: 'demo-badge-dot' }"
      :styles="{ root: { padding: '4px 8px', background: '#f5f5f5', borderRadius: '6px' } }"
    />
  </a-space>
</template>

<style scoped>
:deep(.demo-badge-root) {
  outline: 1px dashed #d9d9d9;
  outline-offset: 4px;
}
:deep(.demo-badge-indicator) {
  box-shadow: 0 0 0 2px #fff;
}
:deep(.demo-badge-dot) {
  width: 10px;
  height: 10px;
}
</style>
