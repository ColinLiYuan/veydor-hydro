/** 后端 API 返回的数据结构(veydor-hydro 站点) */

export interface ProductSku {
  id: number;
  siteId: string;
  sku: string;
  color: string;
  image: string;
  stock: number;
  weightWithBox: number | null;
  notes: string | null;
}

export interface Product {
  createdBy: string | null;
  createdAt: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
  id: number;
  siteId: string;
  /** 中文名 */
  name: string;
  /** 英文名(前台展示用) */
  title: string;
  shortDescription: string | null;
  slug: string;
  brand: string | null;
  status: string;
  image: string | null;
  alt: string | null;
  currentPrice: number;
  minOrder: number;
  description: string | null;
  /** JSON 字符串数组,如 ["valve/solenoid"] */
  categories: string | null;
  tags: string | null;
  priority: number;
  features: string;
  supplier: string | null;
  material: string | null;
  netWeight: number | null;
  supplierSku: string | null;
  productSkus: ProductSku[];
  /** 结构暂未定,渲染层做兼容 */
  galleries: unknown[];
  specifications: unknown[];
}

export interface Paged<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  /** 0 基页码 */
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface InquiryPayload {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  companyName?: string;
  country?: string;
  message?: string;
}

export interface Inquiry {
  id: number;
  inquiryNumber: string;
  siteId: string;
  status: string;
  source: string;
  customerName: string;
  customerEmail: string;
  [key: string]: unknown;
}
