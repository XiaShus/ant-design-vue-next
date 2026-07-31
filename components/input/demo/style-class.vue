<docs>
---
order: 18
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Input / TextArea 语义化结构样式。

## en-US

You can customize Input / TextArea semantic DOM styles via `classNames` and `styles`.

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-input v-model:value="value1" placeholder="Semantic Input" allow-clear>
      <template #prefix>¥</template>
      <template #suffix>RMB</template>
    </a-input>
    <a-input
      v-model:value="value2"
      placeholder="classNames / styles"
      allow-clear
      :class-names="{
        input: 'demo-input-el',
        prefix: 'demo-input-prefix',
        affixWrapper: 'demo-input-affix',
      }"
      :styles="{
        prefix: { color: '#1677ff' },
        affixWrapper: { background: 'rgba(22, 119, 255, 0.06)' },
      }"
    >
      <template #prefix>$</template>
    </a-input>
    <a-textarea
      v-model:value="value3"
      placeholder="Semantic TextArea"
      :rows="2"
      allow-clear
      :class-names="{ textarea: 'demo-textarea-el', affixWrapper: 'demo-textarea-affix' }"
      :styles="{ textarea: { fontWeight: 500 } }"
    />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref('100');
const value2 = ref('');
const value3 = ref('');
</script>
<style scoped>
:deep(.demo-input-el) {
  color: #1677ff;
}
:deep(.demo-input-prefix) {
  font-weight: 600;
}
:deep(.demo-input-affix),
:deep(.demo-textarea-affix) {
  border-color: #1677ff;
}
:deep(.demo-textarea-el) {
  color: #1677ff;
}
</style>
