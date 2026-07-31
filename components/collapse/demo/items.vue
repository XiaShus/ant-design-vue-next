<docs>
---
order: 1
title:
  zh-CN: 配置化面板
  en-US: Items config
---

## zh-CN

通过 `items` 配置折叠面板内容（对齐 antd ≥ 5.6），无需嵌套 `Collapse.Panel`。

## en-US

Configure panels with `items` (antd ≥ 5.6) instead of nested `Collapse.Panel`.
</docs>

<template>
  <a-collapse v-model:activeKey="activeKey" :items="items" />
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
  {
    key: '3',
    label: 'This is panel header 3',
    children: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness.',
  },
];
</script>
