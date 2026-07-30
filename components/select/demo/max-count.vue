<docs>
---
order: 6
title:
  zh-CN: 最多选择
  en-US: Max Count
---

## zh-CN

通过 `maxCount` 限制最多可选数量（仅 `multiple` / `tags`）。达到上限后，未选项会禁用。

## en-US

Limit selectable items with `maxCount` (only for `multiple` / `tags`). Unselected options become disabled when the limit is reached.

</docs>

<template>
  <a-space direction="vertical" style="width: 100%">
    <a-select
      v-model:value="multipleValue"
      mode="multiple"
      :max-count="3"
      style="width: 100%"
      placeholder="Select up to 3 items"
      :options="options"
    ></a-select>
    <a-select
      v-model:value="tagsValue"
      mode="tags"
      :max-count="3"
      style="width: 100%"
      placeholder="Tags up to 3 items"
      :options="options"
    ></a-select>
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const options = [...Array(12)].map((_, i) => ({
  value: (i + 10).toString(36) + (i + 1),
  label: (i + 10).toString(36) + (i + 1),
}));
const multipleValue = ref(['a1', 'b2']);
const tagsValue = ref(['a1']);
</script>
