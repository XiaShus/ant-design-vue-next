<docs>
---
order: 1
title:
  zh-CN: 触发器文本
  en-US: Rendering Trigger Text
---

## zh-CN

`showText` 为 `true` 时展示颜色文本；也可传入函数自定义文本。

## en-US

Show trigger text when `showText` is `true`. Pass a function to customize text.
</docs>

<template>
  <a-space>
    <a-color-picker v-model:value="color" show-text />
    <a-color-picker v-model:value="color" :show-text="customText" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { AggregationColor } from '../color';
const color = ref('#1677ff');
const customText = (c: AggregationColor) => `Custom ${c.toHexString()}`;
</script>
