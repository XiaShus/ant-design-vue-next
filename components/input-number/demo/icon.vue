<docs>
---
order: 99
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

使用 `upIcon` / `downIcon` 插槽，或 `controls` 对象自定义增减图标。

## en-US

Customize step icons via `upIcon` / `downIcon` slots or `controls` object.

</docs>

<template>
  <a-space>
    <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10">
      <template #upIcon>
        <ArrowUpOutlined />
      </template>
      <template #downIcon>
        <ArrowDownOutlined />
      </template>
    </a-input-number>
    <a-input-number
      v-model:value="value2"
      :min="1"
      :max="10"
      :controls="{ upIcon: upIcon, downIcon: downIcon }"
    />
  </a-space>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
const value = ref<number>(3);
const value2 = ref<number>(5);
const upIcon = h(ArrowUpOutlined);
const downIcon = h(ArrowDownOutlined);
</script>
