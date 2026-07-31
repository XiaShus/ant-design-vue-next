<docs>
---
order: 0.1
title:
  zh-CN: value 别名
  en-US: value alias
---

## zh-CN

`value` / `defaultValue` 可作为 `checked` / `defaultChecked` 的别名（antd ≥ 5.12）。

## en-US

`value` / `defaultValue` are aliases of `checked` / `defaultChecked` (antd ≥ 5.12).

</docs>

<template>
  <a-space>
    <a-switch v-model:value="on" />
    <a-switch :default-value="true" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const on = ref(false);
</script>
