<docs>
---
order: 3
title:
  zh-CN: 可折叠
  en-US: Collapsible
---

## zh-CN

通过 `Panel` 的 `collapsible` 开启折叠按钮；`lazy` 可在拖拽时显示预览条，松手后再更新尺寸。

## en-US

Enable collapse controls with Panel `collapsible`. Set `lazy` to show a preview bar while dragging and apply size on mouse up.
</docs>

<template>
  <div style="height: 200px">
    <a-splitter lazy @collapse="onCollapse">
      <a-splitter-panel :default-size="120" collapsible :min="40">
        <div class="demo-panel">Left (collapsible)</div>
      </a-splitter-panel>
      <a-splitter-panel :min="40">
        <div class="demo-panel">Right</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>

<script lang="ts" setup>
const onCollapse = (sizes: number[]) => {
  console.log('collapse', sizes);
};
</script>

<style scoped>
.demo-panel {
  height: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
}
</style>
