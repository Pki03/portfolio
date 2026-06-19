"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

// ── BoxReveal: slide-over reveal animation ──
interface BoxRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
}

function BoxReveal({
  children,
  width = "fit-content",
  boxColor,
  duration,
  delay,
  once = true,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration: duration ?? 0.5,
          ease: "easeIn",
          delay,
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? "transparent",
        }}
      />
    </div>
  );
}

// ── SectionHeader ──
interface SectionHeaderProps {
  id: string;
  title: string | ReactNode;
  desc?: string;
  className?: string;
}

export function SectionHeader({
  id,
  title,
  desc,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("top-[70px] sticky mb-96", className)}>
      <a href={`#${id}`}>
        <BoxReveal width="100%">
          <h2
            className={cn(
              "text-4xl text-center md:text-7xl font-bold",
              "text-foreground"
            )}
          >
            {title}
          </h2>
        </BoxReveal>
      </a>
      {desc && (
        <p className="mx-auto line-clamp-4 max-w-3xl font-normal text-lg md:text-xl text-center text-muted-foreground">
          {desc}
        </p>
      )}
    </div>
  );
}
