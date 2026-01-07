"use client";

import { Button } from "@/components/ui/button";

export default function PromotionalBanners() {
  return (
    <section className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Famous Muiches Banner */}
      <div className="relative h-[500px] rounded-lg overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-orange-400">
          {/* Placeholder for person image - replace with actual image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-full bg-gray-300" />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-10 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            FAMOUS MUICHES
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 hover:bg-white/30 text-white border-white backdrop-blur-sm"
          >
            SHOP NOW
          </Button>
        </div>
      </div>

      {/* Special Collection Banner */}
      <div className="relative h-[500px] rounded-lg overflow-hidden group cursor-pointer bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder for Nike products - replace with actual images */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gray-800" />
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-start justify-center p-10 z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SPECIAL COLLECTION
          </h2>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 hover:bg-white/30 text-white border-white backdrop-blur-sm"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
}
