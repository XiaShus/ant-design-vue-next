<docs>
---
order: 3
title:
  zh-CN: 自动换行
  en-US: Wrap
---

## zh-CN

自动换行。`wrap` 支持布尔快捷写法（`true` / `false`）。

## en-US

Auto wrap line. `wrap` also accepts boolean shortcuts (`true` / `false`).

</docs>

<template>
  <a-flex :wrap="true" gap="small">
    <a-button v-for="item in new Array(24)" :key="item" type="primary">Button</a-button>
  </a-flex>
</template>
