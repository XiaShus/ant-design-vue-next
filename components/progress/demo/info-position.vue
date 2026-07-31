<docs>
---
order: 1.5
title:
  zh-CN: 进度信息位置
  en-US: Progress value position
---

## zh-CN

通过 `percentPosition` 调整进度数值的对齐与内外位置（`align` / `type`）。

## en-US

Use `percentPosition` to control progress value alignment and whether it is inside or outside the bar.

</docs>

<template>
  <div>
    <a-progress :percent="50" />
    <a-progress :percent="50" :percent-position="{ align: 'center', type: 'outer' }" />
    <a-progress :percent="50" :percent-position="{ align: 'start', type: 'outer' }" />
    <a-progress
      :percent="50"
      size="small"
      :percent-position="{ align: 'center', type: 'inner' }"
      stroke-color="#52c41a"
    />
    <a-progress
      :percent="30"
      :size="[300, 20]"
      :percent-position="{ align: 'start', type: 'inner' }"
      stroke-color="#001122"
    />
    <a-progress
      :percent="100"
      :size="[300, 20]"
      :percent-position="{ align: 'end', type: 'inner' }"
      stroke-color="#eeeeee"
    />
  </div>
</template>
