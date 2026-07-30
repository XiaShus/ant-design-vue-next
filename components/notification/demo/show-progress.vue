<docs>
---
order: 1.5
title:
  zh-CN: 显示进度条
  en-US: Show progress
---

## zh-CN

通过 `showProgress` 展示自动关闭进度条；`pauseOnHover` 控制悬停是否暂停计时（antd ≥ 5.18）。

## en-US

Use `showProgress` for the auto-close progress bar, and `pauseOnHover` to control whether hover pauses the timer (antd ≥ 5.18).
</docs>

<template>
  <a-space>
    <a-button type="primary" @click="openWithProgress">Show with progress</a-button>
    <a-button @click="openNoPause">Do not pause on hover</a-button>
  </a-space>
</template>
<script lang="ts" setup>
import { notification } from 'ant-design-vue';

const openWithProgress = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This notification shows a progress bar while auto closing.',
    showProgress: true,
  });
};

const openNoPause = () => {
  notification.open({
    message: 'Notification Title',
    description: 'Timer keeps running even when hovered.',
    showProgress: true,
    pauseOnHover: false,
  });
};
</script>
