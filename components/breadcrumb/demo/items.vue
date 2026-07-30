<docs>
---
order: 1.5
title:
  zh-CN: items 配置
  en-US: items config
---

## zh-CN

通过 `items` 配置面包屑内容（antd ≥ 5.3）。`routes` 仍可用，但推荐迁移到 `items` + `title`。

## en-US

Configure breadcrumb content via `items` (antd ≥ 5.3). `routes` still works; prefer `items` with `title`.
</docs>

<template>
  <a-breadcrumb :items="items" />
</template>
<script lang="ts" setup>
import type { BreadcrumbProps } from 'ant-design-vue';
const items: BreadcrumbProps['items'] = [
  {
    path: 'index',
    title: 'Home',
  },
  {
    path: 'first',
    title: 'Application Center',
    children: [
      {
        path: '/general',
        title: 'General',
      },
      {
        path: '/layout',
        title: 'Layout',
      },
      {
        path: '/navigation',
        title: 'Navigation',
      },
    ],
  },
  {
    path: 'second',
    title: 'Application List',
  },
  {
    title: 'An Application',
  },
];
</script>
