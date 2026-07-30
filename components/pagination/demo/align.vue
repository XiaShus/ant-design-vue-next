<docs>
---
order: 1.5
title:
  zh-CN: 位置
  en-US: Align
---

## zh-CN

通过 `align` 设置分页对齐方式（antd ≥ 5.19）。

## en-US

Set pagination alignment via `align` (antd ≥ 5.19).
</docs>

<template>
  <div>
    <a-pagination v-model:current="current1" :total="50" align="start" />
    <br />
    <a-pagination v-model:current="current2" :total="50" align="center" />
    <br />
    <a-pagination v-model:current="current3" :total="50" align="end" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const current1 = ref(1);
const current2 = ref(1);
const current3 = ref(1);
</script>
