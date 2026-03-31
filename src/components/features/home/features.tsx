import { Truck, Headphones, ShieldCheck } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { FREE_DELIVERY_MINIMUM_EGP } from "@/lib/constants/currency.constant";

export default function Features() {
  // Translations
  const t = useTranslations();

  // Hooks
  const format = useFormatter();

  // Variables
  const freeDeliveryThreshold = format.number(FREE_DELIVERY_MINIMUM_EGP, "currencyInteger");

  const features = [
    {
      icon: Truck,
      title: t("free-and-fast-delivery"),
      subtitle: t("free-delivery-for-all-orders-over-140", { threshold: freeDeliveryThreshold }),
    },
    {
      icon: Headphones,
      title: t("24-7-customer-service"),
      subtitle: t("friendly-24-7-customer-support"),
    },
    {
      icon: ShieldCheck,
      title: t("money-back-guarantee"),
      subtitle: t("we-return-money-within-30-days"),
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-black border border-gray-300 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold uppercase mb-2 text-black">{feature.title}</h3>

                {/* Subtitle */}
                <p className="text-sm text-black">{feature.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
