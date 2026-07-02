import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AppOverlays from "@/components/AppOverlays";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Prateek Khurmi | SDE — Distributed Systems, AI & Cloud",
  description:
    "SDE Intern @ Ericsson R&D. Building distributed systems, AI-powered agents, and cloud-native platforms. Java, Spring Boot, Kubernetes, LLMs.",
  openGraph: {
    title: "Prateek Khurmi | SDE",
    description:
      "SDE Intern @ Ericsson R&D. Distributed systems, AI agents, and cloud-native. Java, Spring Boot, K8s, LLMs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${[inter.variable, archivoBlack.variable].join(" ")}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: "(function(){try{var t=localStorage.getItem('theme');if(!t||t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){}})()",
        }} />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <Footer />
          <AppOverlays />
        </ThemeProvider>
      </body>
    </html>
  );
}
