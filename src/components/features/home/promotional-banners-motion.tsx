"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PromotionalBannersMotionProps = {
  firstBanner: ReactNode;
  secondBanner: ReactNode;
};

export function PromotionalBannersMotion({
  firstBanner,
  secondBanner,
}: PromotionalBannersMotionProps) {
  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-5 h-screen uppercase"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.18,
          },
        },
      }}
    >
      {/* Left banner */}
      <motion.div
        className="h-full self-start"
        variants={{
          hidden: { opacity: 0, y: 36, x: -18, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, ease: "easeOut" as const },
          },
        }}
      >
        {firstBanner}
      </motion.div>

      {/* Right banner */}
      <motion.div
        className="h-full self-end"
        variants={{
          hidden: { opacity: 0, y: 36, x: 18, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, ease: "easeOut" as const },
          },
        }}
      >
        {secondBanner}
      </motion.div>
    </motion.section>
  );
}
