<docs>
---
order: 2.5
title:
  zh-CN: 自定义指示条
  en-US: Custom indicator
---

## zh-CN

通过 `indicator` 自定义指示条尺寸与对齐方式（antd ≥ 5.13）。

## en-US

Customize ink bar size and alignment via `indicator` (antd ≥ 5.13).
</docs>

<template>
  <a-tabs v-model:activeKey="activeKey" :indicator="{ size: 20, align: 'center' }">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
  <br />
  <a-tabs
    v-model:activeKey="activeKey2"
    :indicator="{ size: origin => origin - 20, align: 'start' }"
  >
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const activeKey = ref('1');
const activeKey2 = ref('1');
</script>
