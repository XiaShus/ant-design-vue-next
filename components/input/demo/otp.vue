<docs>
---
order: 20
title:
  zh-CN: 一次性密码框
  en-US: OTP
---

## zh-CN

一次性密码输入框，自 `ant-design-vue-next@4.5.0` 起可用。

## en-US

One-time password input. Available since `ant-design-vue-next@4.5.0`.
</docs>

<template>
  <a-space direction="vertical">
    <div>
      <div style="margin-bottom: 8px">Formatter (upcase)</div>
      <a-input-otp :formatter="upcase" @change="onChange" />
    </div>
    <div>
      <div style="margin-bottom: 8px">Disabled</div>
      <a-input-otp disabled />
    </div>
    <div>
      <div style="margin-bottom: 8px">Length 8</div>
      <a-input-otp :length="8" @change="onChange" />
    </div>
    <div>
      <div style="margin-bottom: 8px">Mask</div>
      <a-input-otp mask="*" @change="onChange" />
    </div>
    <div>
      <div style="margin-bottom: 8px">Separator</div>
      <a-input-otp separator="-" @change="onChange" />
    </div>
  </a-space>
</template>
<script lang="ts" setup>
const upcase = (str: string) => str.toUpperCase();
const onChange = (text: string) => {
  // eslint-disable-next-line no-console
  console.log('onChange:', text);
};
</script>
