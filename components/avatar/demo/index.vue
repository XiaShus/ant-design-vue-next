<template>
  <demo-sort>
    <basic />
    <type />
    <dynamic />
    <badge />
    <group />
    <Max />
    <responsive />
  </demo-sort>
</template>

<script lang="ts">
import Basic from './basic.vue';
import Type from './type.vue';
import Dynamic from './dynamic.vue';
import Badge from './badge.vue';
import Group from './group.vue';
import Max from './max.vue';
import Responsive from './responsive.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Type,
    Dynamic,
    Badge,
    Group,
    Max,
    Responsive,
  },
  setup() {
    return {};
  },
});
</script>
