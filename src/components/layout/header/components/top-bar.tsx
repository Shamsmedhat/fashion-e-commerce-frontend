"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function TopBar() {
  // Translations
  const t = useTranslations();

  // Hooks
  const autoScroll = useRef(
    AutoScroll({
      speed: 0.75,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  // Variables
  const announcements = [
    { text: t("new-collection-soon"), emoji: "🎉" },
    { text: t("free-shipping"), emoji: "🚚" },
    { text: t("special-offers"), emoji: "💥" },
  ];

  return (
    <Carousel
      className="bg-gray-800 text-white text-sm py-2"
      plugins={[autoScroll.current]}
      opts={{
        loop: true,
        dragFree: false,
        watchDrag: false,
        containScroll: false,
      }}
    >
      <CarouselContent className="-ml-8" dir="ltr">
        {/* Announcements */}
        {Array.from({ length: 5 }).flatMap((_, groupIndex) =>
          announcements.map((ann, index) => (
            <CarouselItem
              key={`${groupIndex}-${index}`}
              className="w-1/3 basis-auto italic text-white/80"
            >
              <span className="uppercase whitespace-nowrap  me-2">{ann.text}</span>
              <span className="uppercase whitespace-nowrap">{ann.emoji}</span>
            </CarouselItem>
          )),
        )}
      </CarouselContent>
    </Carousel>
  );
}
