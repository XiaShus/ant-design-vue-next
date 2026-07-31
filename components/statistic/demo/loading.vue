<docs>
---
order: 5
title:
  zh-CN: 加载中
  en-US: Loading
---

## zh-CN

通过 `loading` 显示加载状态。

## en-US

Display loading status via `loading`.

</docs>

<template>
  <a-statistic title="Active Users" :value="112893" :loading="loading" />
  <a-button style="margin-top: 16px" type="primary" @click="loading = !loading">
    Toggle loading
  </a-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
