<docs>
---
order: 12.5
title:
  zh-CN: 校验防抖
  en-US: Validate debounce
---

## zh-CN

通过 `validateDebounce` 设置防抖毫秒数，减少输入过程中的频繁校验（antd ≥ 5.9）。

## en-US

Use `validateDebounce` to debounce field validation while typing (antd ≥ 5.9).
</docs>

<template>
  <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, min: 3, message: 'At least 3 chars' }]"
      :validate-debounce="500"
    >
      <a-input v-model:value="formState.username" placeholder="Debounce 500ms" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const formState = reactive({
  username: '',
});
</script>
