/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片全部用原生 <img>,不用 Vercel 图片优化(避免额外计费)
  images: { unoptimized: true },
  poweredByHeader: false,
  // Next 16 Cache Components:数据缓存改用 'use cache' + cacheLife/cacheTag
  // (见 src/lib/api.ts),替代旧的路由级 revalidate/dynamicParams 配置
  cacheComponents: true,
  // 与 Cache Components 配套的官方推荐组合(下一个大版本默认开启)
  partialPrefetching: true,
};

export default nextConfig;
