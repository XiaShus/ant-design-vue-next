<docs>
---
order: 19
title:
  zh-CN: 自定义清除图标
  en-US: Custom clear icon
---

## zh-CN

`allowClear` 支持传入 `{ clearIcon }` 自定义清除图标（对齐 antd ≥ 5.8）。

## en-US

`allowClear` accepts `{ clearIcon }` to customize the clear icon (antd ≥ 5.8).

</docs>

<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value1" :allow-clear="{ clearIcon: clearIcon }" />
    <a-range-picker v-model:value="value2" :allow-clear="{ clearIcon: clearIcon }" />
  </a-space>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';

const clearIcon = h(CloseOutlined, { style: { color: '#ff4d4f' } });
const value1 = ref<Dayjs>();
const value2 = ref<[Dayjs, Dayjs]>();
</script>
