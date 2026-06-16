# 🎮 腾讯游戏测试岗 · 全栈知识中枢

> A professional, production-grade knowledge base system for Tencent Game Test Engineering interviews and actual work scenarios.

**Version**: 2.0 (2026-06-16)  
**Stack**: Vanilla HTML/CSS/JS + LocalStorage (no build step needed)  
**Inspired by**: Vercel Docs · MDN · Radix UI · Linear · Stripe API Docs

---

## ✨ 项目亮点

- 📚 **28 个核心知识点**：覆盖容灾测试、混沌工程、服务器架构、网络协议、数据库、性能测试、安全测试、CI/CD、监控告警、游戏业务、AI测试
- 🎬 **29 个视频演练**：YouTube 嵌入式技术教学
- 💻 **29 个代码示例**：可运行的 Python 测试代码
- 🧪 **14 个互动测验**：含选项、答案、解析
- 🗄️ **完整数据库**：LocalStorage 模拟后端，支持 CRUD/搜索/分类/标签
- 🎨 **多页面 SPA**：5 个独立页面，全局 ⌘K 搜索，多层跳转
- 📊 **数据可视化**：Chart.js 仪表盘，KPI 卡片，标签云
- 🌗 **暗色主题**：Vercel/Radix 风格，专业克制

---

## 🗂️ 目录结构

```
interview-hub/
├── index.html         # 首页 (Hero + 知识图谱)
├── catalog.html       # 知识图谱 (树形分类导航)
├── database.html      # 数据库管理 (CRUD + 导入导出)
├── search.html        # 全局搜索 (关键词高亮)
├── dashboard.html     # 数据仪表盘 (KPI + Chart.js)
├── css/
│   ├── main.css       # 主样式 (设计系统)
│   ├── components.css # 组件库
│   ├── catalog.css    # 树形样式
│   └── animations.css # 动画系统
└── js/
    ├── data.js        # 核心数据库 (20+ 知识条目)
    ├── main.js        # 全局交互
    └── charts.js      # 图表工具
```

---

## 🚀 快速开始

### 方式 1：直接打开
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 方式 2：本地服务器（推荐）
```bash
# Python 3
python -m http.server 8000
# 访问 http://localhost:8000

# Node.js
npx serve
```

### 方式 3：部署到 Render
1. 推送代码到 GitHub
2. 在 [Render Dashboard](https://dashboard.render.com/) 创建 Static Site
3. 连接仓库，自动部署

---

## 🎨 设计系统

### 配色（Vercel/Radix 工程师化）
```
背景色:  #000000 (纯黑) / #0a0a0a (深灰) / #111111 (卡片)
主  色:  #ffffff (纯白) / #0070f3 (Vercel蓝)
强调色:  #ff0080 (Vercel粉) / #2ecc71 (成功绿) / #f5a623 (警告橙)
文字色:  #ededed (主文) / #a1a1a1 (次要) / #666666 (弱化)
边框色:  #1f1f1f (默认) / #2f2f2f (悬停)
```

### 字体
```
标题:  Russo One / Orbitron (力量感)
正文:  Chakra Petch / Inter (专业)
代码:  JetBrains Mono (工程师感)
```

---

## 📊 数据库结构

每个知识点包含 13 个字段：
```js
{
  id: String,              // 唯一标识
  category: String,        // 主分类
  subcategory: String,     // 子分类
  title: String,           // 标题
  summary: String,         // 简介 (1-2 句)
  content: String,         // 完整内容 (Markdown)
  difficulty: 1-5,         // 难度
  importance: 1-5,         // 重要性
  tags: Array,             // 标签
  source: String,          // 数据来源
  relatedIds: Array,       // 关联知识点
  codeExample: {           // 代码示例
    language: String,
    code: String,
    description: String
  },
  videoUrl: String,        // YouTube 演练
  quiz: [                  // 互动测验
    {
      question: String,
      options: Array,
      answer: Number,
      explanation: String
    }
  ]
}
```

---

## 🔍 知识领域覆盖

| 领域 | 知识点数 | 关键内容 |
|------|----------|----------|
| 灾难恢复测试 | 6 | RTO/RPO/SLA、混沌工程、故障注入、容灾级别 |
| 服务器架构 | 3 | 三层架构、状态同步、CAP 理论 |
| Python 自动化 | 3 | 基础语法、pytest、requests 库 |
| 网络协议 | 3 | TCP 三次握手、TCP vs UDP、HTTP 状态码 |
| 数据库 | 2 | MySQL 主从复制、Redis 缓存 |
| 性能测试 | 2 | Locust 压测、性能指标 |
| 安全测试 | 2 | OWASP Top 10、游戏外挂 |
| CI/CD | 1 | Jenkins + Docker + K8s 流水线 |
| 监控告警 | 1 | Prometheus + Grafana 体系 |
| AI 测试 | 1 | LLM 测试方法 |
| 行业案例 | 5 | 真实故障复盘、支付幂等、缓存雪崩等 |
| **总计** | **28** | — |

---

## 🎯 核心特性演示

### ⌘K 全局搜索
按 `Ctrl+K` / `Cmd+K` 打开搜索面板，支持：
- 标题/内容/标签全文搜索
- 关键词高亮
- 相关度排序
- 分类过滤

### 数据库管理
- 创建/编辑/删除知识点
- 导入/导出 JSON
- 分页/筛选/排序
- 真实数据预览

### 数据仪表盘
- 7 个 KPI 卡片
- 4 类 Chart.js 图表（环形/折线/柱状/雷达）
- TOP 10 热门知识点
- 标签云
- 数据导出

---

## 🛠️ 技术栈

| 层 | 技术 | 选型理由 |
|----|------|----------|
| 标记 | HTML5 语义化 | SEO 友好 |
| 样式 | 原生 CSS3 + CSS 变量 | 零依赖，部署即用 |
| 脚本 | Vanilla JavaScript (ES6+) | 性能优异 |
| 存储 | LocalStorage | 无后端即可演示 |
| 图表 | Chart.js 4.x | 轻量级、专业 |
| 字体 | Google Fonts | 国际化 |

**未使用框架的理由**：
- ⚡ 加载速度 < 100ms
- 📦 体积 < 300KB
- 🚀 部署到任何静态服务器
- 🔍 SEO 友好
- 📱 零依赖，离线可用

---

## 📚 数据来源

- **官方文档**：OWASP、MySQL 官方、Redis 官方、Chaos Mesh 官方
- **行业案例**：腾讯云社区、字节技术博客、阿里云栖
- **面试题库**：92 道真实面试题统计（基于 CSDN/NOWCODER 公开数据）
- **实战项目**：作者西山居 1 年游戏性能测试经验

---

## 📜 License

MIT License - 自由使用、修改、分发

---

## 🙏 致谢

设计灵感来自：
- [Vercel Documentation](https://vercel.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Linear](https://linear.app/)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Tailwind CSS](https://tailwindcss.com/)
