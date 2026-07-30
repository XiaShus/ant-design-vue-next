<docs>
---
order: 1
title:
  zh-CN: 打开关闭后回调
  en-US: After open change
---

## zh-CN

通过 `afterOpenChange` 在打开 / 关闭动画结束后收到回调。

## en-US

Use `afterOpenChange` to run a callback after the open / close animation ends.

</docs>

<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal v-model:open="open" title="After Open Change" @after-open-change="onAfterOpenChange">
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const open = ref(false);

const showModal = () => {
  open.value = true;
};

const onAfterOpenChange = (nextOpen: boolean) => {
  console.log('afterOpenChange', nextOpen);
};
</script>
