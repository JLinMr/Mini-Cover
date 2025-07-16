<p align="center">
  <img src="public/favicon.svg" width="100" height="100" alt="Mini-Cover Logo">
</p>

<h1 align="center">Mini-Cover</h1>

<p align="center">优雅的在线封面生成工具</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js" alt="Vue">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>
<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/JLinMr/Mini-Cover">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
  <a href="https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2FJLinMr%2FMini-Cover&output-directory=dist&install-command=npm%20install&build-command=npm%20run%20build" target="_blank" rel="noopener noreferrer">
    <img src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" alt="Deploy with EdgeOne Pages">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/JLinMr/Mini-Cover">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />
  </a>
</p>
<p align="center">🎮 在线演示：
  <a href="https://cover.ruom.top" target="_blank">
  https://cover.ruom.top
  </a>
</p>

## 📖 简介

Mini-Cover 是一个现代化的封面生成工具，专为博客、短视频、社交媒体设计。支持多种自定义选项，让你轻松创建个性化封面图片。

## ✨ 特性

- 📱 响应式设计，完美支持移动端
- 🎨 丰富的图标库，一键选用
- 🖼️ 自定义背景图片，支持拖拽上传
- ✍️ 灵活的标题编辑，多种字体可选
- 💫 水印效果调整，实时预览
- 🎯 简洁的操作界面，快速上手

## ⚙️ 配置说明

### 环境配置

网站基础内容通过修改 `.env` 文件自定义网站配置：

### 默认配置

在 `src/config.js` 中可以修改默认文本和字体配置：

```javascript
export const defaultConfig = {
    // 默认文本配置
    text: '默认标题',       
    watermark: '@水印文本', 

    // 字体配置
    fontFamily: import.meta.env.VITE_APP_FONT_FAMILY,
    
    // 可用字体样式列表
    fontStyles: [
        'https://font-cdn.com/font1.css',
        'https://font-cdn.com/font2.css',
        // ...
    ],
    
    // 字体选项
    fontOptions: [
        { value: 'default', label: '默认全局' },
        { value: 'Microsoft YaHei', label: '微软雅黑' },
        // ...
    ]
};
```

## 🚀 快速开始

### 环境准备

- Node.js >= 16.16.0
- NPM >= 8.15.0

### 开发调试

```bash
# 克隆项目
git clone https://github.com/JLinMr/Mini-Cover.git

# 安装依赖
npm install

# 启动服务
npm run dev

# 构建生产版本
npm run build
```

构建产物在 `dist` 目录下，可以直接部署到任何静态资源服务器上。

## CDN赞助

本项目的 CDN 加速和安全保护由腾讯 EdgeOne 赞助
<a href="https://edgeone.ai/?from=github" target="_blank">
    最佳亚洲 CDN、Edge 和安全解决方案 - 腾讯 EdgeOne
<img src="https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png" width="500" height="100">
</a>

## 📝 开源协议

[MIT License](LICENSE)
