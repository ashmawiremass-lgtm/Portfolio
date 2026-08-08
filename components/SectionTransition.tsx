"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionTransition({
  id,
  className,
  children,
}: {
  id: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle, continuous: eases in as a section enters the viewport,
  // stays settled while it's in view, eases out as it leaves —
  // tied to scroll itself rather than a single fade-in trigger
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.45, 1, 1, 0.45]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [28, 0, 0, -14]);

  return (
    <motion.section ref={ref} id={id} className={className} style={{ opacity, scale, y }}>
      {children}
    </motion.section>
  );
}
