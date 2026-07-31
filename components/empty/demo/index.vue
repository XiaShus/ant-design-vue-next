<template>
  <demo-sort :cols="1">
    <basic />
    <simple />
    <customize />
    <config-provider />
    <description />
    <styleClass />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import Simple from './simple.vue';
import Customize from './customize.vue';
import ConfigProvider from './config-provider.vue';
import Description from './description.vue';
import StyleClass from './style-class.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Simple,
    Customize,
    ConfigProvider,
    Description,
    StyleClass,
  },
  setup() {
    return {};
  },
});
</script>
