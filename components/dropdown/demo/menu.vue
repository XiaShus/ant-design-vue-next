<docs>
---
order: 0.5
title:
  zh-CN: 菜单配置
  en-US: Menu config
---

## zh-CN

通过 `menu` 传入菜单项配置（推荐写法）。

## en-US

Pass menu items via the `menu` prop (recommended).

</docs>

<template>
  <a-dropdown :menu="{ items, onClick }">
    <a class="ant-dropdown-link" @click.prevent>
      Hover me
      <DownOutlined />
    </a>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';

const items: MenuProps['items'] = [
  { key: '1', label: '1st menu item' },
  { key: '2', label: '2nd menu item' },
  { key: '3', label: '3rd menu item' },
];

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};
</script>
