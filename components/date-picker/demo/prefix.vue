<docs>
---
order: 14
title:
  zh-CN: 前缀
  en-US: Prefix
---

## zh-CN

通过 `prefix` 自定义前缀内容（对齐 antd ≥ 5.22）。

## en-US

Customize prefix content via `prefix` (antd ≥ 5.22).

</docs>

<template>
  <a-space direction="vertical">
    <a-date-picker v-model:value="value1">
      <template #prefix>
        <CalendarOutlined />
      </template>
    </a-date-picker>
    <a-range-picker v-model:value="value2">
      <template #prefix>
        <UserOutlined />
      </template>
    </a-range-picker>
    <a-date-picker v-model:value="value3" picker="time" prefix="⏱" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';

const value1 = ref<Dayjs>();
const value2 = ref<[Dayjs, Dayjs]>();
const value3 = ref<Dayjs>();
</script>
