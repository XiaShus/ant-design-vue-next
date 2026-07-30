<docs>
---
order: 1
title:
  zh-CN: 配置项
  en-US: items
---

## zh-CN

通过 `items` 配置描述列表内容（对齐 antd ≥ 5.8）。

## en-US

Configure description content via `items` (antd ≥ 5.8).
</docs>

<template>
  <a-descriptions title="User Info" :items="items" />
</template>

<script lang="ts" setup>
import type { DescriptionsItemType } from '..';

const items: DescriptionsItemType[] = [
  { key: '1', label: 'UserName', children: 'Zhou Maomao' },
  { key: '2', label: 'Telephone', children: '1810000000' },
  { key: '3', label: 'Live', children: 'Hangzhou, Zhejiang' },
  { key: '4', label: 'Remark', children: 'empty' },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];
</script>
