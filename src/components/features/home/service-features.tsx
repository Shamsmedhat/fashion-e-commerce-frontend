"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ServiceFeatures() {
  return (
    <section className="py-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-1 h-screen">
          {/* Special Collection Banner */}
          <div className="relative h-full overflow-hidden group cursor-pointer">
            <Image
              src="/assets/images/22.png"
              alt="Special Collection"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-black rounded-none"
              >
                SHOP NOW
              </Button>
            </div>
          </div>

          {/* Famous Muiches Banner - 50/50 Split */}
          <div className="grid grid-cols-2 gap-1 h-full">
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>

          {/* Famous Muiches Banner - 33/67 Split */}
          <div className="grid grid-cols-3 gap-1 h-full">
            <div className="relative overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
            <div className="relative col-span-2 overflow-hidden group cursor-pointer">
              <Image
                src="/assets/images/23.jpg"
                alt="Famous Muiches"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-10 z-10">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black rounded-none"
                >
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
