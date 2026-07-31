<docs>
---
order: 15
title:
  zh-CN: 自定义选项
  en-US: Custom option render
---

## zh-CN

使用 `optionRender` 自定义下拉选项内容（对齐 antd ≥ 5.16）。

## en-US

Customize dropdown option content with `optionRender` (antd ≥ 5.16).
</docs>

<template>
  <a-cascader
    v-model:value="value"
    style="width: 100%"
    :options="options"
    :option-render="optionRender"
    placeholder="Please select"
  />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const value = ref<string[]>([]);
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      { value: 'hangzhou', label: 'Hangzhou' },
      { value: 'ningbo', label: 'Ningbo' },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{ value: 'nanjing', label: 'Nanjing' }],
  },
];

const optionRender = (option: Record<string, any>) => h('span', {}, [`▸ ${option.label}`]);
</script>
