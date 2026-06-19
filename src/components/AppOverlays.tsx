"use client";

import dynamic from "next/dynamic";

const ElasticCursor = dynamic(
  () => import("@/components/ui/ElasticCursor"),
  { ssr: false }
);

const RadialMenu = dynamic(
  () => import("@/components/radial-menu"),
  { ssr: false }
);

export default function AppOverlays() {
  return (
    <>
      <ElasticCursor />
      <RadialMenu />
    </>
  );
}
