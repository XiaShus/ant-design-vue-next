<template>
  <demo-sort>
    <basic />
    <half />
    <Text />
    <disabled />
    <clear />
    <character />
    <keyboard />
  </demo-sort>
</template>

<script>
import Basic from './basic.vue';
import Half from './half.vue';
import Text from './text.vue';
import Disabled from './disabled.vue';
import Clear from './clear.vue';
import Character from './character.vue';
import Keyboard from './keyboard.vue';

import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';

export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    Half,
    Text,
    Disabled,
    Clear,
    Character,
    Keyboard,
  },
});
</script>
