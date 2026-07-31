<docs>
---
order: 25
title:
  zh-CN: 自定义必选标记
  en-US: Custom required mark
---

## zh-CN

`requiredMark` 支持渲染函数自定义必选/可选标记；Form.Item 的 `tooltip` 支持对象配置 `title` / `icon`（antd ≥ 5.9 / 4.7）。

## en-US

`requiredMark` accepts a render function for custom required/optional marks; Form.Item `tooltip` supports object form with `title` / `icon` (antd ≥ 5.9 / 4.7).
</docs>

<template>
  <a-form
    :model="formState"
    name="required-mark"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 14 }"
    :required-mark="customizeRequiredMark"
  >
    <a-form-item
      name="username"
      label="Username"
      :rules="[{ required: true, message: 'Please input username' }]"
      :tooltip="{ title: 'Tooltip with custom icon', icon: h(InfoCircleOutlined) }"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item name="nickname" label="Nickname">
      <a-input v-model:value="formState.nickname" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { h, reactive, type VNodeChild } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

const formState = reactive({
  username: '',
  nickname: '',
});

const customizeRequiredMark = (label: VNodeChild, { required }: { required: boolean }) =>
  h('span', [
    required ? h('span', { style: { color: '#ff4d4f', marginRight: '4px' } }, '*') : null,
    label,
    required ? null : h('span', { style: { color: '#8c8c8c', marginLeft: '4px' } }, '(optional)'),
  ]);
</script>
