# 🏎️ Prateek Khurmi — Portfolio

> **Software Development Engineer** — Distributed systems, AI agents, and cloud-native platforms.  
> SDE Intern @ Ericsson R&D. Building for YC startups, remote-first companies, and top tech firms.

---

## ✨ Highlights

- **3D Ferrari Showcase** — Interactive Three.js scene with `@react-three/fiber`, realistic ground plane, ContactShadows, and ACES tone mapping
- **Live Competitive Programming Stats** — Real-time Codeforces rating + LeetCode stats fetched via server-side API proxies
- **Skills Grid** — 32 curated tech icons from skillicons.dev with static labels (languages, frameworks, cloud, AI/ML, DevOps)
- **Impact-Focused Achievements** — Production metrics (99% cache hit, 2,000+ RPS, 60% faster onboarding) instead of academic stats
- **Smooth Scroll** — Lenis-powered smooth scrolling with Framer Motion animations throughout
- **Fully Responsive** — Mobile-first grid layout adapts from 4 to 8 columns

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 App Router, TypeScript |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **3D** | Three.js, @react-three/fiber, @react-three/drei |
| **Animations** | Lenis (smooth scroll), Framer Motion, CSS transitions |
| **Icons** | skillicons.dev, Lucide React, React Icons |
| **Data Fetching** | Next.js API Routes (server-side proxies for LeetCode & Codeforces) |
| **Deployment** | Vercel (GitHub-integrated CI/CD) |

---

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── codeforces/route.ts   # Codeforces API proxy
│   │   └── leetcode/route.ts     # LeetCode GraphQL proxy
│   ├── globals.css               # Tailwind v4 + custom styles
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main page (section orchestration)
├── components/
│   ├── sections/
│   │   └── SkillsSection.tsx     # 32-icon skills grid
│   ├── Achievements.tsx          # Animated counter cards
│   ├── BlurIn.tsx                # Blur-in text animation
│   ├── Contact.tsx               # Contact card with socials
│   ├── CpStats.tsx               # Live Codeforces + LeetCode stats
│   ├── Experience.tsx            # Ericsson R&D experience
│   ├── Hero.tsx                  # Hero with name, tagline, CTA
│   ├── Preloader.tsx             # Loading screen
│   ├── Projects.tsx              # 3D tilt card project showcase
│   ├── RacingCarBackground.tsx   # Ferrari Three.js scene
│   └── ... (SiteHeader, Navbar, Footer, etc.)
├── data/
│   └── profile.ts                # All profile data (centralized)
├── lib/
│   └── components/ui/            # shadcn-style Button, Badge, Card
└── public/
    ├── ferrari.glb               # Ferrari 3D model
    └── ferrari_ao.png            # Ambient occlusion texture
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Pki03/portfolio.git
cd portfolio
npm install
npm run dev     # → http://localhost:3000
npm run build   # Production build
npm start       # Serve production build
```

---

## 📄 Sections

| Section | Description |
|---|---|
| **Hero** | Full-screen Ferrari 3D background, name, tagline, CTA buttons |
| **Tech Stack** | 32 skill icons with labels in a responsive 4×8 grid |
| **Experience** | Ericsson R&D SDE Intern — Second Brain platform, Java 21 migration, concurrency fix |
| **Projects** | FogCache CDN, AI Lead Gen Agent, Route Planner, ATS Resume Builder |
| **Achievements** | Animated impact metrics (99% cache hit, 2K+ RPS, 500+ problems, etc.) |
| **Problem Solving** | Live Codeforces rating + LeetCode solved count (fetched via API proxies) |
| **Contact** | Email, phone, location, social links (GitHub, LinkedIn, LeetCode, Codeforces) |

---

## 🌐 Live Demo

**https://prateekkhurmi.vercel.app** (once deployed)

---

## 📬 Contact

- **Email**: khurmiprateek3@gmail.com
- **GitHub**: [Pki03](https://github.com/Pki03)
- **LinkedIn**: [prateekkhurmi](https://www.linkedin.com/in/prateekkhurmi/)
- **LeetCode**: [khurmi_03](https://leetcode.com/u/khurmi_03/)
- **Codeforces**: [khurmiprateek3](https://codeforces.com/profile/khurmiprateek3)
