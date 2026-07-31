<docs>
---
order: 10
title:
  zh-CN: 带移除图标
  en-US: With clear icon
---

## zh-CN

带移除图标的输入框，点击图标删除所有内容。`allowClear` 可传 `{ clearIcon }`，并通过 `onClear` 监听清除。

## en-US

Input with clear icon. `allowClear` accepts `{ clearIcon }`, and `onClear` fires when cleared.

</docs>
<template>
  <div>
    <a-input
      v-model:value="value1"
      placeholder="input with clear icon"
      allow-clear
      @clear="onClear"
    />
    <br />
    <br />
    <a-input v-model:value="value2" placeholder="custom clear icon" :allow-clear="{ clearIcon }" />
    <br />
    <br />
    <a-textarea
      v-model:value="value3"
      placeholder="textarea with clear icon"
      allow-clear
      @clear="onClear"
    />
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const clearIcon = h(CloseOutlined, { style: { color: '#ff4d4f' } });
const value1 = ref<string>('hello');
const value2 = ref<string>('world');
const value3 = ref<string>('');
const onClear = () => {
  message.info('cleared');
};
</script>
