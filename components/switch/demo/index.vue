<template>
  <demo-sort>
    <basic />
    <value />
    <disabled />
    <text-and-icon />
    <size />
    <loading />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './basic.vue';
import Value from './value.vue';
import Disabled from './disabled.vue';
import Text from './text.vue';
import Size from './size.vue';
import Loading from './loading.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Value,
    Disabled,
    TextAndIcon: Text, // text 无法识别
    Size,
    Loading,
  },
});
</script>
