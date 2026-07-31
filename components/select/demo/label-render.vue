<docs>
---
order: 15
title:
  zh-CN: 自定义选中与选项渲染
  en-US: Custom label / option render
---

## zh-CN

使用 `labelRender` 自定义选中项展示，使用 `optionRender` 自定义下拉选项内容（对齐 antd ≥ 5.15 / 5.11）。

## en-US

Use `labelRender` to customize the selected label and `optionRender` for option content (antd ≥ 5.15 / 5.11).
</docs>

<template>
  <a-select
    v-model:value="value"
    style="width: 240px"
    :options="options"
    :label-render="labelRender"
    :option-render="optionRender"
  />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const value = ref('china');
const options = [
  { value: 'china', label: 'China', icon: '🇨🇳' },
  { value: 'usa', label: 'USA', icon: '🇺🇸' },
  { value: 'japan', label: 'Japan', icon: '🇯🇵' },
];

const labelRender = (props: Record<string, any>) =>
  h('span', {}, [`Selected: ${props.label ?? props.value}`]);

const optionRender = (option: Record<string, any>) =>
  h('span', {}, [`${option.icon} ${option.label}`]);
</script>
