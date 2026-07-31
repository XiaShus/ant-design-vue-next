<docs>
---
order: 9
title:
  zh-CN: 自定义渲染面板
  en-US: Custom drawer content render
---

## zh-CN

通过 `drawerRender` 自定义抽屉面板渲染，例如实现拖拽。

## en-US

Customize drawer panel render with `drawerRender`.

</docs>

<template>
  <a-button type="primary" @click="showDrawer">Open Drawer</a-button>
  <a-drawer v-model:open="open" title="Custom Render" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #drawerRender="{ originVNode }">
      <div
        :style="{ boxShadow: '0 0 12px rgba(0,0,0,0.2)', borderRadius: '8px', overflow: 'hidden' }"
      >
        <component :is="originVNode" />
      </div>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
</script>
