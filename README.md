# VEYDOR Hydraulics — 外贸官网

液压产品外贸 B2B 官网(仅英文)。数据来自通用批发后端 `http://47.82.116.234:1100`,通过 `X-Site-Id: veydor-hydro` 请求头做站点隔离。

## 技术栈

- **Next.js 16(App Router + TypeScript,Turbopack)+ Tailwind CSS**
- 渲染策略:**SSG + Cache Components**(`cacheComponents: true`;数据请求用 `'use cache'` + `cacheLife('days')` + `cacheTag('site-data')`,即 24 小时缓存,见 `src/lib/api.ts`),构建时预渲染全部页面;后台改数据后用 `/api/revalidate?secret=...` 手动刷新,最大化 Vercel 缓存、最小化 CPU 计费
  - 列表页/分类页/产品页读 `searchParams`(分页)或规避 Next 16.4.x 的 revalidate 后重新生成 500 bug(PR #91316 相关),用 `instant = false` 按请求渲染 —— 数据仍 24h 缓存
  - `generateStaticParams` 返回 ≥1 项(Next 16 不允许空数组),空数据时返回占位 slug
- 图片用原生 `<img>`(不走 next/image,避免 Vercel 图片优化计费)
- 询盘表单由**浏览器直连后端** `POST /api/v1/inquiries`(CORS 已开放),不经过 Vercel
- SEO:GEO:`sitemap.xml`、`robots.txt`(显式放行 AI 爬虫)、`llms.txt`、JSON-LD(Organization / Product / BreadcrumbList / FAQPage)

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

环境变量见 `.env.example`(默认值即生产后端,无需配置)。

## 生产部署(Vercel)

1. 导入仓库到 Vercel,框架自动识别 Next.js
2. 无需任何环境变量(API 地址为默认值)
3. 构建命令 `npm run build`,输出目录 `.next`

## 待替换的占位信息

全部集中在 [`src/site.config.ts`](src/site.config.ts):

- `site.url` — 上线后改成真实域名(影响 sitemap/OG/JSON-LD)
- `site.address` — 公司地址
- `site.stats` / `site.foundedYear` — 信任数字按实际情况修改

## 后端 API 约定(重要)

| 项 | 约定 |
|---|---|
| 站点隔离 | 请求头 `X-Site-Id: veydor-hydro` |
| 分页 | **0 基**,`page=0` 是第一页(前端 URL 用 1 基,内部转换) |
| 排序 | `sortBy=title&direction=asc` 等;分类接口**不支持** sortBy |
| 分类树 | `GET /api/v1/categories/tree` — 完整两级分类(**含空分类**),节点含 `name`/`nameEn`/`slug`(`valve/solenoid` 格式)/`priority`;网站分类以此为准,各节点产品数从产品数据聚合 |
| 分类查询 | `/api/v1/products/category/{单个分类段}` — 按段**前缀匹配**:`valve` 返回全部子分类产品(父级页),`solenoid` 返回 valve/solenoid;不能传带 `/` 的完整路径(400),前端两级 URL 取末级段查询 |
| 询盘 | `POST /api/v1/inquiries`,JSON body:camelCase,必填 `customerName`/`customerEmail`,可选 `customerPhone`/`companyName`/`country`/`message` |

## 目录结构

```
src/
  site.config.ts      # 品牌/联系方式/文案 —— 改信息只动这里
  lib/api.ts          # API 封装(仅服务端:'use cache' 24h 缓存、分类树/产品计数聚合)
  lib/client-api.ts   # 客户端安全的常量与询盘提交(不得引入仅服务端 API)
  lib/types.ts        # 后端数据结构类型
  components/         # Header/Footer/ProductCard/Pagination/QuoteModal/InquiryForm…
  app/                # 页面:首页 /products /products/[slug] /quality /about /contact
                      # + sitemap.ts / robots.ts / llms.txt(GEO)
```
