<docs>
---
order: 9
title:
  zh-CN: 语义化结构样式
  en-US: Custom semantic style
---

## zh-CN

通过 `classNames` / `styles` 自定义语义化结构（antd ≥ 5.21）。

## en-US

Customize semantic structure via `classNames` / `styles` (antd ≥ 5.21).
</docs>

<template>
  <a-collapse
    v-model:activeKey="activeKey"
    :items="items"
    :class-names="{ header: 'demo-collapse-header', body: 'demo-collapse-body' }"
    :styles="{ header: { background: 'rgba(0, 0, 0, 0.02)' }, body: { background: '#fff' } }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref(['1']);
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',
  },
];
</script>

<style scoped>
:deep(.demo-collapse-header) {
  font-weight: 600;
}
:deep(.demo-collapse-body) {
  color: rgba(0, 0, 0, 0.65);
}
</style>
