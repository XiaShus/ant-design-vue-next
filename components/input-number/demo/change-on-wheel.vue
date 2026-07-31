<docs>
---
order: 11
title:
  zh-CN: 滚轮改值
  en-US: Change on wheel
---

## zh-CN

聚焦后滚动鼠标滚轮即可改变数值（`changeOnWheel`，对齐 antd ≥ 5.14）。也可通过 `suffix` 添加后缀。

## en-US

Focus then scroll the mouse wheel to change value (`changeOnWheel`, antd ≥ 5.14). `suffix` adds trailing content.

</docs>

<template>
  <a-space>
    <a-input-number v-model:value="value1" change-on-wheel :min="0" :max="100" />
    <a-input-number v-model:value="value2" change-on-wheel suffix="%" :min="0" :max="100" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref<number>(5);
const value2 = ref<number>(20);
</script>
