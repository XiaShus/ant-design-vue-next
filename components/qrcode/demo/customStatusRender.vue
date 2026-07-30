<docs>
---
order: 4
title:
  zh-CN: 自定义状态渲染
  en-US: custom status render
---

## zh-CN

通过 `statusRender` 自定义各状态的展示内容。

## en-US

Customize status overlay via `statusRender`.
</docs>

<template>
  <a-space>
    <a-qrcode
      value="https://www.antdv.com"
      status="expired"
      :status-render="customStatusRender"
      @refresh="() => console.log('refresh')"
    />
    <a-qrcode value="https://www.antdv.com" status="loading">
      <template #statusRender="{ status, locale }">
        <div v-if="status === 'loading'" style="text-align: center">
          <a-spin />
          <div>Loading...</div>
        </div>
      </template>
    </a-qrcode>
    <a-qrcode value="https://www.antdv.com" status="scanned" :status-render="customStatusRender" />
  </a-space>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons-vue';
import { Button, Spin } from 'ant-design-vue';
import type { StatusRenderInfo } from '..';

const customStatusRender = (info: StatusRenderInfo) => {
  switch (info.status) {
    case 'expired':
      return h('div', { style: { textAlign: 'center' } }, [
        h('div', [h(CloseCircleFilled, { style: { color: 'red' } }), ' ', info.locale?.expired]),
        h(
          Button,
          { type: 'link', onClick: info.onRefresh },
          {
            default: () => [h(ReloadOutlined), ' ', info.locale?.refresh],
          },
        ),
      ]);
    case 'loading':
      return h('div', { style: { textAlign: 'center' } }, [h(Spin), h('div', 'Loading...')]);
    case 'scanned':
      return h('div', { style: { textAlign: 'center' } }, [
        h(CheckCircleFilled, { style: { color: 'green' } }),
        ' ',
        info.locale?.scanned,
      ]);
    default:
      return null;
  }
};
</script>
