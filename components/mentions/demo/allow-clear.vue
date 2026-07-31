<docs>
---
order: 8
title:
  zh-CN: 清除按钮
  en-US: Allow clear
---

## zh-CN

通过 `allowClear` 显示清除按钮，并用 `onClear` 监听（对齐 antd ≥ 5.13 / 5.20）。

## en-US

Show clear icon with `allowClear` and listen via `onClear` (antd ≥ 5.13 / 5.20).

</docs>

<template>
  <a-mentions
    v-model:value="value"
    allow-clear
    placeholder="allowClear"
    :options="options"
    @clear="onClear"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
const value = ref('hello');
const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
];
const onClear = () => {
  message.info('cleared');
};
</script>
