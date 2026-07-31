<docs>
---
order: 9
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Tag 语义化结构样式。

## en-US

You can customize Tag semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-space>
    <a-tag
      closable
      :class-names="{
        root: 'demo-tag-root',
        content: 'demo-tag-content',
        closeIcon: 'demo-tag-close',
      }"
      :styles="{ root: { borderStyle: 'dashed' }, content: { fontWeight: 600 } }"
    >
      Custom Tag
    </a-tag>
  </a-space>
</template>

<style scoped>
:deep(.demo-tag-root) {
  border-color: #1677ff;
}
:deep(.demo-tag-content) {
  color: #1677ff;
}
:deep(.demo-tag-close) {
  color: #1677ff;
}
</style>
