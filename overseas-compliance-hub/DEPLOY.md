# 🚀 海外合规情报站 - 部署指南

> 不需要给我任何账号授权，你自己 3 分钟就能搞定。

---

## 方案一：Netlify Drop（推荐，最简单）

**不需要 GitHub 账号，拖放文件夹即可上线。**

### 步骤：

1. **打开** [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. **把 `overseas-compliance-hub` 文件夹直接拖进去**
3. **等 10 秒，拿到一个链接**（如 `https://amazing-crayon-123456.netlify.app`）
4. 完成 ✅

> 不需要注册，不需要命令行，不需要 GitHub。拖进去就行。
> 如果需要自定义域名或后续更新，再用邮箱注册一个免费账号。

---

## 方案二：GitHub Pages（免费、稳定）

**需要 GitHub 账号，但长期维护更方便。**

### 步骤：

#### 第 1 步：创建 GitHub 仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 仓库名称填：`overseas-compliance-hub`
3. 选择 **Public**（免费）
4. 点击 **Create repository**

#### 第 2 步：上传文件

在仓库页面，找到 **"uploading an existing file"** 链接，或者：

```bash
# 如果你电脑装了 Git，在文件夹里执行：
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/你的用户名/overseas-compliance-hub.git
git push -u origin main
```

#### 第 3 步：开启 GitHub Pages

1. 进入仓库 → **Settings** → 左侧 **Pages**
2. **Source** 选择 **Deploy from a branch**
3. **Branch** 选择 `main` / `root`，点击 **Save**
4. 等 1-2 分钟，访问 `https://你的用户名.github.io/overseas-compliance-hub`

---

## 方案三：Vercel（国内访问最快）

1. 访问 [https://vercel.com/new](https://vercel.com/new)
2. 导入 GitHub 仓库（需要先完成方案二的第1步）
3. 自动部署，拿到 `.vercel.app` 链接
4. 可绑定自定义域名

---

## 🔧 部署前检查清单

- [x] Google Fonts 已替换为系统字体（无需翻墙加载）
- [x] `laws.html` 已补全内容
- [x] 所有页面链接已检查
- [x] 纯静态文件，无需服务器/数据库

---

## 📦 文件说明

```
overseas-compliance-hub/
├── index.html          # 首页（总览）
├── standalone.html     # 单文件版本（所有内容合一，备用）
├── css/
│   └── style.css       # 样式表
├── js/
│   └── main.js         # 交互脚本 + 数据结构
├── pages/
│   ├── vietnam.html    # 越南市场详情
│   ├── thailand.html   # 泰国市场详情
│   ├── malaysia.html   # 马来西亚市场详情
│   ├── hongkong.html   # 香港市场详情
│   ├── regions.html    # 地区市场总览
│   ├── laws.html       # 六大法律领域
│   ├── sources.html    # 核心信息源
│   └── updates.html    # 最新动态
└── data/               # 预留数据目录
```

---

## ⚡ 建议

- **快速上线**：用 **Netlify Drop**，拖进去就有链接
- **长期维护**：用 **GitHub Pages** + GitHub 仓库，后续改内容直接 push
- **国内访问速度**：Vercel 的国内 CDN 比 GitHub Pages 快，但都需要自定义域名才能完全规避 DNS 污染

有问题随时问我。❤️‍🔥