"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/lib/components/ui/button";
import { File } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import dynamic from "next/dynamic";
import { BlurIn } from "./BlurIn";
import { profile } from "@/data/profile";

const TechBackground = dynamic(
  () => import("./TechBackground"),
  { ssr: false },
);

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-dvh overflow-hidden">
      <TechBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 z-[1]" />

      <div className="grid md:grid-cols-2 h-full">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          <div className="flex flex-col">
            <div>
              <BlurIn delay={0.7}>
                <p className="md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text">
                  Hi, I am
                  <br className="md:hidden" />
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                  <h1
                    className={cn(
                      "-ml-[6px] leading-none text-left",
                      "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                      "cursor-default text-edge-outline font-display"
                    )}
                  >
                  {profile.name.split(" ")[0]}
                  <br className="md:block" />
                  {profile.name.split(" ")[1]}
                </h1>
              </BlurIn>

              <BlurIn delay={1.2}>
                <p className="md:self-start md:mt-4 font-thin text-md text-slate-500 dark:text-zinc-400 cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text">
                  {profile.tagline}
                </p>
              </BlurIn>
            </div>

            <div className="mt-8 flex flex-col gap-3 w-fit">
              <Button
                className="flex items-center gap-2 w-full"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <File size={24} />
                <p>View My Work</p>
              </Button>

              <div className="md:self-start flex gap-3">
                <Button
                  variant={"outline"}
                  className="block w-full overflow-hidden"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get in Touch
                </Button>
                <div className="flex items-center h-full gap-2">
                  <Link href={profile.socials.github} target="_blank">
                    <Button variant={"outline"}>
                      <FaGithub size={24} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.linkedin} target="_blank">
                    <Button variant={"outline"}>
                      <FaLinkedin size={24} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.leetcode} target="_blank">
                    <Button variant={"outline"}>
                      <SiLeetcode size={20} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.codeforces} target="_blank">
                    <Button variant={"outline"}>
                      <SiCodeforces size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid col-span-1" />
      </div>
    </section>
  );
}
