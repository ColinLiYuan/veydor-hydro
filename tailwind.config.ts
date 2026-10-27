import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 工业深蓝(主色)
        navy: {
          50: "#EEF4FA",
          100: "#DCE8F4",
          600: "#1D5FA6",
          700: "#174B7E",
          800: "#123A5F",
          900: "#0E2A47",
          950: "#081A2E",
        },
        // 钢灰(辅助)
        steel: { DEFAULT: "#5A6B7B", light: "#8A9AA8" },
        // 液压安全橙(CTA)
        accent: { DEFAULT: "#E87400", dark: "#C86200", light: "#FFF3E6" },
        // 浅底
        mist: "#F4F7FA",
        // 正文
        ink: "#1F2937",
        // 信任绿
        trust: "#2E7D32",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
