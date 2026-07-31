<docs>
---
order: 12
title:
  zh-CN: 自定义选中项
  en-US: Custom selected label
---

## zh-CN

使用 `labelRender` 自定义选中项展示（对齐 antd ≥ 5.15）。

## en-US

Use `labelRender` to customize the selected label (antd ≥ 5.15).
</docs>

<template>
  <a-tree-select
    v-model:value="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-default-expand-all
    :label-render="labelRender"
  />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const value = ref('leaf1');
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      { title: 'Child Node1', value: 'leaf1' },
      { title: 'Child Node2', value: 'leaf2' },
    ],
  },
];

const labelRender = (props: Record<string, any>) =>
  h('span', {}, [`Selected: ${props.label ?? props.value}`]);
</script>
