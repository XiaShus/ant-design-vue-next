<template>
  <demo-sort>
    <basic />
    <non-modal />
    <placement />
    <Mask />
    <indicator />
    <disabledInteraction />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import NonModal from './non-modal.vue';
import Placement from './placement.vue';
import Mask from './mask.vue';
import Indicator from './indicator.vue';
import DisabledInteraction from './disabled-interaction.vue';

import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';

import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    NonModal,
    Placement,
    Mask,
    Indicator,
    DisabledInteraction,
  },
  setup() {
    return {};
  },
});
</script>
