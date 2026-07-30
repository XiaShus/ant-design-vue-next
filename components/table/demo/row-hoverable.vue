<docs>
---
order: 29
title:
  zh-CN: 行悬浮
  en-US: Row hoverable
---

## zh-CN

通过 `rowHoverable={false}` 关闭行 hover 高亮（对齐 antd ≥ 5.16）。

## en-US

Set `rowHoverable={false}` to disable row hover highlight (antd ≥ 5.16).
</docs>

<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="false"
    :row-hoverable="false"
    row-key="key"
  />
</template>

<script lang="ts" setup>
const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];
const data = [
  { key: '1', name: 'Tom', age: 28, address: 'New York' },
  { key: '2', name: 'Jerry', age: 25, address: 'London' },
  { key: '3', name: 'Lucy', age: 22, address: 'Sydney' },
];
</script>
