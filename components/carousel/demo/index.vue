<template>
  <demo-sort :cols="1">
    <Basic />
    <Position />
    <Fade />
    <Autoplay />
    <DotDuration />
    <CustomPaging />
    <CustomArrows />
  </demo-sort>
</template>

<script lang="ts">
import Basic from './basic.vue';
import Fade from './fade.vue';
import Autoplay from './autoplay.vue';
import DotDuration from './dot-duration.vue';
import Position from './position.vue';
import CustomPaging from './customPaging.vue';
import CustomArrows from './customArrows.vue';

import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Fade,
    Autoplay,
    DotDuration,
    Position,
    CustomPaging,
    CustomArrows,
  },
});
</script>
