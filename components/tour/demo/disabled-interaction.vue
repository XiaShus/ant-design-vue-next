<docs>
---
order: 6
title:
  zh-CN: 禁用高亮区域交互
  en-US: Disable interaction
---

## zh-CN

通过 `disabledInteraction` 禁用高亮区域的交互。

## en-US

Disable interaction on the highlighted area with `disabledInteraction`.

</docs>

<template>
  <a-button type="primary" @click="handleOpen(true)">Begin Tour</a-button>

  <a-divider />

  <a-space>
    <a-button ref="ref1">Upload</a-button>
    <a-button ref="ref2" type="primary">Save</a-button>
  </a-space>

  <a-tour :open="open" :steps="steps" disabled-interaction @close="handleOpen(false)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TourProps } from 'ant-design-vue';

const open = ref(false);
const ref1 = ref(null);
const ref2 = ref(null);

const steps: TourProps['steps'] = [
  {
    title: 'Upload File',
    description: 'Highlighted target cannot be clicked.',
    target: () => ref1.value && ref1.value.$el,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: () => ref2.value && ref2.value.$el,
  },
];

const handleOpen = (val: boolean): void => {
  open.value = val;
};
</script>
