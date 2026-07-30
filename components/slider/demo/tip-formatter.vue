<docs>
---
order: 3
title:
  zh-CN: 自定义提示
  en-US: Customize tooltip
---

## zh-CN

使用 `tooltip.formatter` 可以格式化 `Tooltip` 的内容，设置 `formatter: null` 则隐藏 `Tooltip`。

## en-US

Use `tooltip.formatter` to format content of `Tooltip`. If `formatter` is null, hide it.
</docs>

<template>
  <div>
    <a-slider :tooltip="{ formatter }" />
    <a-slider :tooltip="{ formatter: null }" />
  </div>
</template>
<script lang="ts" setup>
const formatter = (value: number) => {
  return `${value}%`;
};
</script>
