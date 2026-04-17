"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type NewArrivalsMotionProps = {
  title: string;
  titleClassName: string;
  ctaLabel: string;
  children: ReactNode;
};

export function NewArrivalsMotion({
  title,
  titleClassName,
  ctaLabel,
  children,
}: NewArrivalsMotionProps) {
  // Accessibility
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="container py-12"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.16,
          },
        },
      }}
    >
      {/* Section title */}
      <motion.h2
        className={titleClassName}
        variants={{
          hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.7, ease: "easeOut" as const },
          },
        }}
      >
        {title}
      </motion.h2>

      {/* Products block */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.85, ease: "easeOut" as const },
          },
        }}
      >
        {children}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex justify-center mt-8"
        variants={{
          hidden: { opacity: 0, y: 14, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.65, ease: "easeOut" as const },
          },
        }}
      >
        <Button
          className="bg-black text-white font-semibold px-12 py-3 rounded hover:bg-gray-900 transition-colors"
          asChild
        >
          <Link href="/new">{ctaLabel}</Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}
