<docs>
---
order: 2
title:
  zh-CN: 最多选择
  en-US: Max Count
---

## zh-CN

通过 `maxCount` 限制最多可选数量（仅多选）。当 `showCheckedStrategy` 为 `SHOW_PARENT`，或为 `SHOW_ALL` 且未开启 `treeCheckStrictly` 时，`maxCount` 不生效。

## en-US

Limit selectable items with `maxCount` (multiple only). It has no effect when `showCheckedStrategy` is `SHOW_PARENT`, or `SHOW_ALL` without `treeCheckStrictly`.

</docs>

<template>
  <a-tree-select
    v-model:value="value"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    allow-clear
    :show-checked-strategy="SHOW_CHILD"
    :max-count="3"
    placeholder="Please select"
    tree-default-expand-all
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import type { TreeSelectProps } from 'ant-design-vue';

const SHOW_CHILD = TreeSelect.SHOW_CHILD;
const value = ref<string[]>([]);
const treeData = ref<TreeSelectProps['treeData']>([
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
      },
      {
        title: 'Child Node2',
        value: '0-0-1',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
      },
    ],
  },
]);
</script>
