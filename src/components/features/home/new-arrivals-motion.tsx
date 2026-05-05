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
      className="container py-8 sm:py-10 md:py-12"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.1 }}
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
        className="min-h-[320px]"
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
        className="mt-6 flex justify-center sm:mt-8"
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
          className="rounded bg-black px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-900 sm:px-12"
          asChild
        >
          <Link href="/new">{ctaLabel}</Link>
        </Button>
      </motion.div>
    </motion.section>
  );
}
