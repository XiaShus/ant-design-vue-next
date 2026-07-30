<docs>
---
order: 2.5
title:
  zh-CN: 自定义下拉图标
  en-US: Custom selections icon
---

## zh-CN

通过 `selectionsIcon` 自定义全选区域下拉图标（antd ≥ 5.14）。也可在 ConfigProvider 的 `transfer.selectionsIcon` 中全局配置。

## en-US

Customize the header selections dropdown icon via `selectionsIcon` (antd ≥ 5.14). Can also be set globally with ConfigProvider `transfer.selectionsIcon`.
</docs>

<template>
  <a-transfer
    v-model:target-keys="targetKeys"
    :data-source="mockData"
    :render="item => item.title"
    :selections-icon="h(SmileOutlined)"
  />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { SmileOutlined } from '@ant-design/icons-vue';
interface MockData {
  key: string;
  title: string;
  description: string;
}
const mockData: MockData[] = [];
for (let i = 0; i < 10; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}
const targetKeys = ref<string[]>(['1', '2']);
</script>
