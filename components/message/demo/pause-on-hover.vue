<docs>
---
order: 1.5
title:
  zh-CN: 悬停不暂停
  en-US: Do not pause on hover
---

## zh-CN

通过 `pauseOnHover={false}` 让计时在悬停时继续（antd ≥ 5.18）。

## en-US

Set `pauseOnHover` to `false` so the timer keeps running while hovered (antd ≥ 5.18).
</docs>

<template>
  <a-button @click="info">Message without pause on hover</a-button>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
const info = () => {
  message.open({
    content: 'This message will not pause while hovered',
    duration: 5,
    pauseOnHover: false,
  });
};
</script>
