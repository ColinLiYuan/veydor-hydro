/**
 * 产品图占位 —— 电磁换向阀线性工程图风格 SVG。
 * 后端图片字段暂为空时使用,保证页面不破版。
 */
export function PlaceholderImage({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-mist ${className}`}
      role="img"
      aria-label={label ? `${label} (illustration)` : "Product illustration"}
    >
      <svg
        viewBox="0 0 480 360"
        className="h-full w-full max-w-sm p-6"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0L8 4L0 8z" fill="#174B7E" />
          </marker>
        </defs>

        {/* 中心虚线(机械图纸风格) */}
        <line
          x1="30"
          y1="190"
          x2="450"
          y2="190"
          stroke="#8A9AA8"
          strokeWidth="1"
          strokeDasharray="6 6"
        />

        {/* 两个电磁线圈 */}
        <rect x="130" y="60" width="90" height="62" rx="8" fill="#EEF4FA" stroke="#174B7E" strokeWidth="2" />
        <rect x="260" y="60" width="90" height="62" rx="8" fill="#EEF4FA" stroke="#174B7E" strokeWidth="2" />
        <line x1="175" y1="74" x2="175" y2="108" stroke="#1D5FA6" strokeWidth="2" />
        <line x1="305" y1="74" x2="305" y2="108" stroke="#1D5FA6" strokeWidth="2" />
        <circle cx="175" cy="116" r="4" fill="#E87400" />
        <circle cx="305" cy="116" r="4" fill="#E87400" />

        {/* 阀体 */}
        <rect x="110" y="150" width="260" height="96" rx="10" fill="#FFFFFF" stroke="#174B7E" strokeWidth="2.5" />
        {/* 阀芯弹簧腔 */}
        <rect x="132" y="170" width="58" height="56" rx="4" fill="none" stroke="#174B7E" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect x="290" y="170" width="58" height="56" rx="4" fill="none" stroke="#174B7E" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* 内部流通箭头 */}
        <line x1="150" y1="198" x2="196" y2="198" stroke="#E87400" strokeWidth="2.5" markerEnd="url(#arr)" />
        <line x1="284" y1="198" x2="330" y2="198" stroke="#E87400" strokeWidth="2.5" markerEnd="url(#arr)" />

        {/* 四个油口 */}
        {[
          { x: 160, label: "P" },
          { x: 200, label: "A" },
          { x: 280, label: "B" },
          { x: 320, label: "T" },
        ].map((port) => (
          <g key={port.label}>
            <line
              x1={port.x}
              y1="246"
              x2={port.x}
              y2="282"
              stroke="#174B7E"
              strokeWidth="2.5"
            />
            <text
              x={port.x}
              y="304"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="15"
              fontWeight="bold"
              fill="#174B7E"
            >
              {port.label}
            </text>
          </g>
        ))}

        {/* 标签 */}
        {label ? (
          <text
            x="240"
            y="342"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="13"
            letterSpacing="2"
            fill="#5A6B7B"
          >
            {label.length > 34 ? `${label.slice(0, 34)}…` : label}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
