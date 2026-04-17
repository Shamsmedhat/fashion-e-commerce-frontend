"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function HeroImageMotion() {
  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-96 h-96 md:w-[600px] md:h-[600px]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        shouldReduceMotion
          ? {
              duration: 0,
            }
          : {
              duration: 0.7,
              ease: "easeOut" as const,
            }
      }
    >
      <div className="relative h-full w-full">
        <Image
          src="/assets/images/landing-black.png"
          alt="Soleil store"
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  );
}
