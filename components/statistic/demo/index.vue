<template>
  <demo-sort>
    <basic />
    <unit />
    <card />
    <Loading />
    <countdown />
    <countdown-slot />
    <timer />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import Unit from './unit.vue';
import Card from './card.vue';
import Loading from './loading.vue';
import Countdown from './countdown.vue';
import CountdownSlot from './countdown-slot.vue';
import Timer from './timer.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Unit,
    Card,
    Loading,
    Countdown,
    CountdownSlot,
    Timer,
  },
  setup() {
    return {};
  },
});
</script>
