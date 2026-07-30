<docs>
---
order: 2
title:
  zh-CN: 替换历史记录
  en-US: Replace history
---

## zh-CN

设置 `replace` 后，点击锚点会使用 `history.replaceState` 替换当前历史记录，而不是新增一条（antd ≥ 5.7）。

## en-US

With `replace`, clicking an anchor uses `history.replaceState` instead of pushing a new history entry (antd ≥ 5.7).
</docs>

<template>
  <a-anchor
    :affix="false"
    replace
    :items="[
      {
        key: '1',
        href: '#components-anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#components-anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]"
  ></a-anchor>
</template>
