<docs>
---
order: 5
title:
  zh-CN: 自定义加载图标
  en-US: Custom loading icon
---

## zh-CN

通过 `loading.icon` 自定义按钮加载图标（对齐 antd ≥ 5.23）。

## en-US

Customize the loading icon with `loading.icon` (antd ≥ 5.23).
</docs>

<template>
  <a-button type="primary" :loading="{ icon: h(SyncOutlined) }">Custom loading</a-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { SyncOutlined } from '@ant-design/icons-vue';
</script>
