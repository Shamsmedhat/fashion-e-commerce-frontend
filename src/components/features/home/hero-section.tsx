import Image from "next/image";
import { Teko } from "next/font/google";

import { cn } from "@/lib/utils/tailwind-merge";

// Fonts
const teko = Teko({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {/* Behind image style */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[120px] md:text-[160px] font-black text-gray-300/30 select-none">
              SHOP ALL
            </h1>
          </div>

          {/* Hero Image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-96 h-96 md:w-[600px] md:h-[600px]">
              <Image
                src="/assets/images/landing-black.png"
                alt="Soleil store"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Text Overlays */}
          <div className="absolute top-20 left-10 md:left-20 z-20">
            <p
              className={cn(
                teko.className,
                "text-2xl md:text-3xl font-bold text-primary-900 uppercase"
              )}
            >
              adjustable
            </p>
          </div>
          <div className="absolute bottom-20 right-10 md:right-20 z-20">
            <p
              className={cn(
                teko.className,
                "text-2xl md:text-3xl font-bold text-primary-900 uppercase"
              )}
            >
              elegant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
