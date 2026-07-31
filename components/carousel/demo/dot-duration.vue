<docs>
---
order: 3.1
title:
  zh-CN: 指示点进度
  en-US: Dot duration
---

## zh-CN

`autoplay` 支持对象配置；设置 `dotDuration` 可在指示点上展示自动切换进度（antd ≥ 5.24）。

## en-US

`autoplay` accepts an object; set `dotDuration` to show progress on dots while auto-scrolling (antd ≥ 5.24).

</docs>

<template>
  <a-carousel :autoplay="{ dotDuration: true }" :autoplay-speed="3000">
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<style scoped>
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}
</style>
