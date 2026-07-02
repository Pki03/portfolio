"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Target, Shield } from "lucide-react";
import { profile } from "@/data/profile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";

const metricIcons = [TrendingUp, Target, Shield];

function MetricBadge({ text, idx }: { text: string; idx: number }) {
  const Icon = metricIcons[idx % 3];
  return (
    <Badge variant="outline" className="gap-1.5 text-xs font-normal bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors">
      <Icon size={12} />
      {text}
    </Badge>
  );
}

function extractMetrics(text: string): string[] {
  const metricPatterns = [
    /\d+%/, /\d+×/, /\d+,000\+/, /\d+\+ RPS/, /under \d+%/
  ];
  const metrics: string[] = [];
  for (const pattern of metricPatterns) {
    const match = text.match(pattern);
    if (match) {
      metrics.push(match[0]);
    }
  }
  return metrics;
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} experience
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-foreground mb-3">
            Where I&apos;ve Worked
          </h2>
          <p className="text-muted text-sm">
            My professional journey.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          {profile.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <Card className="bg-card text-card-foreground border-border hover:border-accent/20 transition-colors duration-300 shadow-sm hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl font-bold tracking-tight">
                          {exp.company}
                        </CardTitle>
                        <a
                          href={exp.url}
                          target="_blank"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <p className="text-base font-medium text-muted-foreground">
                        {exp.role}
                      </p>
                    </div>
                    <Badge variant="secondary" className="w-fit font-mono text-xs font-normal">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {exp.highlights.map((h, i) => {
                      const metrics = extractMetrics(h);
                      return (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed pl-4 border-l border-border hover:border-accent transition-colors"
                        >
                          <span>{h}</span>
                          {metrics.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {metrics.map((m, mi) => (
                                <MetricBadge key={mi} text={m} idx={i + mi} />
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
