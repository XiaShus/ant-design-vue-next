<docs>
---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic
---

## zh-CN

初始化面板尺寸与最小/最大限制。

## en-US

Initialize panel size and size limits.
</docs>

<template>
  <div style="height: 200px; border: 1px solid #f0f0f0">
    <a-splitter>
      <a-splitter-panel :default-size="120" :min="60" :max="240">
        <div style="padding: 16px">First</div>
      </a-splitter-panel>
      <a-splitter-panel>
        <div style="padding: 16px">Second</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>
