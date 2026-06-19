"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";

// ── Data ──
const CATEGORIES = [
  { key: "languages", label: "LANGUAGES", color: "#3b82f6", items: profile.techStack.languages },
  { key: "backend", label: "BACKEND", color: "#22c55e", items: profile.techStack.backend },
  { key: "frontend", label: "FRONTEND", color: "#a855f7", items: profile.techStack.frontend },
  { key: "databases", label: "DATABASES", color: "#f59e0b", items: profile.techStack.databases },
  { key: "devops", label: "DEVOPS", color: "#06b6d4", items: profile.techStack.devops },
  { key: "ai", label: "AI & ML", color: "#ef4444", items: profile.techStack.ai },
  { key: "csFundamentals", label: "CS FUND.", color: "#ec4899", items: profile.techStack.csFundamentals },
] as const;

// ── Layout ──
const VW = 1200;
const VH = 680;
const ROOT_Y = 48;
const CAT_Y = 155;
const BASE_Y = 220;
const GAP = 38;
const MAX_N = Math.max(...CATEGORIES.map((c) => c.items.length));

function colX(i: number) {
  return 130 + i * (940 / 6);
}

function skillY(count: number, index: number) {
  const h = (count - 1) * GAP;
  const m = (MAX_N - 1) * GAP;
  return BASE_Y + (m - h) / 2 + index * GAP;
}

function L(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1 - x2) < 1
    ? `M ${x1} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`;
}

function fmt(s: string) {
  return s.length > 16 ? s.slice(0, 14) + "\u2026" : s;
}

// ── Defs (SVG filters + patterns) ──
function SvgDefs() {
  return (
    <defs>
      <filter id="glow1">
        <feGaussianBlur stdDeviation="2" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="nodeGlow">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="14" cy="14" r="0.6" fill="#fff" opacity="0.035" />
      </pattern>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

// ── PCB Grid ──
function PcbGrid() {
  return <rect width={VW} height={VH} fill="url(#grid)" rx="16" />;
}

// ── Background radial ──
function BgGlow() {
  return <ellipse cx={VW / 2} cy={VH / 2} rx={500} ry={350} fill="url(#bgGlow)" />;
}

// ── Root Chip ──
function RootNode({ collapsedCount }: { collapsedCount: number }) {
  const allOff = collapsedCount === CATEGORIES.length;
  return (
    <g>
      <ellipse cx={VW / 2} cy={ROOT_Y + 25} rx={70} ry={40} fill="#dc2626" opacity={0.06} filter="url(#glow2)" />
      <rect x={VW / 2 - 55} y={ROOT_Y} width={110} height={50} rx={8} fill="#18181b" stroke="#dc2626" strokeWidth={1.5} />
      {[-40, -20, 20, 40].map((dx, i) => (
        <line key={i} x1={VW / 2 + dx} y1={ROOT_Y + 50} x2={VW / 2 + dx} y2={ROOT_Y + 58} stroke="#dc2626" strokeWidth="1.5" />
      ))}
      {[-40, -20, 20, 40].map((dx, i) => (
        <line key={i} x1={VW / 2 + dx} y1={ROOT_Y} x2={VW / 2 + dx} y2={ROOT_Y - 8} stroke="#dc2626" strokeWidth="1.5" />
      ))}
      <text
        x={VW / 2} y={ROOT_Y + 28}
        textAnchor="middle" dominantBaseline="middle"
        fill="#fff" fontSize={allOff ? 13 : 16} fontWeight="bold"
        fontFamily="ui-monospace,monospace" letterSpacing="2"
      >
        {allOff ? "EXPAND ALL" : "SKILLS"}
      </text>
      <text
        x={VW / 2} y={ROOT_Y + 42}
        textAnchor="middle" dominantBaseline="middle"
        fill="#a1a1aa" fontSize="8" fontFamily="ui-monospace,monospace" letterSpacing="1"
      >
        {"\u26A1 "}{CATEGORIES.reduce((s, c) => s + c.items.length, 0)} TECHNOLOGIES
      </text>
      {[-1, 1].map((sx) =>
        [-1, 1].map((sy) => (
          <circle key={`${sx}${sy}`} cx={VW / 2 + sx * 55} cy={ROOT_Y + sy * 25 + 25} r="2" fill="#dc2626" opacity="0.5" />
        ))
      )}
    </g>
  );
}

// ── Circuit Traces ──
function Traces({ expanded, activeKey }: { expanded: Set<string>; activeKey: string | null }) {
  return (
    <g>
      {/* Horizontal bus */}
      <line x1={colX(0)} y1={CAT_Y - 15} x2={colX(6)} y2={CAT_Y - 15} stroke="#fff" strokeOpacity={0.05} strokeWidth="1" />
      {/* Root → bus */}
      <path d={L(VW / 2, ROOT_Y + 50, VW / 2, CAT_Y - 15)} stroke="#dc2626" strokeOpacity={0.15} strokeWidth="1.5" fill="none" />

      {CATEGORIES.map((cat, i) => {
        const on = activeKey === null || activeKey === cat.key;
        return (
          <g key={cat.key}>
            <path d={L(colX(i), CAT_Y - 15, colX(i), CAT_Y - 8)} stroke={cat.color} strokeOpacity={on ? 0.25 : 0.05} strokeWidth="1.5" fill="none" />
            <circle cx={colX(i)} cy={CAT_Y - 15} r={2.5} fill={cat.color} opacity={on ? 0.4 : 0.1} />
          </g>
        );
      })}

      {CATEGORIES.map((cat, i) => {
        if (!expanded.has(cat.key)) return null;
        const on = activeKey === null || activeKey === cat.key;
        return (
          <g key={`t-${cat.key}`}>
            <line x1={colX(i)} y1={CAT_Y + 18} x2={colX(i)} y2={skillY(cat.items.length, cat.items.length - 1) + 6} stroke={cat.color} strokeOpacity={on ? 0.12 : 0.03} strokeWidth="1" />
            {cat.items.map((_, si) => (
              <path key={si} d={L(colX(i), skillY(cat.items.length, si), colX(i) + 4, skillY(cat.items.length, si))} stroke={cat.color} strokeOpacity={on ? 0.2 : 0.04} strokeWidth="1" fill="none" />
            ))}
          </g>
        );
      })}
    </g>
  );
}

// ── Category Node ──
function CategoryNode({
  cat, i, on, collapsed, onToggle, onHover, onLeave,
}: {
  cat: (typeof CATEGORIES)[number];
  i: number;
  on: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cx = colX(i);
  const w = cat.label.length * 8.5 + 24;

  return (
    <rect
      x={cx - w / 2} y={CAT_Y - 14} width={w} height={28} rx={14}
      fill={on ? `${cat.color}20` : "#18181b"}
      stroke={on ? cat.color : "#27272a"}
      strokeWidth={on ? 1.5 : 1}
      className="cursor-pointer"
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
      onClick={onToggle}
    />
  );
}

function CategoryLabel({
  cat, i, on, collapsed,
}: {
  cat: (typeof CATEGORIES)[number];
  i: number;
  on: boolean;
  collapsed: boolean;
}) {
  const cx = colX(i);
  const w = cat.label.length * 8.5 + 24;

  return (
    <g className="pointer-events-none">
      <text
        x={cx} y={CAT_Y}
        textAnchor="middle" dominantBaseline="middle"
        fill={on ? "#fff" : "#a1a1aa"}
        fontSize="11" fontWeight="bold" fontFamily="ui-monospace,monospace" letterSpacing="1"
      >
        {cat.label}
      </text>
      <text
        x={cx + w / 2 + 10} y={CAT_Y}
        textAnchor="start" dominantBaseline="middle"
        fill="#52525a" fontSize="8" fontFamily="ui-monospace,monospace"
      >
        {cat.items.length}
      </text>
      <text
        x={cx - w / 2 - 12} y={CAT_Y}
        textAnchor="middle" dominantBaseline="middle"
        fill="#52525a" fontSize="8" fontFamily="ui-monospace,monospace"
      >
        {collapsed ? "+" : "\u2013"}
      </text>
      <line x1={cx - w / 2 + 6} y1={CAT_Y + 10} x2={cx + w / 2 - 6} y2={CAT_Y + 10} stroke={cat.color} strokeOpacity={on ? 0.5 : 0.15} strokeWidth="1" />
    </g>
  );
}

// ── Skill Node ──
function SkillNode({
  label, color, x, y, active, onHover, onLeave,
}: {
  label: string;
  color: string;
  x: number;
  y: number;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const pw = Math.max(label.length * 7.5 + 18, 34);
  return (
    <g>
      {active && (
        <rect x={x + 2 - pw / 2} y={y - 9} width={pw} height={18} rx={9} fill={color} opacity={0.08} filter="url(#nodeGlow)" />
      )}
      <circle cx={x + 2} cy={y} r={active ? 4 : 2.5} fill={active ? color : "#27272a"} />
      <circle cx={x + 2} cy={y} r={1} fill={color} opacity={active ? 0.5 : 0.1} />
      <rect
        x={x + 8} y={y - 9} width={pw - 4} height={18} rx={9}
        fill={active ? `${color}15` : "#18181b"}
        stroke={active ? `${color}40` : "#27272a"}
        strokeWidth={active ? 1 : 0.5}
        className="cursor-pointer"
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
      />
      <text
        x={x + 10 + (pw - 4) / 2} y={y}
        textAnchor="middle" dominantBaseline="middle"
        fill={active ? "#fff" : "#a1a1aa"}
        fontSize="9.5" fontWeight={active ? 600 : 400}
        fontFamily="ui-monospace,monospace"
        className="pointer-events-none"
      >
        {fmt(label)}
      </text>
    </g>
  );
}

// ── Cross-category connections ──
function CrossConnects({ activeKey }: { activeKey: string | null }) {
  const pairs: [number, number, number, number][] = [
    [colX(0), skillY(CATEGORIES[0].items.length, 0), colX(1), skillY(CATEGORIES[1].items.length, 0)],
    [colX(0), skillY(CATEGORIES[0].items.length, 2), colX(1), skillY(CATEGORIES[1].items.length, 3)],
    [colX(0), skillY(CATEGORIES[0].items.length, 2), colX(5), skillY(CATEGORIES[5].items.length, 3)],
    [colX(0), skillY(CATEGORIES[0].items.length, 1), colX(2), skillY(CATEGORIES[2].items.length, 0)],
    [colX(0), skillY(CATEGORIES[0].items.length, 6), colX(2), skillY(CATEGORIES[2].items.length, 1)],
  ];
  const dim = activeKey !== null;
  return (
    <g opacity={dim ? 0.05 : 0.04}>
      {pairs.map(([x1, y1, x2, y2], i) => {
        const mx = (x1 + x2) / 2;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} L ${mx} ${y1} Q ${mx + 2} ${(y1 + y2) / 2} ${mx} ${y2} L ${x2} ${y2}`}
            stroke="#fff" strokeWidth="0.5" fill="none" strokeDasharray="3 3"
          />
        );
      })}
    </g>
  );
}

// ── Legend ──
function Legend({ cc }: { cc: number }) {
  return (
    <g>
      <line x1={80} y1={VH - 20} x2={VW - 80} y2={VH - 20} stroke="#fff" strokeOpacity={0.03} strokeWidth="0.5" />
      <text x={100} y={VH - 6} fill="#27272a" fontSize="8" fontFamily="ui-monospace,monospace">
        CLICK CATEGORIES TO {cc > 0 ? "EXPAND" : "COLLAPSE"}
      </text>
      {CATEGORIES.map((cat, i) => (
        <g key={cat.key}>
          <circle cx={VW - 300 + i * 38} cy={VH - 24} r="3" fill={cat.color} opacity="0.4" />
          <text
            x={VW - 296 + i * 38} y={VH - 24}
            fill="#52525a" fontSize="7" fontFamily="ui-monospace,monospace"
            dominantBaseline="middle"
          >
            {cat.items.length}
          </text>
        </g>
      ))}
    </g>
  );
}

// ── Main ──
export default function SkillTree() {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(CATEGORIES.map((c) => c.key)));
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [tip, setTip] = useState<{ label: string; color: string } | null>(null);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const cc = CATEGORIES.length - expanded.size;

  const showTip = useCallback((label: string, color: string) => {
    if (tipTimer.current) clearTimeout(tipTimer.current);
    setTip({ label, color });
  }, []);

  const hideTip = useCallback(() => {
    tipTimer.current = setTimeout(() => setTip(null), 60);
  }, []);

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "650px" }}
      >
        <SvgDefs />
        <rect width={VW} height={VH} fill="#09090b" rx="16" />
        <PcbGrid />
        <BgGlow />
        <CrossConnects activeKey={activeKey} />
        <Traces expanded={expanded} activeKey={activeKey} />
        <RootNode collapsedCount={cc} />
        {/* Pointer-rect for empty regions to dismiss hover */}

        {CATEGORIES.map((cat, i) => {
          const on = activeKey === null || activeKey === cat.key;
          return (
            <g key={cat.key}>
              {/* Category nodes — rect first so tooltips layer above */}
              <CategoryNode
                cat={cat} i={i} on={on} collapsed={!expanded.has(cat.key)}
                onToggle={() => toggle(cat.key)}
                onHover={() => setActiveKey(cat.key)}
                onLeave={() => { setActiveKey(null); hideTip(); }}
              />
              <CategoryLabel cat={cat} i={i} on={on} collapsed={!expanded.has(cat.key)} />
            </g>
          );
        })}

        {CATEGORIES.map((cat, i) => {
          if (!expanded.has(cat.key)) return null;
          const on = activeKey === null || activeKey === cat.key;
          return (
            <g key={`sk-${cat.key}`}>
              {cat.items.map((skill, si) => {
                const sy = skillY(cat.items.length, si);
                return (
                  <SkillNode
                    key={skill}
                    label={skill} color={cat.color}
                    x={colX(i)} y={sy}
                    active={on}
                    onHover={() => showTip(skill, cat.color)}
                    onLeave={hideTip}
                  />
                );
              })}
            </g>
          );
        })}

        <Legend cc={cc} />
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {tip && (
          <motion.div
            key={tip.label}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tip.color }} />
              <span className="text-sm font-semibold text-white/80 font-mono">{tip.label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
