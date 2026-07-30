<template>
  <demo-sort>
    <Basic />
    <ShowText />
    <Size />
    <Disabled />
    <AllowClear />
    <DisabledAlpha />
    <Presets />
    <PanelRender />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import ShowText from './show-text.vue';
import Size from './size.vue';
import Disabled from './disabled.vue';
import AllowClear from './allow-clear.vue';
import DisabledAlpha from './disabled-alpha.vue';
import Presets from './presets.vue';
import PanelRender from './panel-render.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';

const md = {
  cn: CN,
  us: US,
};
export default {
  CN,
  US,
  md,
  components: {
    Basic,
    ShowText,
    Size,
    Disabled,
    AllowClear,
    DisabledAlpha,
    Presets,
    PanelRender,
  },
};
</script>
