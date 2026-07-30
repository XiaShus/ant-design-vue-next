<docs>
---
order: 2.6
title:
  zh-CN: 颜色与变体
  en-US: Color & Variant
---

## zh-CN

通过 `color` 与 `variant` 组合生成按钮样式（antd ≥ 5.21）。未设置时仍可使用原有 `type`。

## en-US

Compose button styles with `color` and `variant` (antd ≥ 5.21). Legacy `type` remains supported when they are omitted.
</docs>

<template>
  <a-flex vertical gap="middle">
    <a-flex gap="middle" wrap="wrap">
      <a-button color="default" variant="solid">Solid</a-button>
      <a-button color="default" variant="outlined">Outlined</a-button>
      <a-button color="default" variant="dashed">Dashed</a-button>
      <a-button color="default" variant="filled">Filled</a-button>
      <a-button color="default" variant="text">Text</a-button>
      <a-button color="default" variant="link">Link</a-button>
    </a-flex>
    <a-flex gap="middle" wrap="wrap">
      <a-button color="primary" variant="solid">Solid</a-button>
      <a-button color="primary" variant="outlined">Outlined</a-button>
      <a-button color="primary" variant="dashed">Dashed</a-button>
      <a-button color="primary" variant="filled">Filled</a-button>
      <a-button color="primary" variant="text">Text</a-button>
      <a-button color="primary" variant="link">Link</a-button>
    </a-flex>
    <a-flex gap="middle" wrap="wrap">
      <a-button color="danger" variant="solid">Solid</a-button>
      <a-button color="danger" variant="outlined">Outlined</a-button>
      <a-button color="danger" variant="dashed">Dashed</a-button>
      <a-button color="danger" variant="filled">Filled</a-button>
      <a-button color="danger" variant="text">Text</a-button>
      <a-button color="danger" variant="link">Link</a-button>
    </a-flex>
  </a-flex>
</template>
