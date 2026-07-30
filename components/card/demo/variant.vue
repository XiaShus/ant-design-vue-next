<docs>
---
order: 2
title:
  zh-CN: 形态变体
  en-US: Variant
---

## zh-CN

通过 `variant` 设置卡片边框形态，可选 `outlined` / `borderless`。`bordered={false}` 仍可用。

## en-US

Use `variant` for card border style: `outlined` / `borderless`. Legacy `bordered={false}` still works.
</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-card title="Outlined" variant="outlined" style="width: 300px">
      <p>Card content</p>
    </a-card>
    <div style="background: #ececec; padding: 24px">
      <a-card title="Borderless" variant="borderless" style="width: 300px">
        <p>Card content</p>
      </a-card>
    </div>
  </a-space>
</template>
