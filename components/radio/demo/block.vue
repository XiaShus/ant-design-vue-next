<docs>
---
order: 9
title:
  zh-CN: Block 单选组合
  en-US: Block RadioGroup
---

## zh-CN

`block` 属性使选项宽度撑满父容器；`options` 支持每项 `className` / `style`。

## en-US

`block` makes options fill the parent width. Each `options` item can set `className` / `style`.

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-radio-group v-model:value="value1" block :options="plainOptions" option-type="button" />
    <a-radio-group v-model:value="value2" block button-style="solid" :options="styledOptions" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { RadioGroupProps } from 'ant-design-vue';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const styledOptions: RadioGroupProps['options'] = [
  { label: 'Apple', value: 'Apple', style: { fontWeight: 600 } },
  { label: 'Pear', value: 'Pear', className: 'demo-radio-option' },
  { label: 'Orange', value: 'Orange' },
];
const value1 = ref('Apple');
const value2 = ref('Pear');
</script>
<style scoped>
:deep(.demo-radio-option) {
  color: #1677ff;
}
</style>
