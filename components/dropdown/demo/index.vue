<template>
  <demo-sort>
    <basic />
    <context-menu />
    <dropdown-button />
    <event />
    <item />
    <MenuDemo />
    <overlay-visible />
    <placement />
    <arrow-vue />
    <arrow-center-vue></arrow-center-vue>
    <sub-menu />
    <trigger />
    <loadingVue />
    <popupRenderVue />
  </demo-sort>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import US from '../index.en-US.md';
import CN from '../index.zh-CN.md';
import Basic from './basic.vue';
import ContextMenu from './context-menu.vue';
import DropdownButton from './dropdown-button.vue';
import Event from './event.vue';
import Item from './item.vue';
import MenuDemo from './menu.vue';
import OverlayVisible from './overlay-visible.vue';
import Placement from './placement.vue';
import SubMenu from './sub-menu.vue';
import Trigger from './trigger.vue';
import loadingVue from './loading.vue';
import arrowVue from './arrow.vue';
import arrowCenterVue from './arrow-center.vue';
import popupRenderVue from './popup-render.vue';
export default defineComponent({
  CN,
  US,
  components: {
    arrowCenterVue,
    arrowVue,
    loadingVue,
    popupRenderVue,
    Basic,
    ContextMenu,
    DropdownButton,
    Event,
    Item,
    MenuDemo,
    OverlayVisible,
    Placement,
    SubMenu,
    Trigger,
  },
});
</script>
