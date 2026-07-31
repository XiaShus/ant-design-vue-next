<docs>
---
order: 0.5
title:
  zh-CN: 配置项
  en-US: Items
---

## zh-CN

通过 `items` 配置页签；可用 `icon` 设置图标（antd ≥ 4.23 / 5.12）。

## en-US

Configure tabs with `items`; set `icon` for tab icons (antd ≥ 4.23 / 5.12).
</docs>

<template>
  <a-tabs v-model:activeKey="activeKey" :items="items" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';

const activeKey = ref('1');
const items = [
  {
    key: '1',
    label: 'Tab 1',
    icon: h(AppleOutlined),
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    icon: h(AndroidOutlined),
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];
</script>
