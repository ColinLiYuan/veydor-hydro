import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { prettifyCategory } from "@/site.config";
import type { Paged, Product } from "./types";
import { API_BASE, SITE_ID } from "./client-api";

export { API_BASE, SITE_ID };

/**
 * API 客户端 —— 通用批发后端(仅服务端,客户端提交见 client-api.ts)
 * 站点隔离:所有请求带 X-Site-Id 请求头。
 * 部署在 Vercel:数据请求用 Next 16 Cache Components 缓存
 * ('use cache' + cacheLife('days') + cacheTag),24 小时有效、
 * 避免频繁重建消耗 CPU;后台改数据后用 /api/revalidate 手动刷新,
 * 询盘提交由浏览器直连后端,不经过 Vercel。
 */

async function apiFetch<T>(path: string): Promise<T> {
  "use cache";
  cacheLife("days");
  cacheTag("site-data");
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "X-Site-Id": SITE_ID, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API responded with ${res.status} for ${path}`);
  }
  const body = (await res.json()) as { code: number; message: string; data: T };
  if (body.code !== 200) {
    throw new Error(body.message || `API error for ${path}`);
  }
  return body.data;
}

/** 产品列表。page 为 0 基。sortBy/direction 透传后端。 */
export async function getProducts(
  page = 0,
  size = 12,
  sortBy?: string,
  direction?: "asc" | "desc",
): Promise<Paged<Product>> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("direction", direction ?? "asc");
  }
  return apiFetch<Paged<Product>>(`/api/v1/products?${params.toString()}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(
      `/api/v1/products/${encodeURIComponent(slug)}`,
    );
  } catch {
    return null;
  }
}

/**
 * 分类段归一化:去尾部复数 s、小写。用于把产品 categories 字段(单数旧数据)
 * 与分类树 slug(复数新数据)对齐 —— 后台把树改名为复数后,产品数据仍是
 * 单数("valve/solenoid" vs "valves/solenoid"),必须容错匹配。
 */
export function normalizeSegment(seg: string): string {
  const s = seg.toLowerCase();
  return s.length > 3 && s.endsWith("s") ? s.slice(0, -1) : s;
}

function normalizePath(path: string | string[]): string[] {
  const segs = Array.isArray(path) ? path : path.split("/");
  return segs.filter(Boolean).map(normalizeSegment);
}

/**
 * 分类产品列表:后端 /products/category/{段} 的匹配规则不可靠
 * (同样的分类数据 01 型能查到、03 型查不到,且只认旧单数 slug),
 * 改为从全量产品(24h 缓存)本地过滤 + 容错匹配,语义由前端完全掌控:
 * - 父级路径 ["valves"] 命中所有 valve* 产品(含子分类)
 * - 完整路径 ["valves","solenoid"] 只命中该子分类
 * 产品数据量小(几十个),本地过滤代价可忽略;数据缓存同 24h。
 */
export async function getProductsByCategory(
  path: string[],
  page = 0,
  size = 12,
): Promise<Paged<Product>> {
  const all = await getAllProducts();
  const target = normalizePath(path);
  const filtered = all.filter((p) =>
    parseCategories(p.categories).some((cat) => {
      const segs = normalizePath(cat);
      if (segs.length < target.length) return false;
      return target.every((t, i) => segs[i] === t);
    }),
  );
  const totalElements = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  return {
    content: filtered.slice(page * size, (page + 1) * size),
    totalElements,
    totalPages,
    last: (page + 1) * size >= totalElements,
    first: page === 0,
    number: page,
    size,
  };
}

/**
 * 拉取全量产品(用于分类聚合)。先取 1 条拿到总数,再一次性取全量。
 * 用 React cache() 去重:同一次渲染里多处调用只请求一次。
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  const first = await getProducts(0, 1);
  if (first.totalElements <= 1) return first.content;
  const all = await getProducts(0, first.totalElements);
  return all.content;
});

/** 解析 categories 字段(后端存的是 JSON 字符串数组) */
export function parseCategories(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

/** "valve/solenoid" -> "solenoid"(后端分类查询只认末级段) */
export function categoryLeaf(category: string): string {
  const parts = category.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? category;
}

/** 后端分类树接口 /api/v1/categories/tree 返回的原始节点 */
interface RawCategoryNode {
  /** 中文名 */
  name: string;
  /** 英文名(网站展示用) */
  nameEn: string;
  /** 完整 slug,如 "valve" 或 "valve/solenoid" */
  slug: string;
  priority: number;
  children: RawCategoryNode[];
}

export interface CategoryNode {
  /** 该节点的分类段,如 "solenoid" */
  segment: string;
  /** 从根到该节点的完整路径,如 ["valve","solenoid"] */
  path: string[];
  /** 展示名(后端 nameEn,缺省时按段生成) */
  label: string;
  /** 该节点(含子分类)下的产品数,0 表示空分类 */
  count: number;
  children: CategoryNode[];
}

/**
 * 两级分类树 —— 以后端 /api/v1/categories/tree 为准(空分类也展示),
 * 各节点产品数从产品 categories 字段聚合(同一产品每个节点只计一次)。
 */
export const getCategoryTree = cache(async (): Promise<CategoryNode[]> => {
  const [rawTree, products] = await Promise.all([
    apiFetch<RawCategoryNode[]>("/api/v1/categories/tree"),
    getAllProducts(),
  ]);

  // 节点路径(归一化)-> 该节点下的产品 id 集合
  const counts = new Map<string, Set<number>>();
  for (const p of products) {
    for (const raw of parseCategories(p.categories)) {
      const segments = normalizePath(raw);
      for (let i = 0; i < segments.length; i++) {
        const nodePath = segments.slice(0, i + 1).join("/");
        const set = counts.get(nodePath) ?? new Set<number>();
        set.add(p.id);
        counts.set(nodePath, set);
      }
    }
  }

  const convert = (nodes: RawCategoryNode[]): CategoryNode[] =>
    nodes
      .slice()
      .sort((a, b) => a.priority - b.priority)
      .map((n) => {
        const path = n.slug.split("/").filter(Boolean);
        const segment = path[path.length - 1] ?? n.slug;
        return {
          segment,
          path,
          label: n.nameEn?.trim() || prettifyCategory(segment),
          count: counts.get(normalizePath(n.slug).join("/"))?.size ?? 0,
          children: convert(n.children ?? []),
        };
      });

  return convert(rawTree);
});

/** 在分类树中按完整路径查找节点,找不到返回 null */
export function findCategoryNode(
  tree: CategoryNode[],
  path: string[],
): CategoryNode | null {
  let nodes = tree;
  let found: CategoryNode | null = null;
  for (const seg of path) {
    found = nodes.find((n) => n.segment === seg) ?? null;
    if (!found) return null;
    nodes = found.children;
  }
  return found;
}

/** 展开分类树的末级叶子(首页分类卡片用) */
export function categoryLeaves(tree: CategoryNode[]): CategoryNode[] {
  return tree.flatMap((n) => (n.children.length > 0 ? n.children : [n]));
}

/**
 * 把产品的 categories 字段(后台旧单数数据,如 "valve/solenoid")
 * 解析成分类树里的真实路径(新复数 slug,如 ["valves","solenoid"])。
 * 按归一化段容错匹配,取最深的匹配节点;无匹配返回 null。
 */
export function resolveTreePath(
  tree: CategoryNode[],
  category: string,
): string[] | null {
  const target = normalizePath(category);
  let best: string[] | null = null;
  const walk = (nodes: CategoryNode[]) => {
    for (const n of nodes) {
      const np = normalizePath(n.path);
      if (
        np.length <= target.length &&
        np.every((seg, i) => seg === target[i])
      ) {
        if (!best || np.length > best.length) best = n.path;
      }
      walk(n.children);
    }
  };
  walk(tree);
  return best;
}

/** 后端图片字段可能是相对路径,补全为绝对地址 */
export function imageUrl(src: string | null | undefined): string | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;
  return `${API_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
}
