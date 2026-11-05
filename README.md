# Prompt Canvas - AI绘画提示词助手

智能分析并补全AI绘画提示词，可视化选择维度，一键生成参考图。

## 功能特性

- **智能分析**：输入粗略描述，自动识别缺失维度（景别、风格、光影、色彩、构图、服饰）
- **可视化选择**：48个预置选项，每个维度8个精选标签，带预览图
- **实时预览**：选择维度后即时生成参考图
- **多格式导出**：支持 Midjourney / Stable Diffusion / Flux 三种格式
- **双语支持**：前端中文交互，输出英文提示词

## 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **LLM**：Google Gemini Flash (可选)
- **生图**：Fal.ai Flux-schnell (可选)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，填入 API Keys：

```bash
# Google Gemini API Key (可选，不配置则使用本地降级分析)
GEMINI_API_KEY=your_gemini_api_key_here

# Fal.ai API Key (可选，不配置则返回占位图片)
FAL_KEY=your_fal_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 预置图片

构建时会自动生成 48 张 SVG 占位图到 `public/presets/` 目录，确保生产环境无 404。

如需替换为真实 AI 生成图：
- 尺寸：256×256 像素
- 格式：WebP
- 单张体积：< 50KB

运行 `npm run presets` 可重新生成占位图。

## 项目结构

```
prompt-canvas/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # LLM 分析 API
│   │   └── generate/route.ts     # 生图 API
│   ├── globals.css               # 全局样式 (深色主题)
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主界面 (状态管理 + 交互逻辑)
├── components/
│   ├── DimensionPanel.tsx        # 维度选择面板 (分类 Tabs + 选项网格)
│   └── CanvasPreview.tsx         # 预览画布 (参考图 + 提示词输出)
├── config/
│   └── presets.ts                # 48个预置选项数据
├── lib/
│   ├── prompt-adapter.ts         # 提示词转换器 (SD/MJ/Flux 格式)
│   └── api-clients.ts            # API 客户端封装
├── types/
│   └── prompt.ts                 # TypeScript 类型定义
├── public/
│   └── presets/                  # 预置图片目录 (48张 WebP)
├── .env.local                    # 环境变量
└── package.json
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub：
```bash
git add .
git commit -m "feat: complete core flow, presets and prompt studio"
git push origin main
```

2. 在 Vercel 导入项目（https://vercel.com/new）

3. 在 Settings → Environment Variables 添加：
   - `GEMINI_API_KEY` - Google Gemini API Key
   - `FAL_KEY` - Fal.ai API Key

4. 点击 Deploy

已配置 `vercel.json` 设置 API 超时（生图 60s，分析 30s），避免 Vercel 免费版 10s 超时限制。

### 静态图片托管（可选）

将 `public/presets/` 目录上传到 Cloudflare R2 或阿里云 OSS，更新 `config/presets.ts` 中的 `previewImage` 路径为 CDN 地址。

## API 测试

```bash
# 测试分析 API
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"input": "一只在雨夜街道奔跑的机械柴犬"}'

# 测试生图 API
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a cyberpunk girl standing under neon lights, close-up portrait"}'
```

## 许可证

MIT
