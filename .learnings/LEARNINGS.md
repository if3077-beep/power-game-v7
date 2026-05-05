# 学习记录

## 静态页面部署
- **gh CLI 优先**：Windows 上 gh 可能已装但不在 PATH，路径 `C:/Program Files/GitHub CLI/gh.exe`。先 `gh auth status` 确认登录再部署
- **仓库名用 ASCII**：gh CLI 创建 repo 时中文名会被转义成乱码（如 `-`），用英文命名
- **GitHub Pages 启用**：`gh api repos/{owner}/{repo}/pages -X POST -F "source[branch]=main"` 即可，构建通常 10-20 秒
- **localtunnel 在中国不可用**，且有过路页（需输 IP 验证），不适合分享给中国用户
- **surge.sh 需要交互式注册**，无法在非交互 shell 中自动完成

## API 选型
- **PoetryDB 无中文内容**：只有英文诗，面向中文用户必须硬编码或用中文 API
- **Art Institute of Chicago API**：免认证、13 万件藏品、IIIF 图片、CORS 支持——做文化类项目的首选画作源
- **中文诗词 API 缺位**：没有靠谱的免费中文古诗词 API，硬编码 50+ 首经典作品更可靠、加载更快

## Python 工具部署
- **git clone 被墙**时，用 GitHub API 逐文件下载源码（`https://api.github.com/repos/{owner}/{repo}/contents/{path}`）
- **pip 依赖冲突不一定是 blocker**：TrendRadar 和 browser-use 的 mcp/requests/websockets 版本冲突不影响各自运行
- **轻量启动绕过脚手架**：不需要 setup 脚本、venv、uv——直接 `python -m mcp_server.server --transport http` 即可

## CSS 技巧
- **水墨晕染效果**：`mask-image: radial-gradient(ellipse 78% 73% at 50% 50%, rgba(0,0,0,0.95) 28%, ... rgba(0,0,0,0) 100%)` 模拟画作边缘羽化
- **宣纸纹理**：SVG feTurbulence + 多层径向渐变叠加，配合低透明度
- **思源宋体 + 站酷小薇**：中文排版用 Noto Serif SC（正文）+ ZCOOL XiaoWei（标题）+ Ma Shan Zheng（书法字）
