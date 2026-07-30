<docs>
---
order: 1
title:
  zh-CN: 垂直方向
  en-US: Vertical
---

## zh-CN

纵向分割布局。

## en-US

Vertical layout.
</docs>

<template>
  <div style="height: 240px; border: 1px solid #f0f0f0">
    <a-splitter layout="vertical">
      <a-splitter-panel :default-size="80" :min="40">
        <div style="padding: 16px">Top</div>
      </a-splitter-panel>
      <a-splitter-panel>
        <div style="padding: 16px">Bottom</div>
      </a-splitter-panel>
    </a-splitter>
  </div>
</template>
