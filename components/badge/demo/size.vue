<docs>
---
order: 2
title:
  zh-CN: 大小
  en-US: Size
---

## zh-CN

通过 `size` 设置徽标大小。

## en-US

Set badge size with `size`.

</docs>

<template>
  <a-space size="large">
    <a-badge :count="5">
      <a href="#" class="head-example" />
    </a-badge>
    <a-badge :count="5" size="small">
      <a href="#" class="head-example" />
    </a-badge>
  </a-space>
</template>
