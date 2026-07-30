<docs>
---
order: 3
title:
  zh-CN: 对象形式 closable
  en-US: Object closable
---

## zh-CN

`closable` 支持传入配置对象，可自定义关闭图标，并在对象内配置 `onClose` / `afterClose`。

## en-US

`closable` accepts a config object for custom `closeIcon`, plus nested `onClose` / `afterClose`.
</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-alert
      message="closable with custom closeIcon"
      type="info"
      :closable="{ closeIcon: 'Close now' }"
    />
    <a-alert
      message="closable with onClose / afterClose"
      type="warning"
      :closable="{ onClose, afterClose }"
    />
  </a-space>
</template>

<script lang="ts" setup>
const onClose = (e: MouseEvent) => {
  console.log(e, 'closable.onClose');
};
const afterClose = () => {
  console.log('closable.afterClose');
};
</script>
