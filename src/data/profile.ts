export const profile = {
  name: "Prateek Khurmi",
  tagline: "Software Development Engineer",
  description:
    "Building distributed systems, AI-powered agents, and cloud-native platforms. SDE Intern @ Ericsson R&D. Targeting high-impact engineering roles at fast-moving startups, remote-first companies, and top tech firms.",

  location: "India",
  email: "khurmiprateek3@gmail.com",
  phone: "+91-8527100717",

  socials: {
    github: "https://github.com/Pki03",
    linkedin: "https://www.linkedin.com/in/prateekkhurmi/",
    leetcode: "https://leetcode.com/u/khurmi_03/",
    codeforces: "https://codeforces.com/profile/khurmiprateek3",
    twitter: "https://x.com/prateekkhurmi",
  },

  education: [
    {
      degree: "B.E. Computer Engineering",
      institution: "Thapar Institute of Engineering and Technology",
      year: "2026",
      score: "8.64 CGPA",
    },
    {
      degree: "Class XII (TSBIE)",
      institution: "Telangana State Board of Intermediate Education",
      year: "2022",
      score: "97%",
    },
    {
      degree: "Class X (CBSE)",
      institution: "Central Board of Secondary Education",
      year: "2020",
      score: "96.4%",
    },
  ],

  experience: [
    {
      company: "Ericsson",
      role: "SDE Intern — R&D",
      period: "Jan 2026 – Jul 2026",
      url: "https://www.ericsson.com",
      highlights: [
        "Architected an AI-powered \"Second Brain\" knowledge platform using Anthropic Claude with shared cross-agent memory, automated meeting-to-document pipelines, and an interlinked skills graph — cutting team onboarding effort by 60% and eliminating repeated knowledge rediscovery across microservices and DevOps workflows.",
        "Led migration of 5 production invoicing microservices from Java 11 to Java 21, resolving 30+ breaking API incompatibilities and removing deprecated libraries to improve runtime security and maintainability.",
        "Resolved a critical concurrency bug in PDF generation by eliminating shared mutable state — reducing concurrent failure rates from 40% to under 1%; containerized services with Docker and deployed via Kubernetes for consistent, scalable delivery.",
      ],
      tech: [
        "Java",
        "Spring Boot",
        "Docker",
        "Kubernetes",
        "Claude AI",
        "Microservices",
        "API Migration",
      ],
    },
  ],

  projects: [
    {
      title: "FogCache — Intelligent Distributed CDN",
      description:
        "Architected a distributed CDN with intelligent request routing, adaptive replication, cache stampede protection, and ML-driven content placement using custom LRU/LFU cache engines built on Java concurrency primitives.",
      tech: [
        "Java",
        "Spring Boot",
        "Docker",
        "Python",
        "Machine Learning",
        "REST APIs",
        "Distributed Systems",
      ],
      highlights: [
        "Custom LRU/LFU cache engines built on Java concurrency primitives",
        "Python ML pipeline for HOT/WARM/COLD traffic classification enabling predictive prefetching and dynamic replication",
        "2,000+ RPS, 99% cache hit ratio, 95% origin load reduction, 4× latency improvement",
        "Validated across 27 test phases — chaos engineering, failover, concurrency",
      ],
      github: "https://github.com/Pki03/fogcache",
      links: [],
    },
    {
      title: "AI-Powered Lead Generation Agent",
      description:
        "Multi-step LLM agent using LangChain and LangGraph with tool-calling via Hunter.io API for automated company discovery, email retrieval, and lead verification — reducing manual lead research effort by 80%+.",
      tech: ["Python", "FastAPI", "LangChain", "LangGraph", "React", "LLM Agents"],
      highlights: [
        "Developed a multi-step LLM agent with LangChain and LangGraph orchestrating tool-calling via Hunter.io API",
        "Automated company discovery, email retrieval, and lead verification pipeline",
        "Integrated scalable FastAPI backend with structured JSON outputs and a React frontend",
      ],
      github: "https://github.com/Pki03/lead_gen_agent",
      links: [],
    },
    {
      title: "Route Planner — Cost Optimization",
      description:
        "TSP solver using recursive memoization and Google Distance Matrix API to minimize multi-stop travel distance with interactive map features.",
      tech: ["React", "Google Maps API", "Distance Matrix API", "Algorithms"],
      highlights: [
        "Implemented TSP solver using recursive memoization for optimal multi-stop routing",
        "Live map markers with drag-and-drop waypoints, animated polylines, and reverse geocoding",
        "Multi-modal navigation support with interactive UI",
      ],
      github: "https://github.com/Pki03/TraveelingSalesman",
      links: [],
    },
    {
      title: "ATS Resume Builder",
      description:
        "Production-grade ATS-optimized resume builder deployed at getapplykit.com. Build, preview, and export ATS-compliant resumes with real-time scoring and multiple templates.",
      tech: ["Astro", "React", "Node.js", "MongoDB", "Tailwind CSS"],
      highlights: [
        "Live ATS compatibility scoring with real-time preview",
        "Multiple professional templates with PDF export",
        "Deployed and live at getapplykit.com serving real users",
      ],
      github: "https://github.com/Pki03/resume.com",
      links: [{ label: "Live Site", url: "https://getapplykit.com" }],
    },
  ],

  techStack: {
    languages: ["Java", "JavaScript", "Python", "C++", "C", "SQL", "TypeScript", "Go"],
    backend: [
      "Spring Boot",
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "JWT",
      "OAuth 2.0",
    ],
    frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Firebase Firestore", "Redis"],
    devops: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "Git",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    cloud: ["AWS", "GCP", "Cloudflare", "Vercel"],
    ai: [
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "LangChain",
      "LangGraph",
      "AI Agents",
      "Multi-Agent Systems",
    ],
    csFundamentals: [
      "DSA",
      "System Design",
      "OOP",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
    ],
  },

  achievements: [
    { label: "DSA Problems Solved", value: "500+", icon: "code" },
    { label: "Class XII Score", value: "97%", icon: "award" },
    { label: "Class X Score", value: "96.4%", icon: "award" },
    { label: "CGPA", value: "8.64", icon: "star" },
    { label: "Concurrency Bug Fix", value: "40%→1%", icon: "zap" },
    { label: "Merit Scholarship", value: "Awarded", icon: "medal" },
  ],
};
