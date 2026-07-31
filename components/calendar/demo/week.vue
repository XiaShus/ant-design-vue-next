<docs>
---
order: 1.5
title:
  zh-CN: 显示周数
  en-US: Show Week Number
---

## zh-CN

通过 `showWeek` 在日历中显示周数。

## en-US

Use `showWeek` to display the week number column.

</docs>

<template>
  <a-calendar v-model:value="value" show-week />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { Dayjs } from 'dayjs';
const value = ref<Dayjs>();
</script>
