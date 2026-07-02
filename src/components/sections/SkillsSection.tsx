"use client";

import { motion } from "framer-motion";

const ICONS: { id: string; name: string }[] = [
  { id: "cpp", name: "C++" },
  { id: "c", name: "C" },
  { id: "java", name: "Java" },
  { id: "py", name: "Python" },
  { id: "go", name: "Go" },
  { id: "ts", name: "TypeScript" },
  { id: "js", name: "JavaScript" },
  { id: "kotlin", name: "Kotlin" },
  { id: "react", name: "React" },
  { id: "nextjs", name: "Next.js" },
  { id: "nodejs", name: "Node.js" },
  { id: "fastapi", name: "FastAPI" },
  { id: "postgres", name: "PostgreSQL" },
  { id: "kafka", name: "Kafka" },
  { id: "git", name: "Git" },
  { id: "spring", name: "Spring Boot" },
  { id: "docker", name: "Docker" },
  { id: "mongodb", name: "MongoDB" },
  { id: "mysql", name: "MySQL" },
  { id: "redis", name: "Redis" },
  { id: "aws", name: "AWS" },
  { id: "gcp", name: "Google Cloud" },
  { id: "cloudflare", name: "Cloudflare" },
  { id: "prometheus", name: "Prometheus" },
  { id: "grafana", name: "Grafana" },
  { id: "linux", name: "Linux" },
  { id: "bash", name: "Bash" },
  { id: "pytorch", name: "PyTorch" },
  { id: "kubernetes", name: "Kubernetes" },
  { id: "threejs", name: "Three.js" },
  { id: "supabase", name: "Supabase" },
  { id: "express", name: "Express" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-20 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} tech stack
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none text-foreground">
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-1 w-fit mx-auto">
          {ICONS.map((skill) => (
            <div
              key={skill.id}
              className="w-[72px] h-[84px] md:w-28 md:h-32 bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 hover:bg-zinc-900 hover:scale-110 transition-all cursor-pointer"
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.id}`}
                alt={skill.name}
                loading="lazy"
                width={48}
                height={48}
                className="w-8 h-8 md:w-14 md:h-14 object-contain block"
              />
              <span className="text-[9px] md:text-[11px] font-mono text-zinc-400 leading-tight text-center px-0.5">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
