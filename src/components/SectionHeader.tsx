"use client";

import Link from "next/link";
import BoxReveal from "./BoxReveal";

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  id,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`top-[70px] sticky z-10 mb-24 ${className}`}>
      <Link href={`#${id}`}>
        <BoxReveal width="100%">
          <h2 className="text-4xl md:text-7xl font-bold text-foreground tracking-tight leading-none">
            {title}
          </h2>
        </BoxReveal>
      </Link>
      {subtitle && (
        <p className="mx-auto max-w-3xl font-normal text-base text-center text-muted-foreground mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}
