<docs>
---
order: 8
title:
  zh-CN: 禁止拖拽
  en-US: Disable movable
---

## zh-CN

通过 `preview.movable={false}` 禁止预览图拖拽（对齐 antd ≥ 5.8）。

## en-US

Set `preview.movable={false}` to disable dragging the preview image (antd ≥ 5.8).
</docs>

<template>
  <a-image :width="200" :src="src" :preview="{ movable: false }" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    };
  },
});
</script>
