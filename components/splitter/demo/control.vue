<docs>
---
order: 2
title:
  zh-CN: 受控模式
  en-US: Control mode
---

## zh-CN

通过 `size` + `resize` 事件受控更新面板尺寸。

## en-US

Controlled panel sizes via `size` and `resize`.
</docs>

<template>
  <div style="height: 200px; border: 1px solid #f0f0f0">
    <a-splitter @resize="onResize">
      <a-splitter-panel :size="sizes[0]" :min="40">
        <div style="padding: 16px">Left {{ Math.round(sizes[0]) }}px</div>
      </a-splitter-panel>
      <a-splitter-panel :size="sizes[1]" :min="40">
        <div style="padding: 16px">Right {{ Math.round(sizes[1]) }}px</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const sizes = ref([160, 240]);
const onResize = (next: number[]) => {
  sizes.value = next;
};
</script>
