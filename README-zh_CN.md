<p align="center">
  <a href="https://github.com/XiaShus/ant-design-vue-next">
    <img width="200" src="https://aliyuncdn.antdv.com/logo.png">
  </a>
</p>

<h1 align="center">Ant Design Vue Next</h1>

<div align="center">

[ant-design-vue](https://github.com/vueComponent/ant-design-vue) 的**社区续作（community continuation）**，后续特性按 [ant-design](https://github.com/ant-design/ant-design) 对齐。

[![npm package](https://img.shields.io/npm/v/ant-design-vue-next.svg?style=flat-square)](https://www.npmjs.com/package/ant-design-vue-next) [![npm downloads](https://img.shields.io/npm/dm/ant-design-vue-next.svg?style=flat-square)](https://www.npmjs.com/package/ant-design-vue-next) [![License](https://img.shields.io/npm/l/ant-design-vue-next.svg?style=flat-square)](./LICENSE)

</div>

[English](./README.md) | 简体中文

> **不是** Ant Design Vue 官方继任，而是从 `ant-design-vue@4.2.6` 基线继续发版的社区 fork。

**仓库：** https://github.com/XiaShus/ant-design-vue-next  
**npm：** https://www.npmjs.com/package/ant-design-vue-next

**上游 / 对齐目标：**

- Vue 基线：[vueComponent/ant-design-vue](https://github.com/vueComponent/ant-design-vue)（`4.2.6`）
- React 对齐：[ant-design/ant-design](https://github.com/ant-design/ant-design)（阶段 A：补齐 **antd 5.x** 缺口 → 阶段 B：antd 6 路线图）

## 与 `antdv-next` 的关系

已存在独立社区项目：

- GitHub：https://github.com/antdv-next/antdv-next
- npm：`antdv-next`
- 文档：https://www.antdv-next.com

|      | `ant-design-vue-next`（本仓库）                               | `antdv-next`     |
| ---- | ------------------------------------------------------------- | ---------------- |
| 策略 | 从 `ant-design-vue@4.2.6` fork / 续作，尽量兼容现有 antdv API | 独立下一世代方案 |
| 包名 | `ant-design-vue-next`                                         | `antdv-next`     |
| 关系 | **平行社区方案** — 不合并、不冒充官方或对方                   | 独立项目         |

需要贴近经典 antdv → 用本包；接受另一套方向 → 用 `antdv-next`。

## 对齐看板

见 [docs/component/align.md](./docs/component/align.md)。

## 安装

```bash
npm install ant-design-vue-next --save
```

从 `ant-design-vue` 迁移时，将包名改为 `ant-design-vue-next` 即可；多数 4.2.x API 保持不变，新增能力见 [CHANGELOG](./CHANGELOG.zh-CN.md) 与 [align.md](./docs/component/align.md)。

## 版本策略

| 阶段      | 版本                   | 目标                                             |
| --------- | ---------------------- | ------------------------------------------------ |
| A（当前） | `4.3.0`、`4.4.0`…      | 补齐 antd **5.x** 上已有、antdv 缺失或半残的 API |
| B（后期） | `5.0.0` / `6.0.0` 规划 | 对齐 antd 6（勿在首周宣称完整对齐）              |

## 许可证

[MIT](./LICENSE)
