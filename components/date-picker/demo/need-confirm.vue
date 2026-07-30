<docs>
---
order: 7
title:
  zh-CN: 确认选择
  en-US: Need Confirm
---

## zh-CN

通过 `needConfirm` 控制是否需要点击确认按钮才提交选中值。未设置时，带时间选择的面板会默认显示确认按钮。

## en-US

Use `needConfirm` to require clicking OK before committing the value. When unset, panels with time selection show the confirm button by default.

</docs>

<template>
  <a-space direction="vertical" :size="12">
    <a-date-picker need-confirm />
    <a-date-picker show-time :need-confirm="false" />
  </a-space>
</template>
