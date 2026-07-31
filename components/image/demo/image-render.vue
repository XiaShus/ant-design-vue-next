<docs>
---
order: 9
title:
  zh-CN: 自定义预览图
  en-US: Custom preview image
---

## zh-CN

通过 `preview.imageRender` 自定义预览图片节点（对齐 antd ≥ 5.7）。

## en-US

Customize the preview image node with `preview.imageRender` (antd ≥ 5.7).
</docs>

<template>
  <a-image :width="200" :src="src" :preview="{ imageRender }" />
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export default defineComponent({
  setup() {
    const imageRender = (originalNode: any) => (
      <div style="position: relative; display: inline-block">
        {originalNode}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '8px 12px',
            color: '#fff',
            background: 'linear-gradient(transparent, rgba(0,0,0,.55))',
            textAlign: 'center',
          }}
        >
          Custom imageRender overlay
        </div>
      </div>
    );

    return { src, imageRender };
  },
});
</script>
