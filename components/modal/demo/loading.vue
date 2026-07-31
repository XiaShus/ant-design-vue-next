<docs>
---
order: 8
title:
  zh-CN: 加载中
  en-US: Loading
---

## zh-CN

设置 Modal 的 `loading` 状态，内容区展示骨架屏。

## en-US

Set the loading status of Modal; the body shows a skeleton.

</docs>

<template>
  <div>
    <a-button type="primary" @click="showLoading">Open Modal</a-button>
    <a-modal v-model:open="open" title="Loading Modal" :loading="loading" @cancel="open = false">
      <template #footer>
        <a-button type="primary" @click="showLoading">Reload</a-button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const open = ref(false);
const loading = ref(true);

const showLoading = () => {
  open.value = true;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
