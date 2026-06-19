"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100dvh",
    transition: { duration: 0.8, ease: "easeInOut" as const, delay: 0.2 },
  },
};

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Animate progress
  useEffect(() => {
    const duration = 2500; // ms
    const steps = 50;
    const increment = 100 / steps;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Wait a beat then start exit
        setTimeout(() => {
          setShow(false);
          setTimeout(onComplete, 800);
        }, 400);
      } else {
        setProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: "easeInOut" as const },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: "easeInOut" as const, delay: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[99999] flex items-end justify-end px-16 pb-8"
          style={{ backgroundColor: "hsl(var(--background))" }}
        >
          {dimension.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="flex items-center text-6xl md:text-7xl font-display z-10"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {Math.round(progress)}%
              </motion.p>
              <svg className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: "calc(100% + 300px)" }}>
                <motion.path
                  variants={curve}
                  initial="initial"
                  exit="exit"
                  fill="hsl(var(--background))"
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
