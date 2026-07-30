<docs>
---
order: 2.5
title:
  zh-CN: 中文自动间距
  en-US: Auto insert space
---

## zh-CN

按钮内容为两个汉字时默认插入间距；可通过 `autoInsertSpace={false}` 关闭（antd ≥ 5.17）。

## en-US

By default a space is inserted between two Chinese characters. Set `autoInsertSpace` to `false` to disable (antd ≥ 5.17).
</docs>

<template>
  <a-space>
    <a-button type="primary">操作</a-button>
    <a-button type="primary" :auto-insert-space="false">操作</a-button>
  </a-space>
</template>
