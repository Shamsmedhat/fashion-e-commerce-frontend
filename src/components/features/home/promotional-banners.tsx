"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PromotionalBanners() {
  return (
    <section className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-5 h-screen">
      {/* Famous Muiches Banner */}
      <div className="relative h-4/5 overflow-hidden group cursor-pointer self-start">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/23.jpg"
            alt="Famous Muiches"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10s">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            FAMOUS MUICHES
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 hover:bg-white text-white border-white backdrop-blur-sm rounded-none"
          >
            SHOP NOW
          </Button>
        </div>
      </div>

      {/* Special Collection Banner */}
      <div className="relative h-4/5 overflow-hidden group cursor-pointer self-end">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/22.png"
            alt="Special Collection"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            SPECIAL COLLECTION
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 hover:bg-white text-white border-white backdrop-blur-sm rounded-none"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
}
