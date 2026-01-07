"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoryBanners() {
  // Map to display format - using categories from mock data structure
  // Adjust the mapping based on your design needs
  const displayCategories = [
    {
      name: "Children",
      slug: "children",
      image: "/images/categories/kids.jpg",
    },
    { name: "Women", slug: "women", image: "/images/categories/women.jpg" },
    { name: "Men", slug: "men", image: "/images/categories/men.jpg" },
    // Add more categories as needed, or use subcategories
    {
      name: "Sneakers",
      slug: "sneakers",
      image: "/images/categories/sneakers.jpg",
    },
    { name: "Boots", slug: "boots", image: "/images/categories/boots.jpg" },
  ];

  return (
    <section className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {displayCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group relative aspect-square rounded-lg overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-200">
              {/* <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 20vw"
                // onError={(e) => {
                //   e.currentTarget.style.display = "none";
                // }}
              /> */}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Category Name */}
            <div className="absolute inset-0 flex items-end justify-center p-4 z-10">
              <div className="bg-black/70 px-4 py-2 rounded">
                <h3 className="text-white font-semibold text-lg">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
