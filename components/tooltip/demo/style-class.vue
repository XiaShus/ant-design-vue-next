<docs>
---
order: 7
title:
  zh-CN: 自定义语义结构样式
  en-US: Custom semantic dom styling
---

## zh-CN

通过 `classNames` 和 `styles` 自定义 Tooltip 语义化结构样式（Popover / Popconfirm 同）。

## en-US

Customize Tooltip semantic DOM styles via `classNames` and `styles` (also Popover / Popconfirm).
</docs>

<template>
  <a-tooltip
    title="prompt text"
    :class-names="{ root: 'demo-tooltip-root', body: 'demo-tooltip-body' }"
    :styles="{ body: { fontWeight: 600 } }"
  >
    <a-button>Hover me</a-button>
  </a-tooltip>
</template>

<style>
.demo-tooltip-root .ant-tooltip-inner {
  background: #1677ff;
}
.demo-tooltip-body {
  letter-spacing: 0.02em;
}
</style>
