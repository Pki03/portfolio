"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { profile } from "@/data/profile";

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function InfoIcon({ label }: { label: string }) {
  // Extract numeric patterns for display
  const match = label.match(/([\d,.]+%|[\d,]+\+?\s*RPS)/);
  if (!match) return null;
  const value = match[1];
  const clean = label.replace(match[0], "").replace(/\s+/g, " ").trim();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10">
      <span className="text-xs font-semibold text-accent tracking-tight">{value}</span>
      {clean && <span className="text-[10px] text-muted-2">{clean}</span>}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} projects
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none mb-3">
            Things I&apos;ve Built
          </h2>
          <p className="text-muted text-sm">
            Distributed systems, AI agents, and full-stack apps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 perspective-[1200px]">
          {profile.projects.map((project, idx) => (
            <TiltCard
              key={project.title}
              className="group relative p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="p-2 rounded-lg text-muted hover:text-fg hover:bg-card-hover transition-all"
                        aria-label="View on GitHub"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.links?.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        className="p-2 rounded-lg text-muted hover:text-accent hover:bg-card-hover transition-all"
                        aria-label={link.label}
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics row */}
                {project.highlights.some((h) => /\d/.test(h)) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights
                      .filter((h) => /\d/.test(h))
                      .slice(0, 3)
                      .map((h, i) => (
                        <InfoIcon key={i} label={h} />
                      ))}
                  </div>
                )}

                {/* Highlights */}
                <ul className="space-y-1.5 mb-4">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-2 flex items-start gap-2"
                    >
                      <span className="text-accent mt-1 shrink-0">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-md bg-bg border border-border text-muted-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
