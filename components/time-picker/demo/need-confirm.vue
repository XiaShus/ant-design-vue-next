<docs>
---
order: 6
title:
  zh-CN: 确认选择
  en-US: Need Confirm
---

## zh-CN

通过 `needConfirm` 控制是否需要点击确认按钮才提交选中值。TimePicker 默认需要确认；设为 `false` 时可即时提交。

## en-US

Use `needConfirm` to require clicking OK before committing the value. TimePicker needs confirm by default; set `false` to submit immediately.

</docs>

<template>
  <a-space direction="vertical" :size="12">
    <a-time-picker need-confirm />
    <a-time-picker :need-confirm="false" />
  </a-space>
</template>
