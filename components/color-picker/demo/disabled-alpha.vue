<docs>
---
order: 5
title:
  zh-CN: 禁用透明度
  en-US: Disabled Alpha
---

## zh-CN

禁用透明度调节。

## en-US

Disabled color alpha.
</docs>

<template>
  <a-color-picker v-model:value="color" disabled-alpha show-text />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
</script>
