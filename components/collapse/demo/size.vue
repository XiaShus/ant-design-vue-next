<docs>
---
order: 3
title:
  zh-CN: 面板尺寸
  en-US: Size
---

## zh-CN

通过 `size` 设置折叠面板尺寸，支持 `large` / `default` / `small`。

## en-US

Set collapse size with `size`: `large` / `default` / `small`.
</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">Large</a-radio-button>
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="small">Small</a-radio-button>
    </a-radio-group>
    <a-collapse v-model:activeKey="activeKey" :size="size">
      <a-collapse-panel key="1" header="This is panel header 1">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </a-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CollapseSize } from '../commonProps';

const size = ref<CollapseSize>('default');
const activeKey = ref(['1']);
const text =
  'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.';
</script>
