"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} contact
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none mb-3">
            Let&apos;s Build Something
          </h2>
          <p className="text-muted text-sm max-w-xl">
            I&apos;m actively looking for SDE-1 opportunities where I can solve
            hard problems and ship production code. If that sounds like your
            team — let&apos;s talk.
          </p>
        </motion.div>

        {/* ── Contact card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Email */}
            <div>
              <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider mb-1">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-lg md:text-xl font-semibold text-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
              >
                <Mail size={16} className="text-accent shrink-0" />
                {profile.email}
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider mr-2 hidden sm:inline">
                Social
              </span>
              {[
                { icon: FaGithub, label: "GitHub", href: profile.socials.github },
                { icon: FaLinkedin, label: "LinkedIn", href: profile.socials.linkedin },
                { icon: SiLeetcode, label: "LeetCode", href: profile.socials.leetcode },
                { icon: SiCodeforces, label: "Codeforces", href: profile.socials.codeforces },
              ].map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="w-10 h-10 rounded-lg border border-border bg-card hover:bg-card-hover text-muted hover:text-accent hover:border-accent/30 flex items-center justify-center transition-all hover:-translate-y-0.5"
                    aria-label={link.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
