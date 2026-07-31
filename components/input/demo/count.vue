<docs>
---
order: 13
title:
  zh-CN: 字数配置
  en-US: Count config
---

## zh-CN

通过 `count` 配置字数统计策略、软上限与超出裁剪（对齐 antd ≥ 5.10）。

## en-US

Use `count` for strategy, soft max, and exceed clipping (antd ≥ 5.10).

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-input v-model:value="value1" :count="{ show: true, max: 10 }" placeholder="count.max = 10" />
    <a-input
      v-model:value="value2"
      :count="{
        show: true,
        max: 5,
        strategy: v => [...v].length,
        exceedFormatter: (v, { max }) => [...v].slice(0, max).join(''),
      }"
      placeholder="exceedFormatter clips"
    />
    <a-textarea v-model:value="value3" :count="{ show: true, max: 20 }" :rows="2" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref('hello');
const value2 = ref('');
const value3 = ref('');
</script>
