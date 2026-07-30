<docs>
---
order: 7
title:
  zh-CN: 自定义工具栏
  en-US: Custom toolbar
---

## zh-CN

通过 `preview.toolbarRender` 自定义预览工具栏（对齐 antd ≥ 5.7），可在默认操作外增加下载等能力。

## en-US

Customize the preview toolbar with `preview.toolbarRender` (antd ≥ 5.7). Useful for adding download and other actions.
</docs>

<template>
  <a-image :width="200" :src="src" :preview="{ toolbarRender }" />
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons-vue';
import Space from '../../space';
import type { ToolbarRenderInfoType } from '../../vc-image/src/Preview';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

function onDownload(url: string) {
  const suffix = url.slice(url.lastIndexOf('.'));
  const filename = Date.now() + suffix;
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(blobUrl);
      link.remove();
    });
}

export default defineComponent({
  setup() {
    const toolbarRender = (
      _: unknown,
      {
        transform: { scale },
        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
        image,
      }: ToolbarRenderInfoType,
    ) => (
      <Space size={12} class="toolbar-wrapper">
        <DownloadOutlined onClick={() => onDownload(image.url || src)} />
        <SwapOutlined rotate={90} onClick={onFlipY} />
        <SwapOutlined onClick={onFlipX} />
        <RotateLeftOutlined onClick={onRotateLeft} />
        <RotateRightOutlined onClick={onRotateRight} />
        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
        <ZoomInOutlined onClick={onZoomIn} />
        <UndoOutlined onClick={onReset} />
      </Space>
    );

    return { src, toolbarRender };
  },
});
</script>

<style scoped>
.toolbar-wrapper {
  padding: 0 24px;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
}
.toolbar-wrapper :deep(.anticon) {
  padding: 12px;
  cursor: pointer;
}
.toolbar-wrapper :deep(.anticon[disabled]) {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>
