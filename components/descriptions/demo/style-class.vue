<docs>
---
order: 8
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Descriptions 语义化结构样式。

## en-US

You can customize Descriptions semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-descriptions
    title="User Info"
    bordered
    :column="2"
    :class-names="{
      root: 'demo-desc-root',
      header: 'demo-desc-header',
      title: 'demo-desc-title',
      label: 'demo-desc-label',
      content: 'demo-desc-content',
    }"
    :styles="{
      label: { width: '120px' },
      content: { color: '#1677ff' },
    }"
  >
    <template #extra>
      <a-button type="primary" size="small">Edit</a-button>
    </template>
    <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
    <a-descriptions-item label="Billing">Prepaid</a-descriptions-item>
    <a-descriptions-item label="Time">18:00:00</a-descriptions-item>
    <a-descriptions-item label="Amount">$80.00</a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>
:deep(.demo-desc-root) {
  border-radius: 8px;
  overflow: hidden;
}
:deep(.demo-desc-header) {
  margin-bottom: 12px;
}
:deep(.demo-desc-title) {
  font-weight: 600;
}
:deep(.demo-desc-label) {
  font-weight: 500;
}
</style>
