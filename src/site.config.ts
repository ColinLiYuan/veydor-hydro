/**
 * 站点集中配置 —— 品牌、联系方式、信任数字、认证等。
 * 后续替换真实信息只需改这一个文件。
 */
export const site = {
  name: "VEYDOR Hydraulics",
  legalName: "Veydor Hydraulics Co., Ltd.",
  slogan: "Precision Hydraulics. Built to Last.",
  description:
    "VEYDOR Hydraulics is a manufacturer and exporter of reliable hydraulic valves, pumps, motors and components. Every unit is 100% pressure-tested before shipment, backed by ISO 9001 quality management.",
  url: "https://veydor-hydro.vercel.app", // TODO: replace with production domain
  email: "colinliyuan@gmail.com",
  phone: "+86 13824423871",
  whatsapp: "8613824423871", // digits only, for wa.me links
  address:
    "No. 88 Industrial Avenue, Foshan, Guangdong, China (placeholder address)",
  foundedYear: 2012,

  /** 首页信任数字(占位,请按实际情况修改) */
  stats: [
    { value: 12, suffix: "+", label: "Years in Hydraulics" },
    { value: 40, suffix: "+", label: "Product Series" },
    { value: 30, suffix: "+", label: "Countries Served" },
    { value: 100, suffix: "%", label: "Pressure-Tested Units" },
  ],

  /** 认证与信任徽标 */
  certifications: [
    "ISO 9001:2015 Quality System",
    "100% Factory Testing",
    "Material Test Reports",
    "OEM / ODM Support",
    "12-Month Warranty",
  ],

  /** 质量控制流程(首页 + Quality 页) */
  qcSteps: [
    {
      title: "Raw Material Inspection",
      text: "Incoming steel and components are verified against material certificates before entering production.",
    },
    {
      title: "Precision Machining",
      text: "CNC machining centers hold tolerances to microns; critical bores are honed for leak-free sealing.",
    },
    {
      title: "100% Function Testing",
      text: "Every single valve is pressure- and function-tested on calibrated test benches — no batch sampling.",
    },
    {
      title: "Packing & Delivery",
      text: "Anti-rust treatment, export-grade packing and full documentation accompany every shipment.",
    },
  ],

  /** 应用场景 */
  applications: [
    { title: "Construction Machinery", text: "Excavators, loaders, cranes" },
    { title: "Machine Tools", text: "Presses, fixtures, automation" },
    { title: "Agricultural Equipment", text: "Tractors, harvesters" },
    { title: "Mining & Quarry", text: "Drills, crushers, haulers" },
    { title: "Marine & Offshore", text: "Winches, hatch covers" },
    { title: "General Industry", text: "Power units, test rigs" },
  ],
} as const;

/**
 * 分类展示名与描述(按末级段匹配,如 solenoid / modular / relief)。
 * 未列出的分类用 prettifyCategory 兜底生成。
 */
export const categoryMeta: Record<string, { label: string; description: string }> =
  {
    valve: {
      label: "Hydraulic Valve",
      description: "Directional, pressure and flow control valves.",
    },
    solenoid: {
      label: "Solenoid Valve",
      description: "Wet-armature solenoid operated directional valves, DSG & 4WE series.",
    },
    modular: {
      label: "Modular Valve",
      description: "Stackable modular relief, throttle and check valves.",
    },
    relief: {
      label: "Relief Valve",
      description: "Pressure relief and safety valves.",
    },
    manual: {
      label: "Manual Valve",
      description: "Hand-operated directional control valves.",
    },
    pump: {
      label: "Hydraulic Pump",
      description: "Piston, vane and gear pumps for industrial and mobile hydraulic systems.",
    },
    piston: {
      label: "Piston Pump",
      description: "High-pressure axial piston pumps.",
    },
    vane: {
      label: "Vane Pump",
      description: "Vane pumps for medium-pressure hydraulic systems.",
    },
    gear: {
      label: "Gear Pump",
      description: "External gear pumps for mobile and industrial hydraulics.",
    },
    motor: {
      label: "Hydraulic Motor",
      description: "Hydraulic motors for rotary drive applications.",
    },
    yuken: {
      label: "YUKEN",
      description: "DSG interchange solenoid directional valves.",
    },
  };

/** 分类段美化兜底: "directional" -> "Directional" */
export function prettifyCategory(leaf: string): string {
  return leaf
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function categoryLabel(leaf: string): string {
  return categoryMeta[leaf]?.label ?? prettifyCategory(leaf);
}

export function categoryDescription(leaf: string): string {
  return categoryMeta[leaf]?.description ?? "Hydraulic components.";
}

/** WhatsApp 预填消息 */
export function whatsappLink(message?: string): string {
  return `https://wa.me/${site.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
}
