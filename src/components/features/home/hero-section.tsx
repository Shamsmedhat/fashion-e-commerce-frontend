import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import { Teko } from "next/font/google";
import { cn } from "@/lib/utils/tailwind-merge";

const teko = Teko({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function HeroSection() {
  // const t = useTranslations();

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Background Shoe Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {/* Large SHOLL Text Behind Shoe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[200px] md:text-[300px] font-black text-gray-300/30 select-none">
              SHOLL
            </h1>
          </div>

          {/* Shoe Image - Placeholder, replace with actual image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
              <Image
                src="/assets/images/landing2.png"
                alt="Hero Shoe"
                // fill
                height={700}
                width={700}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <Button>Test</Button>
          {/* Text Overlays */}
          <div className="absolute top-20 left-10 md:left-20 z-20">
            <p
              className={cn(
                teko.className,
                "text-2xl md:text-3xl font-bold text-gray-900"
              )}
            >
              ADJUSTABLE
            </p>
          </div>
          <div className="absolute bottom-20 right-10 md:right-20 z-20">
            <p
              className={cn(
                teko.className,
                "text-2xl md:text-3xl font-bold text-gray-900"
              )}
            >
              SEFT PAD
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-10 left-10 md:left-20 z-30 flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
        >
          NEW ARRIVALS
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-green-600 hover:bg-green-700 text-white border-green-600 px-8 py-6 text-lg rounded-lg"
        >
          WHAT&apos;S TRENDING
        </Button>
      </div>
    </section>
  );
}
