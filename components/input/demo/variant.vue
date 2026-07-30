<docs>
---
order: 1
title:
  zh-CN: 形态变体
  en-US: Variants
---

## zh-CN

Input 支持 `outlined`（默认）、`filled`、`borderless`、`underlined` 形态（`underlined` 对齐 antd ≥ 5.24）。也可通过 `ConfigProvider` 的 `variant` 统一配置。

## en-US

Input supports `outlined` (default), `filled`, `borderless`, and `underlined` (antd ≥ 5.24). Use ConfigProvider `variant` for a global default.

</docs>
<template>
  <a-space direction="vertical" style="width: 100%">
    <a-input v-model:value="v1" variant="outlined" placeholder="outlined" />
    <a-input v-model:value="v2" variant="filled" placeholder="filled" />
    <a-input v-model:value="v3" variant="borderless" placeholder="borderless" />
    <a-input v-model:value="v5" variant="underlined" placeholder="underlined" />
    <a-config-provider variant="filled">
      <a-input v-model:value="v4" placeholder="from ConfigProvider" />
    </a-config-provider>
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const v1 = ref('');
const v2 = ref('');
const v3 = ref('');
const v4 = ref('');
const v5 = ref('');
</script>
