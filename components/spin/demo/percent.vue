<docs>
---
order: 7
title:
  zh-CN: 进度
  en-US: Progress
---

## zh-CN

展示进度。`percent="auto"` 时显示不确定进度。

## en-US

Show progress. When `percent="auto"`, an indeterminate progress is displayed.

</docs>

<template>
  <a-flex align="center" gap="middle">
    <a-spin :percent="percent" />
    <a-spin :percent="auto ? 'auto' : percent" />
    <a-button type="primary" @click="onAuto">{{ auto ? 'Manual' : 'Auto' }}</a-button>
  </a-flex>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const percent = ref(0);
const auto = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const clear = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const startManual = () => {
  clear();
  percent.value = 0;
  timer = setInterval(() => {
    percent.value = percent.value >= 100 ? 0 : percent.value + 5;
  }, 200);
};

const onAuto = () => {
  auto.value = !auto.value;
  if (auto.value) {
    clear();
  } else {
    startManual();
  }
};

onMounted(startManual);
onBeforeUnmount(clear);
</script>
