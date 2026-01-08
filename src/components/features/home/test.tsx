import { Truck, Headphones, ShieldCheck } from "lucide-react";

export default function Test() {
  const features = [
    {
      icon: Truck,
      title: "FREE AND FAST DELIVERY",
      subtitle: "Free delivery for all orders over $140",
    },
    {
      icon: Headphones,
      title: "24/7 CUSTOMER SERVICE",
      subtitle: "Friendly 24/7 customer support",
    },
    {
      icon: ShieldCheck,
      title: "MONEY BACK GUARANTEE",
      subtitle: "We return money within 30 days",
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-black border border-gray-300 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold uppercase mb-2 text-black">
                  {feature.title}
                </h3>

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
