<docs>
---
order: 6
title:
  zh-CN: 全屏加载
  en-US: Fullscreen
---

## zh-CN

通过 `fullscreen` 展示带遮罩的全屏加载。

## en-US

Use `fullscreen` to show a Spin with a fullscreen backdrop.

</docs>

<template>
  <div>
    <a-button type="primary" @click="showFullscreen">Show fullscreen</a-button>
    <a-spin :spinning="spinning" fullscreen />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const spinning = ref(false);

const showFullscreen = () => {
  spinning.value = true;
  setTimeout(() => {
    spinning.value = false;
  }, 2000);
};
</script>
