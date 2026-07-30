<docs>
---
order: 24
title:
  zh-CN: 自定义校验图标
  en-US: Custom feedback icons
---

## zh-CN

通过 Form 的 `feedbackIcons` 或 Form.Item 的 `hasFeedback.icons` 自定义校验反馈图标（antd ≥ 5.9）。

## en-US

Customize validation feedback icons via Form `feedbackIcons` or Form.Item `hasFeedback.icons` (antd ≥ 5.9).
</docs>

<template>
  <a-form
    :model="formState"
    name="custom-feedback-icons"
    style="max-width: 600px"
    :feedback-icons="formFeedbackIcons"
    @finish="onFinish"
  >
    <a-form-item
      name="email1"
      label="Test"
      :rules="[{ required: true, type: 'email' }, { min: 10 }]"
      help=""
      has-feedback
    >
      <a-input v-model:value="formState.email1" />
    </a-form-item>
    <a-form-item
      name="email2"
      label="Test"
      :rules="[{ required: true, type: 'email' }, { min: 10 }]"
      help=""
      :has-feedback="{ icons: itemFeedbackIcons }"
    >
      <a-input v-model:value="formState.email2" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { h, reactive } from 'vue';
import { AlertFilled, CloseSquareFilled } from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
import type { FeedbackIcons } from 'ant-design-vue';

const formState = reactive({
  email1: '',
  email2: '',
});

const formFeedbackIcons: FeedbackIcons = ({ errors }) => ({
  error: h(
    Tooltip,
    { title: () => errors?.map((error, i) => h('div', { key: i }, error as any)), color: 'red' },
    () => h(CloseSquareFilled),
  ),
});

const itemFeedbackIcons: FeedbackIcons = ({ errors }) => ({
  error: h(
    Tooltip,
    { title: () => errors?.map((error, i) => h('div', { key: i }, error as any)), color: 'pink' },
    () => h(AlertFilled),
  ),
  success: false,
});

const onFinish = (values: typeof formState) => {
  console.log('Success:', values);
};
</script>
