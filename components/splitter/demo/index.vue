<template>
  <demo-sort>
    <Basic />
    <Vertical />
    <Control />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import Vertical from './vertical.vue';
import Control from './control.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';

const md = { cn: CN, us: US };
export default {
  CN,
  US,
  md,
  components: { Basic, Vertical, Control },
};
</script>
