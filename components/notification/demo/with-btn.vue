<docs>
---
order: 4
title:
  zh-CN: 自定义操作区
  en-US: Custom actions
---

## zh-CN

通过 `actions`（`btn` 别名）自定义操作区。

## en-US

Customize the action area with `actions` (alias of `btn`).

</docs>

<template>
  <a-button type="primary" @click="openNotification">Open the notification box</a-button>
</template>

<script lang="ts" setup>
import { notification, Button } from 'ant-design-vue';
import { h } from 'vue';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};
const openNotification = () => {
  const key = `open${Date.now()}`;
  notification.open({
    message: 'Notification Title',
    description:
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    actions: () =>
      h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => notification.close(key),
        },
        { default: () => 'Confirm' },
      ),
    key,
    onClose: close,
  });
};
</script>
