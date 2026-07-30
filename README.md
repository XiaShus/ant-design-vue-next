<p align="center">
  <a href="https://github.com/XiaShus/ant-design-vue-next">
    <img width="200" src="https://aliyuncdn.antdv.com/logo.png">
  </a>
</p>

<h1 align="center">Ant Design Vue Next</h1>

<div align="center">

**Community continuation** of [ant-design-vue](https://github.com/vueComponent/ant-design-vue), aligning follow-up features with [ant-design](https://github.com/ant-design/ant-design).

[![npm package](https://img.shields.io/npm/v/ant-design-vue-next.svg?style=flat-square)](https://www.npmjs.com/package/ant-design-vue-next) [![npm downloads](https://img.shields.io/npm/dm/ant-design-vue-next.svg?style=flat-square)](https://www.npmjs.com/package/ant-design-vue-next) [![License](https://img.shields.io/npm/l/ant-design-vue-next.svg?style=flat-square)](./LICENSE)

</div>

English | [简体中文](./README-zh_CN.md)

> This is **not** an official successor to Ant Design Vue. It is a community fork that keeps shipping from the `ant-design-vue@4.2.6` baseline.

**Repository:** https://github.com/XiaShus/ant-design-vue-next  
**npm:** https://www.npmjs.com/package/ant-design-vue-next

**Upstream / alignment targets:**

- Vue baseline: [vueComponent/ant-design-vue](https://github.com/vueComponent/ant-design-vue) (`4.2.6`)
- React alignment: [ant-design/ant-design](https://github.com/ant-design/ant-design) (stage A: remaining **antd 5.x** gaps → stage B: antd 6 roadmap)

## Relation to `antdv-next`

There is an independent community project:

- GitHub: https://github.com/antdv-next/antdv-next
- npm: `antdv-next`
- Docs: https://www.antdv-next.com

|  | `ant-design-vue-next` (this repo) | `antdv-next` |
| --- | --- | --- |
| Strategy | Fork / continue from `ant-design-vue@4.2.6`, maximize API compatibility for existing antdv users | Independent rewrite / next-generation stack |
| Package name | `ant-design-vue-next` | `antdv-next` |
| Relation | **Parallel community option** — we do not merge with or claim to replace `antdv-next` | Separate project |

Pick based on your needs: stay close to classic antdv APIs → this package; adopt the other stack’s direction → `antdv-next`.

## Alignment board

See [docs/component/align.md](./docs/component/align.md) for the component-by-component gap tracker (antd 5.x first, antd 6 later).

## Features

- Enterprise-class UI design system for Vue 3.
- Drop-in continuation of `ant-design-vue` 4.x APIs where possible.
- Incremental alignment with Ant Design React (antd 5.x remaining gaps first).

## Install

```bash
npm install ant-design-vue-next --save
```

```bash
yarn add ant-design-vue-next
```

```bash
pnpm add ant-design-vue-next
```

Migration tip: replace `ant-design-vue` imports with `ant-design-vue-next`. Most 4.2.x APIs remain the same; check [CHANGELOG](./CHANGELOG.zh-CN.md) and [align.md](./docs/component/align.md) for new pieces.

## Usage

```html
<script setup lang="ts">
  import { Button } from 'ant-design-vue-next';
  import 'ant-design-vue-next/dist/reset.css';
</script>

<template>
  <button type="primary">Hello</button>
</template>
```

On-demand / style import paths mirror classic antdv (`es/`, `lib/`, component `style` entries).

## Versioning

| Stage | Versions | Goal |
| --- | --- | --- |
| A (current) | `4.3.0`, `4.4.0`, … | Fill antd **5.x** APIs missing or incomplete in antdv 4.2.6 |
| B (later) | `5.0.0` / `6.0.0` planning | Align with antd 6 (larger API / css-in-js shifts) — **not** claimed in week one |

Release cadence: one high-value runtime capability → semver → docs/changelog → build → npm publish → git tag → push.

## Links

- [ant-design-vue (upstream)](https://github.com/vueComponent/ant-design-vue)
- [Ant Design (React)](https://ant.design/)
- [antdv-next (parallel community)](https://github.com/antdv-next/antdv-next)
- [Vue](https://vuejs.org/)

## License

[MIT](./LICENSE)
