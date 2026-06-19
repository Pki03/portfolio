"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Award, Star, Zap, Medal, Trophy } from "lucide-react";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const iconMap: Record<string, IconComponent> = {
  code: Code2 as IconComponent,
  award: Award as IconComponent,
  star: Star as IconComponent,
  zap: Zap as IconComponent,
  medal: Medal as IconComponent,
  trophy: Trophy as IconComponent,
};

const achievements = [
  { label: "Problems Solved", value: "500+", icon: "code", numValue: 500 },
  { label: "Cache Hit Ratio", value: "99%", icon: "zap", numValue: 99 },
  { label: "RPS Throughput", value: "2,000+", icon: "trophy", numValue: 2000 },
  { label: "Faster Onboarding", value: "60%", icon: "medal", numValue: 60 },
  { label: "Hackathons", value: "10+", icon: "star", numValue: 10 },
  { label: "Merit Scholarship", value: "Awarded", icon: "award", numValue: 100 },
];

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
  isPlus,
}: {
  value: number;
  suffix?: string;
  isDecimal?: boolean;
  isPlus?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 30;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const display = () => {
    if (isDecimal) {
      return (count / 100).toFixed(2);
    }
    if (value >= 1000) {
      return count.toLocaleString();
    }
    return count;
  };

  return (
    <span ref={ref}>
      {display()}
      {suffix}
      {isPlus ? "+" : ""}
    </span>
  );
}

export default function Achievements() {
  return (
    <section className="py-32 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} achievements
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none mb-3">
            By the Numbers
          </h2>
          <p className="text-muted text-sm">
            Production impact across distributed systems, AI, and cloud
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((item, idx) => {
            const Icon = iconMap[item.icon] || Award;
            const isDecimal = false;
            const isPlus = item.value.includes("+");

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group p-6 rounded-xl border border-border bg-card text-center hover:bg-card-hover transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors group-hover:scale-110 group-hover:-translate-y-0.5 transition-all">
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="text-2xl font-bold tracking-tight mb-1 tabular-nums">
                  {item.label === "Merit Scholarship" ? (
                    item.value
                  ) : (
                    <>
                      <AnimatedCounter
                        value={item.numValue}
                        suffix={item.value.includes("%") ? "%" : ""}
                        isDecimal={isDecimal}
                        isPlus={isPlus}
                      />
                    </>
                  )}
                </div>
                <div className="text-xs text-muted">{item.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
