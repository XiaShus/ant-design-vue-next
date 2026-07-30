<docs>
---
order: 5
title:
  zh-CN: useConfig
  en-US: useConfig
---

## zh-CN

通过 `ConfigProvider.useConfig()`（或 `useConfig`）读取最近一层 Provider 的 `componentSize` / `componentDisabled`（对齐 antd ≥ 5.3）。

## en-US

Use `ConfigProvider.useConfig()` (or `useConfig`) to read `componentSize` / `componentDisabled` from the nearest provider (antd ≥ 5.3).
</docs>

<template>
  <a-space direction="vertical">
    <a-radio-group v-model:value="componentSize">
      <a-radio-button value="small">Small</a-radio-button>
      <a-radio-button value="middle">Middle</a-radio-button>
      <a-radio-button value="large">Large</a-radio-button>
    </a-radio-group>
    <a-switch
      v-model:checked="componentDisabled"
      checked-children="disabled"
      un-checked-children="enabled"
    />
    <a-config-provider :component-size="componentSize" :component-disabled="componentDisabled">
      <UseConfigConsumer />
    </a-config-provider>
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useConfig } from '..';

const UseConfigConsumer = defineComponent({
  name: 'UseConfigConsumer',
  setup() {
    const { componentSize, componentDisabled } = useConfig();
    const sizeLabel = computed(() => String(componentSize.value ?? 'default'));
    const disabledLabel = computed(() => String(!!componentDisabled.value));
    return { sizeLabel, disabledLabel };
  },
  template: `<div>size: {{ sizeLabel }}, disabled: {{ disabledLabel }}</div>`,
});

export default defineComponent({
  components: { UseConfigConsumer },
  setup() {
    const componentSize = ref<'small' | 'middle' | 'large'>('middle');
    const componentDisabled = ref(false);
    return { componentSize, componentDisabled };
  },
});
</script>
