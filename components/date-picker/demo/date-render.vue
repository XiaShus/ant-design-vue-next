<docs>
---
order: 9
title:
  zh-CN: 定制单元格
  en-US: Customized Cell Rendering
---

## zh-CN

使用 `cellRender` 自定义日期单元格的内容和样式（`dateRender` 已废弃）。

## en-US

Customize picker cells with `cellRender` (`dateRender` is deprecated).

</docs>
<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value1">
      <template #cellRender="{ current, type }">
        <div v-if="type === 'date'" class="ant-picker-cell-inner" :style="getCurrentStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-date-picker>
    <a-range-picker v-model:value="value2">
      <template #cellRender="{ current, type }">
        <div v-if="type === 'date'" class="ant-picker-cell-inner" :style="getCurrentStyle(current)">
          {{ current.date() }}
        </div>
      </template>
    </a-range-picker>
  </a-space>
</template>
<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import { ref } from 'vue';
import type { CSSProperties } from 'vue';
const getCurrentStyle = (current: Dayjs) => {
  const style: CSSProperties = {};

  if (current.date() === 1) {
    style.border = '1px solid #1890ff';
    style.borderRadius = '50%';
  }

  return style;
};
const value1 = ref<Dayjs>();
const value2 = ref<[Dayjs, Dayjs]>();
</script>
