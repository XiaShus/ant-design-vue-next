<docs>
---
order: 12
title:
  zh-CN: 前缀图标
  en-US: Prefix
---

## zh-CN

通过 `prefix` 自定义选择框前缀（对齐 antd ≥ 5.22；Cascader / TreeSelect 同）。

## en-US

Customize Select prefix with `prefix` (antd ≥ 5.22; also Cascader / TreeSelect).
</docs>

<template>
  <a-space>
    <a-select
      v-model:value="value"
      style="width: 180px"
      :options="options"
      :prefix="h(UserOutlined)"
    />
    <a-select v-model:value="value" style="width: 180px" :options="options" disabled>
      <template #prefix><user-outlined /></template>
    </a-select>
  </a-space>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';

const value = ref('a1');
const options = [
  { value: 'a1', label: 'Option 1' },
  { value: 'b2', label: 'Option 2' },
];
</script>
