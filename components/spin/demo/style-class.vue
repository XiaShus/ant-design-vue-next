<docs>
---
order: 10
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Spin 语义化结构样式。

## en-US

You can customize Spin semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-spin
    tip="Loading"
    :class-names="{ root: 'demo-spin-root', tip: 'demo-spin-tip' }"
    :styles="{ tip: { color: '#1677ff' } }"
  >
    <div class="spin-content">Nested content</div>
  </a-spin>
</template>

<style scoped>
.spin-content {
  padding: 40px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}
:deep(.demo-spin-root) {
  max-width: 320px;
}
:deep(.demo-spin-tip) {
  font-weight: 500;
}
</style>
