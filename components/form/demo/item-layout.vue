<docs>
---
order: 2.1
title:
  zh-CN: 表单项布局
  en-US: Item layout
---

## zh-CN

Form.Item 支持独立 `layout`，可在同一表单内混用水平/垂直布局（antd ≥ 5.18）。

## en-US

Form.Item supports its own `layout`, so horizontal and vertical items can mix in one Form (antd ≥ 5.18).
</docs>

<template>
  <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
    <a-form-item label="Horizontal" name="horizontal">
      <a-input v-model:value="formState.horizontal" />
    </a-form-item>
    <a-form-item label="Vertical" name="vertical" layout="vertical" :wrapper-col="{ span: 24 }">
      <a-input v-model:value="formState.vertical" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const formState = reactive({
  horizontal: '',
  vertical: '',
});
</script>
