<docs>
---
order: 1
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

当需要在 `Button` 内嵌入 `Icon` 时，可以设置 `icon` 属性，或者直接在 `Button` 内使用 `Icon` 组件。

也可通过 `iconPlacement` 控制图标在按钮内的起止位置。

## en-US

`Button` components can contain an `Icon`. This is done by setting the `icon` property or placing an `Icon` component within the `Button`.

Use `iconPlacement` to place the icon at the start or end of the button.
</docs>

<template>
  <a-space direction="vertical">
    <a-space wrap>
      <a-tooltip title="search">
        <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="primary" shape="circle">A</a-button>
      <a-button type="primary" :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
    </a-space>
    <a-space wrap>
      <a-tooltip title="search">
        <a-button shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button :icon="h(SearchOutlined)">Search</a-button>
      <a-tooltip title="search">
        <a-button type="dashed" shape="circle" :icon="h(SearchOutlined)" />
      </a-tooltip>
      <a-button type="dashed" :icon="h(SearchOutlined)">Search</a-button>
      <a-button :icon="h(SearchOutlined)" href="https://www.google.com" />
    </a-space>
  </a-space>
</template>
<script lang="ts" setup>
import { h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
</script>
