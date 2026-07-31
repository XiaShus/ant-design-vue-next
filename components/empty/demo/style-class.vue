<docs>
---
order: 5
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Empty 语义化结构样式。

## en-US

You can customize Empty semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-empty
      :class-names="{ root: 'demo-empty-root', description: 'demo-empty-desc' }"
      :styles="{ image: { height: 48 }, description: { color: '#1677ff' } }"
    >
      <a-button type="primary">Create Now</a-button>
    </a-empty>
  </a-space>
</template>
<style scoped>
:deep(.demo-empty-root) {
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  padding: 16px;
}
:deep(.demo-empty-desc) {
  font-weight: 500;
}
</style>
