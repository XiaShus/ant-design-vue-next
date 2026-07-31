<docs>
---
order: 6
title:
  zh-CN: 高亮区域间隙
  en-US: Target gap
---

## zh-CN

通过 `gap` 控制高亮区域与目标元素的间距与圆角；`offset` 支持数字或 `[horizontal, vertical]`。

## en-US

Use `gap` to control the offset and radius of the highlighted area. `offset` accepts a number or `[horizontal, vertical]`.

</docs>

<template>
  <a-button type="primary" @click="open = true">Begin Tour</a-button>
  <a-divider />
  <a-button ref="targetRef">Target</a-button>
  <a-tour :open="open" :steps="steps" :gap="{ offset: [12, 8], radius: 8 }" @close="open = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TourProps } from 'ant-design-vue';

const open = ref(false);
const targetRef = ref();
const steps: TourProps['steps'] = [
  {
    title: 'Gap',
    description: 'Highlighted area uses custom gap offset.',
    target: () => targetRef.value && targetRef.value.$el,
  },
];
</script>
