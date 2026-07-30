<docs>
---
order: 5
title:
  zh-CN: 最大显示数
  en-US: Max count
---

## zh-CN

通过 `max` 配置最大显示个数、多余头像样式与 Popover。旧的 `maxCount` / `maxStyle` 等仍可用。

## en-US

Use `max` to configure max display count, excess avatar style, and Popover. Legacy `maxCount` / `maxStyle` remain supported.
</docs>

<template>
  <a-avatar-group
    :max="{
      count: 2,
      style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      popover: { trigger: 'click' },
    }"
  >
    <a-avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
    <a-avatar style="background-color: #1890ff">K</a-avatar>
    <a-avatar style="background-color: #87d068">
      <template #icon><UserOutlined /></template>
    </a-avatar>
    <a-avatar style="background-color: #1890ff">
      <template #icon><AntDesignOutlined /></template>
    </a-avatar>
  </a-avatar-group>
</template>

<script lang="ts" setup>
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons-vue';
</script>
