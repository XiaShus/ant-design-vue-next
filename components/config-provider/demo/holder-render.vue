<docs>
---
order: 6
title:
  zh-CN: holderRender
  en-US: Static holderRender
---

## zh-CN

通过 `ConfigProvider.config({ holderRender })` 为静态 `Modal.confirm` / `message` / `notification` 注入主题（对齐 antd ≥ 5.13）。

## en-US

Use `ConfigProvider.config({ holderRender })` to inject theme into static Modal / message / notification (antd ≥ 5.13).
</docs>

<template>
  <a-space>
    <a-button type="primary" @click="openConfirm">Open confirm</a-button>
    <a-button @click="openMessage">Open message</a-button>
  </a-space>
</template>
<script lang="ts" setup>
import { h, onBeforeUnmount, onMounted } from 'vue';
import { ConfigProvider, Modal, message } from '..';

onMounted(() => {
  ConfigProvider.config({
    holderRender: children =>
      h(
        ConfigProvider,
        { theme: { token: { colorPrimary: '#00b96b' } } },
        { default: () => children },
      ),
  });
});

onBeforeUnmount(() => {
  ConfigProvider.config({ holderRender: undefined });
});

const openConfirm = () => {
  Modal.confirm({
    title: 'holderRender theme',
    content: 'Primary color comes from holderRender ConfigProvider.',
  });
};

const openMessage = () => {
  message.success('Themed by holderRender');
};
</script>
