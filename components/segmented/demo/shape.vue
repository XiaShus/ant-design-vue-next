<docs>
---
order: 2.5
title:
  zh-CN: 圆形胶囊
  en-US: Round shape
---

## zh-CN

通过 `shape="round"` 使用胶囊形态（antd ≥ 5.24）。

## en-US

Use `shape="round"` for a pill-like Segmented (antd ≥ 5.24).
</docs>

<template>
  <a-segmented v-model:value="value" shape="round" :options="options" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { MoonOutlined, SunOutlined } from '@ant-design/icons-vue';

const value = ref<string | number>('light');
const options = [
  { value: 'light', label: () => h(SunOutlined) },
  { value: 'dark', label: () => h(MoonOutlined) },
];
</script>
