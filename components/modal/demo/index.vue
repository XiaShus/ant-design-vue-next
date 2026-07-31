<template>
  <demo-sort>
    <basic />
    <afterOpenChangeVue />
    <async />
    <custom-footer />
    <confirm />
    <info />
    <HookModal />
    <locale />
    <manual />
    <position />
    <confirm-router />
    <confirm-promise />
    <width />
    <button-props />
    <fullscreen />
    <modalRenderVue />
    <loading />
  </demo-sort>
</template>
<script lang="ts">
import Basic from './basic.vue';
import afterOpenChangeVue from './after-open-change.vue';
import Async from './async.vue';
import Footer from './footer.vue';
import Confirm from './confirm.vue';
import Info from './info.vue';
import Locale from './locale.vue';
import Manual from './manual.vue';
import Position from './position.vue';
import ConfirmRouter from './confirm-router.vue';
import ConfirmPromise from './confirm-promise.vue';
import Width from './width.vue';
import Fullscreen from './fullscreen.vue';
import ButtonProps from './button-props.vue';
import modalRenderVue from './modal-render.vue';
import HookModal from './hook-modal.vue';
import Loading from './loading.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  US,
  components: {
    Basic,
    afterOpenChangeVue,
    Async,
    CustomFooter: Footer,
    Confirm,
    Info,
    Locale,
    Manual,
    Position,
    ConfirmRouter,
    ConfirmPromise,
    Width,
    ButtonProps,
    Fullscreen,
    modalRenderVue,
    HookModal,
    Loading,
  },
  setup() {
    return {};
  },
});
</script>
<style>
[id^='components-modal-demo'] .ant-btn {
  margin-right: 8px;
}
</style>
