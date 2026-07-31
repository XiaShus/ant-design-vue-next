<docs>
---
order: 12
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Card 语义化结构样式。

## en-US

You can customize Card semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-card
    title="Card title"
    :class-names="{ root: 'demo-card-root', header: 'demo-card-header', body: 'demo-card-body' }"
    :styles="{ body: { background: '#fafafa' }, title: { color: '#1677ff' } }"
  >
    <template #extra><a href="#">More</a></template>
    Card content
  </a-card>
</template>

<style scoped>
:deep(.demo-card-root) {
  border-color: #91caff;
}
:deep(.demo-card-header) {
  border-bottom-color: #91caff;
}
:deep(.demo-card-body) {
  min-height: 80px;
}
</style>
