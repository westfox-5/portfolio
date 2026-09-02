"use client";

import { Radar } from "lucide-react";
import { motion } from "framer-motion";

const radarData = [
  { label: "Backend & Java", value: 95 },
  { label: "Leadership", value: 88 },
  { label: "DevOps", value: 85 },
  { label: "Data", value: 80 },
  { label: "Frontend", value: 65 },
];

const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = 95;
const LABEL_RADIUS = RADIUS * 1.25;
const RINGS = [0.25, 0.5, 0.75, 1];
const N = radarData.length;

const angleFor = (i: number) => (-90 + (360 / N) * i) * (Math.PI / 180);

const pointAt = (i: number, fraction: number) => {
  const angle = angleFor(i);
  return {
    x: CENTER + RADIUS * fraction * Math.cos(angle),
    y: CENTER + RADIUS * fraction * Math.sin(angle),
  };
};

const polygonPoints = (fractionForIndex: (i: number) => number) =>
  radarData
    .map((_, i) => {
      const { x, y } = pointAt(i, fractionForIndex(i));
      return `${x},${y}`;
    })
    .join(" ");

const SkillRadar = () => {
  const dataPoints = polygonPoints((i) => radarData[i].value / 100);

  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-2">
        <span className="icon-tile w-10 h-10">
          <Radar className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Skill radar</h3>
          <p className="text-xs text-muted">Self-assessed proficiency</p>
        </div>
      </div>

      <div className="mt-2 flex-1 flex items-center justify-center">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[440px]" role="img" aria-label="Skill proficiency radar chart">
          {RINGS.map((r) => (
            <polygon
              key={r}
              points={polygonPoints(() => r)}
              fill="none"
              stroke="var(--border)"
              strokeWidth={1}
            />
          ))}

          {radarData.map((_, i) => {
            const outer = pointAt(i, 1);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--border)"
                strokeWidth={1}
              />
            );
          })}

          <motion.g
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <polygon
              points={dataPoints}
              fill="rgb(var(--primary-rgb) / 0.22)"
              stroke="var(--primary)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {radarData.map((d, i) => {
              const { x, y } = pointAt(i, d.value / 100);
              return <circle key={d.label} cx={x} cy={y} r={3.5} fill="var(--primary)" />;
            })}
          </motion.g>

          {radarData.map((d, i) => {
            const angle = angleFor(i);
            const cos = Math.cos(angle);
            const x = CENTER + LABEL_RADIUS * cos;
            const y = CENTER + LABEL_RADIUS * Math.sin(angle);
            const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
            return (
              <text
                key={d.label}
                x={x}
                y={y}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--muted)"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default SkillRadar;
