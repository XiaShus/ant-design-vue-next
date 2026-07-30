<docs>
---
order: 1.5
title:
  zh-CN: 按钮图标位置
  en-US: Icon placement
---

## zh-CN

通过 `iconPlacement` 设置图标在按钮内的位置（antd ≥ 5.17）。

## en-US

Use `iconPlacement` to control icon position inside the button (antd ≥ 5.17).
</docs>

<template>
  <a-space>
    <a-button type="primary" :icon="h(SearchOutlined)">Search</a-button>
    <a-button type="primary" :icon="h(SearchOutlined)" icon-placement="end">Search</a-button>
  </a-space>
</template>
<script lang="ts" setup>
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
</script>
