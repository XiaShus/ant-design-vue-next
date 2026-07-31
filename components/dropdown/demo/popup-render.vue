<docs>
---
order: 12
title:
  zh-CN: 自定义下拉内容
  en-US: Custom popup render
---

## zh-CN

使用 `popupRender` 自定义下拉菜单外层内容（对齐 antd ≥ 5.25）。

## en-US

Customize dropdown content with `popupRender` (antd ≥ 5.25).
</docs>

<template>
  <a-dropdown :popup-render="popupRender">
    <a class="ant-dropdown-link" @click.prevent>Hover me</a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">1st menu item</a-menu-item>
        <a-menu-item key="2">2nd menu item</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const popupRender = (menus: any) => (
      <div>
        {menus}
        <div style="padding: 8px; border-top: 1px solid #f0f0f0">Extra footer</div>
      </div>
    );
    return { popupRender };
  },
});
</script>
