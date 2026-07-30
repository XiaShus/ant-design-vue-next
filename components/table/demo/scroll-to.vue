<docs>
---
order: 28
title:
  zh-CN: 滚动到指定行
  en-US: Scroll to
---

## zh-CN

通过 `ref.scrollTo` 滚动到指定 `key` / `index` / `top`（需设置 `scroll.y`）。

## en-US

Use `ref.scrollTo` to jump by `key` / `index` / `top` (requires `scroll.y`).
</docs>

<template>
  <div>
    <a-space style="margin-bottom: 16px">
      <a-button @click="() => tableRef?.scrollTo({ top: 0 })">Top</a-button>
      <a-button @click="() => tableRef?.scrollTo({ key: 20, align: 'start' })">Key 20</a-button>
      <a-button @click="() => tableRef?.scrollTo({ index: 50, offset: 0 })">Index 50</a-button>
    </a-space>
    <a-table
      ref="tableRef"
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :scroll="{ y: 240 }"
      row-key="key"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tableRef = ref<any>();

const columns = [
  { title: 'Name', dataIndex: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', width: 80 },
  { title: 'Address', dataIndex: 'address' },
];

const data = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));
</script>
