<docs>
---
order: 6
title:
  zh-CN: Button 配置
  en-US: Button
---

## zh-CN

通过 `ConfigProvider` 的 `button` 统一设置子树内 Button 的 `color` / `variant` / `autoInsertSpace`（对齐 antd ≥ 5.17 / 5.25）。未显式设置 `type` / `danger` / `color` / `variant` 的按钮会继承配置。

## en-US

Use ConfigProvider `button` to set default `color` / `variant` / `autoInsertSpace` for Buttons in the subtree (antd ≥ 5.17 / 5.25). Buttons without local `type` / `danger` / `color` / `variant` inherit the config.
</docs>

<template>
  <a-space direction="vertical">
    <a-config-provider :button="{ color: 'primary', variant: 'solid', autoInsertSpace: false }">
      <a-space>
        <a-button>默认主色实心</a-button>
        <a-button>汉字</a-button>
        <a-button type="dashed">显式 type 不受影响</a-button>
      </a-space>
    </a-config-provider>
    <a-config-provider :button="{ color: 'danger', variant: 'outlined' }">
      <a-button>危险描边</a-button>
    </a-config-provider>
  </a-space>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ConfigProvider from '..';
import Button from '../../button';
import Space from '../../space';

export default defineComponent({
  components: {
    AConfigProvider: ConfigProvider,
    AButton: Button,
    ASpace: Space,
  },
});
</script>
