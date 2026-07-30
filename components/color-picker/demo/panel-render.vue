<docs>
---
order: 7
title:
  zh-CN: 自定义面板
  en-US: Custom panel
---

## zh-CN

通过 `panelRender` 自定义面板布局；`extra.components` 提供已绑定的 `Picker` / `Presets`。

## en-US

Customize panel layout with `panelRender`. `extra.components` exposes bound `Picker` / `Presets`.
</docs>

<template>
  <a-space>
    <a-color-picker v-model:value="color" :presets="presets" :panel-render="panelRender" />
    <a-color-picker v-model:value="color2" :presets="presets">
      <template #panelRender="{ components }">
        <div style="display: flex; gap: 8px">
          <component :is="components.Presets" />
          <component :is="components.Picker" />
        </div>
      </template>
    </a-color-picker>
  </a-space>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';

const color = ref('#1677ff');
const color2 = ref('#52c41a');
const presets = [
  {
    label: 'Recommended',
    colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
  },
];

const panelRender = (_panel: any, { components }: any) =>
  h('div', { style: { padding: '0 4px' } }, [h(components.Presets), h(components.Picker)]);
</script>
