<docs>
---
order: 1
title:
  zh-CN: 配置项
  en-US: items
---

## zh-CN

通过 `items` 配置时间轴节点（对齐 antd ≥ 5.2）。

## en-US

Configure timeline nodes via `items` (antd ≥ 5.2).
</docs>

<template>
  <a-timeline :items="items" />
</template>

<script lang="ts" setup>
import type { TimelineItemType } from '..';

const items: TimelineItemType[] = [
  { children: 'Create a services site 2015-09-01' },
  { children: 'Solve initial network problems 2015-09-01' },
  { children: 'Technical testing 2015-09-01', color: 'red' },
  { children: 'Network problems being solved 2015-09-01' },
];
</script>
