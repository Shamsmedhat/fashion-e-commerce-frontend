"use client";

import { Headphones, Shield, Truck } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Free and Fast Delivery",
    description: "Free delivery for all orders over ($100)",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Service",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: Shield,
    title: "Money Back Guarantee",
    description: "Returns/Exchanges within 30 days",
  },
];

export default function ServiceFeatures() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-10 h-10 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

