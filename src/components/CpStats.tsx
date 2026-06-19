"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, BarChart3 } from "lucide-react";

interface CodeforcesData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
}

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

const rankColors: Record<string, string> = {
  newbie: "text-zinc-400",
  pupil: "text-green-400",
  specialist: "text-cyan-400",
  expert: "text-blue-400",
  candidateMaster: "text-purple-400",
  master: "text-orange-400",
  internationalMaster: "text-orange-400",
  grandmaster: "text-red-400",
};

function CodeforcesCard({ data }: { data: CodeforcesData | null }) {
  const rankColor = rankColors[data?.rank?.toLowerCase().replace(/\s+/g, "") ?? ""] ?? "text-zinc-400";

  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Code2 size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Codeforces</h3>
          <p className="text-[10px] text-muted">@khurmiprateek3</p>
        </div>
      </div>

      {data ? (
        <div className="space-y-3">
          <div>
            <span className={`text-3xl font-bold tracking-tight ${rankColor}`}>
              {data.rating}
            </span>
            <span className="text-xs text-muted ml-2">rating</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 capitalize">
              {data.rank}
            </span>
            <span>
              Max: <span className="text-fg font-medium">{data.maxRating}</span>
            </span>
          </div>
          <a
            href="https://codeforces.com/profile/khurmiprateek3"
            target="_blank"
            className="inline-block text-[11px] text-accent hover:underline mt-1"
          >
            View profile →
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          Loading...
        </div>
      )}
    </div>
  );
}

function LeetCodeCard({ data }: { data: LeetCodeData | null }) {
  const total = data ? data.easySolved + data.mediumSolved + data.hardSolved : 0;
  const maxProblems = 3500;

  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all hover:shadow-lg hover:shadow-accent/5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <BarChart3 size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">LeetCode</h3>
          <p className="text-[10px] text-muted">@khurmi_03</p>
        </div>
      </div>

      {data ? (
        <div className="space-y-3">
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-3xl font-bold tracking-tight">
                {total}
              </span>
              <span className="text-xs text-muted ml-2">solved</span>
            </div>
            <div className="text-xs text-muted">
              Rank{" "}
              <span className="text-fg font-medium">
                #{data.ranking.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded-md text-[11px] bg-green-900/30 text-green-400 border border-green-900/50">
              {data.easySolved} E
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] bg-yellow-900/30 text-yellow-400 border border-yellow-900/50">
              {data.mediumSolved} M
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] bg-red-900/30 text-red-400 border border-red-900/50">
              {data.hardSolved} H
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-muted">
              <span>Progress</span>
              <span>{((total / maxProblems) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                style={{ width: `${Math.min((total / maxProblems) * 100, 100)}%` }}
              />
            </div>
          </div>
          <a
            href="https://leetcode.com/u/khurmi_03/"
            target="_blank"
            className="inline-block text-[11px] text-accent hover:underline mt-1"
          >
            View profile →
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          Loading...
        </div>
      )}
    </div>
  );
}

export default function CpStats() {
  const [cfData, setCfData] = useState<CodeforcesData | null>(null);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);

  useEffect(() => {
    // Codeforces (via proxy)
    fetch("/api/codeforces")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) return;
        setCfData({
          handle: d.handle,
          rating: d.rating,
          maxRating: d.maxRating,
          rank: d.rank,
          maxRank: d.maxRank,
        });
      })
      .catch(() => {});

    // LeetCode (via proxy)
    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) return;
        setLcData({
          totalSolved: d.totalSolved,
          easySolved: d.easySolved,
          mediumSolved: d.mediumSolved,
          hardSolved: d.hardSolved,
          ranking: d.ranking,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-accent mb-2 block">
            {"//"} competitive programming
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none mb-3">
            Problem Solving
          </h2>
          <p className="text-muted text-sm">
            Live stats from Codeforces &amp; LeetCode
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <CodeforcesCard data={cfData} />
          <LeetCodeCard data={lcData} />
        </div>
      </div>
    </section>
  );
}
