<docs>
---
order: 5.2
title:
  zh-CN: 搜索不清空
  en-US: Keep search value
---

## zh-CN

多选 + 搜索时，设置 `autoClearSearchValue={false}`（或 `showSearch.autoClearSearchValue`）可在选中后保留搜索内容。

## en-US

With `multiple` + search, set `autoClearSearchValue={false}` (or `showSearch.autoClearSearchValue`) to keep the search text after selecting.
</docs>
<template>
  <a-cascader
    v-model:value="value"
    style="width: 100%"
    multiple
    :options="options"
    :show-search="{ autoClearSearchValue: false }"
    placeholder="Please select"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';

const options: CascaderProps['options'] = [
  {
    label: 'Light',
    value: 'light',
    children: [
      { label: 'Number 1', value: '1' },
      { label: 'Number 2', value: '2' },
      { label: 'Little', value: 'little' },
    ],
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      { label: 'Toy Fish', value: 'fish' },
      { label: 'Toy Cards', value: 'cards' },
    ],
  },
];

const value = ref<string[]>([]);
</script>
