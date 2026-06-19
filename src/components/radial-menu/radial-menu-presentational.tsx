"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, Position } from './types';

interface RadialMenuPresentationalProps {
  isOpen: boolean;
  position: Position;
  items: MenuItem[];
  activeIndex: number | null;
}

export function RadialMenuPresentational({
  isOpen,
  position,
  items,
  activeIndex,
}: RadialMenuPresentationalProps) {
  const itemCount = items.length;
  const sliceAngle = 360 / itemCount;
  const radius = 80;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998]"
          />

          {/* Menu items */}
          {items.map((item, index) => {
            const angle = (index * sliceAngle + sliceAngle / 2 - 90) * (Math.PI / 180);
            const x = position.x + radius * Math.cos(angle);
            const y = position.y + radius * Math.sin(angle);
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.3 : 1,
                  x: x - position.x,
                  y: y - position.y,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="fixed z-[9999] pointer-events-none"
                style={{
                  left: position.x,
                  top: position.y,
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: isActive ? item.color : 'hsl(var(--card))',
                  border: `2px solid ${item.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  boxShadow: isActive ? `0 0 20px ${item.color}40` : 'none',
                }}
              >
                {item.emoji}
              </motion.div>
            );
          })}

          {/* Center dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[9999] w-3 h-3 rounded-full bg-foreground pointer-events-none"
            style={{ left: position.x - 6, top: position.y - 6 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
