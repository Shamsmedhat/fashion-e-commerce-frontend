import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BagHeader() {
  // Translations
  const t = useTranslations();

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] bg-gray-900 overflow-hidden">
      {/* Background Image*/}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/assets/images/bag/cover.svg"
            alt="Shopping Bag"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide uppercase">
          {t("shopping-bag")}
        </h1>
      </div>
    </div>
  );
}
