<docs>
---
order: 6
title:
  zh-CN: 键盘操作
  en-US: Keyboard
---

## zh-CN

`keyboard={false}` 可关闭方向键改分（对齐 antd ≥ 5.18）。

## en-US

Set `keyboard={false}` to disable arrow key rating (antd ≥ 5.18).

</docs>

<template>
  <a-space>
    <a-rate v-model:value="value1" />
    <a-rate v-model:value="value2" :keyboard="false" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref(2);
const value2 = ref(2);
</script>
