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
            "flex flex-col justify-center items-center md:items-start",
            "px-6 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          <div className="flex flex-col w-full max-w-md md:max-w-none">
            <div>
              <BlurIn delay={0.7}>
                <p className="md:self-start text-sm sm:text-base md:text-xl text-zinc-400 cursor-default font-display bg-clip-text">
                  Hi, I am
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                <h1
                  className={cn(
                    "-ml-[3px] md:-ml-[6px] leading-none text-left",
                    "font-thin text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
                    "cursor-default text-edge-outline font-display"
                  )}
                >
                  {profile.name.split(" ")[0]}
                  <br />
                  {profile.name.split(" ")[1]}
                </h1>
              </BlurIn>

              <BlurIn delay={1.2}>
                <p className="md:self-start mt-2 md:mt-4 text-sm sm:text-base md:text-xl text-zinc-400 cursor-default font-display bg-clip-text">
                  {profile.tagline}
                </p>
              </BlurIn>
            </div>

            <div className="mt-6 md:mt-8 flex flex-col gap-3 w-full md:w-fit">
              <Button
                className="flex items-center gap-2 w-full"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <File size={20} />
                <p>View My Work</p>
              </Button>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <Button
                  variant={"outline"}
                  className="flex-1 overflow-hidden"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get in Touch
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <Link href={profile.socials.github} target="_blank">
                    <Button variant={"outline"} className="p-2 w-10 h-10">
                      <FaGithub size={20} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.linkedin} target="_blank">
                    <Button variant={"outline"} className="p-2 w-10 h-10">
                      <FaLinkedin size={20} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.leetcode} target="_blank">
                    <Button variant={"outline"} className="p-2 w-10 h-10">
                      <SiLeetcode size={16} />
                    </Button>
                  </Link>
                  <Link href={profile.socials.codeforces} target="_blank">
                    <Button variant={"outline"} className="p-2 w-10 h-10">
                      <SiCodeforces size={16} />
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
