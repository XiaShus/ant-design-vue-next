<docs>
---
order: 4
title:
  zh-CN: 计时器
  en-US: Timer
---

## zh-CN

`Statistic.Timer` 支持倒计时与正计时（对齐 antd ≥ 5.25）。`Statistic.Countdown` 仍可用。

## en-US

`Statistic.Timer` supports countdown and countup (antd ≥ 5.25). `Statistic.Countdown` remains available.
</docs>

<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic-timer type="countdown" title="Countdown" :value="deadline" @finish="onFinish" />
    </a-col>
    <a-col :span="12">
      <a-statistic-timer type="countup" title="Countup" :value="start" />
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
const onFinish = () => {
  console.log('finished!');
};
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const start = Date.now() - 1000 * 60 * 60;
</script>
