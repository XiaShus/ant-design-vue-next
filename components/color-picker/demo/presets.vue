<docs>
---
order: 6
title:
  zh-CN: 预设颜色
  en-US: Preset Colors
---

## zh-CN

通过 `presets` 设置预设色板。

## en-US

Set the presets color of the color picker.
</docs>

<template>
  <a-color-picker v-model:value="color" show-text :presets="presets" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref('#1677ff');
const presets = [
  {
    label: 'Recommended',
    colors: [
      '#000000',
      '#000000E0',
      '#000000A6',
      '#00000073',
      '#00000040',
      '#F5222D',
      '#FA8C16',
      '#FADB14',
      '#8BBB11',
      '#52C41A',
      '#13A8A8',
      '#1677FF',
      '#2F54EB',
      '#722ED1',
      '#EB2F96',
    ],
  },
];
</script>
