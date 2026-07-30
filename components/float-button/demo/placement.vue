<docs>
---
order: 7
iframe: 360
title:
  zh-CN: 弹出方向
  en-US: Placement
---

## zh-CN

设置 `placement` 可自定义菜单模式下的展开方向，支持 `top` `right` `bottom` `left`，默认 `top`。

## en-US

Use `placement` to customize menu expand direction: `top` `right` `bottom` `left`. Default is `top`.
</docs>

<template>
  <a-float-button-group
    trigger="click"
    type="primary"
    placement="top"
    :style="{ insetInlineEnd: '24px', bottom: '180px' }"
  >
    <template #icon>
      <UpOutlined />
    </template>
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
  <a-float-button-group
    trigger="click"
    type="primary"
    placement="right"
    :style="{ insetInlineEnd: '94px', bottom: '100px' }"
  >
    <template #icon>
      <RightOutlined />
    </template>
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
  <a-float-button-group
    trigger="click"
    type="primary"
    placement="bottom"
    :style="{ insetInlineEnd: '164px', bottom: '180px' }"
  >
    <template #icon>
      <DownOutlined />
    </template>
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
  <a-float-button-group
    trigger="click"
    type="primary"
    placement="left"
    :style="{ insetInlineEnd: '234px', bottom: '100px' }"
  >
    <template #icon>
      <LeftOutlined />
    </template>
    <a-float-button />
    <a-float-button />
  </a-float-button-group>
</template>

<script lang="ts" setup>
import { UpOutlined, RightOutlined, DownOutlined, LeftOutlined } from '@ant-design/icons-vue';
</script>
