<docs>
---
order: 7
title:
  zh-CN: 滚动时选中
  en-US: Change on Scroll
---

## zh-CN

通过 `changeOnScroll` 在滚动列时更新选中值。通常与 `needConfirm={false}` 搭配以便即时提交。

## en-US

Use `changeOnScroll` to update the value while scrolling columns. Pair with `needConfirm={false}` for immediate commit.

</docs>

<template>
  <a-time-picker change-on-scroll :need-confirm="false" />
</template>
