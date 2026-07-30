<docs>
---
order: 4
title:
  zh-CN: 清除颜色
  en-US: Clear Color
---

## zh-CN

支持清除已选颜色。

## en-US

Allow clearing color.
</docs>

<template>
  <a-color-picker v-model:value="color" allow-clear show-text />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
