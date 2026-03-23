// "use client";

// import { useState, useMemo } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Star, ShoppingBag, Truck, Phone, MapPin, Plus } from "lucide-react";
// import { cn } from "@/lib/utils/tailwind-merge";
// import AddToBagButton from "@/components/features/products/add-to-bag-button";

// type ProductDetailProps = {
//   product: Product;
// };

// export default function ProductDetail({ product }: ProductDetailProps) {
//   // Get unique sizes and colors from variants
//   const availableSizes = Array.from(
//     new Set(product.variants?.map((v) => v.size).filter(Boolean) || []),
//   );
//   const availableColors = Array.from(
//     new Set(
//       product.variants?.map((v) => v.color?.toLowerCase()).filter((c): c is string => !!c) || [],
//     ),
//   );

//   // State for selected variants
//   const [selectedSize, setSelectedSize] = useState<string | null>(availableSizes[0] || null);
//   const [selectedColor, setSelectedColor] = useState<string | null>(availableColors[0] || null);

//   // Find the selected variant based on size and color
//   const selectedVariant = useMemo(() => {
//     return product.variants?.find(
//       (v) => v.size === selectedSize && v.color?.toLowerCase() === selectedColor?.toLowerCase(),
//     );
//   }, [product.variants, selectedSize, selectedColor]);

//   // Get available sizes for selected color
//   const availableSizesForColor = useMemo(() => {
//     if (!selectedColor) return availableSizes;
//     return Array.from(
//       new Set(
//         product.variants
//           ?.filter((v) => v.color?.toLowerCase() === selectedColor.toLowerCase())
//           .map((v) => v.size)
//           .filter(Boolean) || [],
//       ),
//     );
//   }, [selectedColor, product.variants, availableSizes]);

//   // Display price from selected variant or fallback to first variant
//   const displayPrice = selectedVariant
//     ? selectedVariant.priceDiscount || selectedVariant.price
//     : product.variants?.[0]?.priceDiscount || product.variants?.[0]?.price || 0;

//   const originalPrice = selectedVariant?.priceDiscount ? selectedVariant.price : null;

//   // Get all unique color variants with their first image for thumbnails
//   const colorVariants = useMemo(() => {
//     const variantsByColor = new Map<string, ProductVariant>();
//     product.variants?.forEach((v) => {
//       if (v.color) {
//         const colorKey = v.color.toLowerCase();
//         if (!variantsByColor.has(colorKey)) {
//           variantsByColor.set(colorKey, v);
//         }
//       }
//     });
//     return Array.from(variantsByColor.values());
//   }, [product.variants]);

//   // Check if variant is in stock
//   const isInStock = selectedVariant ? selectedVariant.stock > 0 : false;

//   console.log("selectedVariant", selectedVariant);

//   // Style number/SKU for display
//   const styleNumber = selectedVariant?.sku || product.variants?.[0]?.sku || "";

//   return (
//     <div className="w-full">
//       {/* Full-width Product Image at Top */}
//       <div className="relative w-full h-[80vh] min-h-[60vh] overflow-hidden">
//         <Image
//           src={product.coverImage}
//           alt={product.name}
//           fill
//           className="object-contain"
//           sizes="100vw"
//           priority
//         />
//         {/* Discount Badge */}
//         {originalPrice && selectedVariant?.priceDiscount && (
//           <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded">
//             -{Math.round(((originalPrice - selectedVariant.priceDiscount) / originalPrice) * 100)}%
//           </div>
//         )}
//       </div>

//       {/* Product Info Section Below Image */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
//           {/* Left Column - Product Information (60-70%) */}
//           <div className="space-y-6">
//             {/* Product Title */}
//             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

//             {/* Price */}
//             <div className="flex items-baseline gap-3">
//               <span className="text-3xl lg:text-4xl font-bold text-gray-900">
//                 ${displayPrice.toFixed(0)}
//               </span>
//               {originalPrice && (
//                 <span className="text-xl text-gray-500 line-through">
//                   ${originalPrice.toFixed(0)}
//                 </span>
//               )}
//             </div>

//             {/* Variation Selector */}
//             {colorVariants.length > 0 && (
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm font-medium text-gray-900">Variation</label>
//                   {selectedColor && (
//                     <span className="text-sm text-gray-600 capitalize">{selectedColor}</span>
//                   )}
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {colorVariants.map((variant, i) => {
//                     const colorName = variant.color?.toLowerCase() || "";
//                     const isSelected = colorName === selectedColor?.toLowerCase();
//                     const variantImage = variant.images[i];

//                     return (
//                       <button
//                         key={variant._id}
//                         onClick={() => setSelectedColor(colorName)}
//                         className={cn(
//                           "relative w-16 h-16 border-2 rounded transition-all overflow-hidden",
//                           isSelected
//                             ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
//                             : "border-gray-300 hover:border-gray-600",
//                         )}
//                         title={variant.color || "Color variation"}
//                         aria-label={`Select ${variant.color || "color"} variation`}
//                       >
//                         {variantImage ? (
//                           <Image
//                             src={variantImage}
//                             alt={variant.color || "Product variant"}
//                             fill
//                             className="object-cover"
//                             sizes="64px"
//                           />
//                         ) : (
//                           <span
//                             style={{ backgroundColor: variant.color }}
//                             className="w-24 h-24 rounded-none border-2 transition-all block"
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Size Selection */}
//             {availableSizes.length > 0 && (
//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-gray-900">Size</label>
//                 <div className="flex flex-wrap gap-2">
//                   {availableSizesForColor.map((size) => {
//                     const isAvailable = product.variants?.some(
//                       (v) =>
//                         v.size === size &&
//                         v.color?.toLowerCase() === selectedColor?.toLowerCase() &&
//                         v.stock > 0,
//                     );
//                     const isSelected = size === selectedSize;

//                     return (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         disabled={!isAvailable}
//                         className={cn(
//                           "px-4 py-2 text-sm font-medium border-2 rounded transition-all min-w-[60px]",
//                           isSelected
//                             ? "border-gray-900 bg-gray-900 text-white"
//                             : isAvailable
//                               ? "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
//                               : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
//                         )}
//                       >
//                         {size}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Product Description Section */}
//             <div className="pt-6 space-y-4">
//               <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
//                 PRODUCT DESCRIPTION
//               </h2>
//               {styleNumber && (
//                 <p className="text-sm text-gray-600">Style {styleNumber.split("-").join(" ")}</p>
//               )}
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {product.description || "No description available."}
//               </p>
//             </div>

//             {/* Accordion Sections */}
//             <Accordion type="multiple" className="w-full border-t border-gray-200">
//               <AccordionItem value="product-details" className="border-b border-gray-200">
//                 <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
//                   Product Details
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm text-gray-600 pb-4">
//                   <div className="space-y-2">
//                     {selectedVariant && (
//                       <>
//                         <p>
//                           <span className="font-medium">SKU:</span> {selectedVariant.sku}
//                         </p>
//                         <p>
//                           <span className="font-medium">Stock:</span> {selectedVariant.stock}{" "}
//                           available
//                         </p>
//                         <p>
//                           <span className="font-medium">Sold:</span> {selectedVariant.soldCount}{" "}
//                           units
//                         </p>
//                       </>
//                     )}
//                     {product.ratingsAverage !== undefined && (
//                       <p>
//                         <span className="font-medium">Rating:</span>{" "}
//                         {product.ratingsAverage.toFixed(1)} / 5.0 ({product.reviewCount || 0}{" "}
//                         reviews)
//                       </p>
//                     )}
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="materials-care" className="border-b border-gray-200">
//                 <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
//                   Materials & Care
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm text-gray-600 pb-4">
//                   <p>
//                     Please refer to the product care label for specific care instructions. For best
//                     results, follow the recommended care guidelines to maintain the quality and
//                     appearance of your item.
//                   </p>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="commitment" className="border-b border-gray-200">
//                 <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
//                   Our Commitment
//                 </AccordionTrigger>
//                 <AccordionContent className="text-sm text-gray-600 pb-4">
//                   <p>
//                     We are committed to providing high-quality products and exceptional customer
//                     service. Your satisfaction is our priority, and we stand behind the quality of
//                     every item we offer.
//                   </p>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>

//           {/* Right Column - Purchase Actions (30-40%) */}
//           <div className="space-y-6">
//             {/* Add to Bag Button */}
//             {selectedVariant && isInStock ? (
//               <AddToBagButton
//                 productId={product._id}
//                 variantSku={selectedVariant.sku}
//                 disabled={!isInStock || !selectedVariant}
//                 size="lg"
//                 variant="default"
//                 className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide"
//               >
//                 <ShoppingBag className="w-5 h-5" />
//                 Add to Bag
//               </AddToBagButton>
//             ) : (
//               <Button
//                 disabled={true}
//                 size="lg"
//                 className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
//               >
//                 <ShoppingBag className="w-5 h-5" />
//                 {!selectedSize || !selectedColor
//                   ? "Select Size & Color"
//                   : !isInStock
//                     ? "Out of Stock"
//                     : "Add to Bag"}
//               </Button>
//             )}

//             {/* Stock Status */}
//             {selectedVariant && (
//               <div className="text-sm">
//                 {isInStock ? (
//                   <span className="text-green-600 font-medium">
//                     In Stock ({selectedVariant.stock} available)
//                   </span>
//                 ) : (
//                   <span className="text-red-600 font-medium">Out of Stock</span>
//                 )}
//               </div>
//             )}

//             {/* Delivery Information */}
//             <div className="space-y-3 text-sm text-gray-600">
//               <div className="flex items-start gap-2">
//                 <Truck className="w-4 h-4 mt-0.5 text-gray-900" />
//                 <div>
//                   <p className="font-medium text-gray-900">Estimated delivery</p>
//                   <p>Complimentary Express delivery or Collect in Store</p>
//                   <p className="text-xs mt-1">Wed, Jan 14 - Thu, Jan 15 (Estimated)</p>
//                 </div>
//               </div>

//               {/* Contact Options */}
//               <div className="space-y-2 pt-2">
//                 <a
//                   href="tel:+1234567890"
//                   className="flex items-center gap-2 text-sm underline hover:text-gray-900 transition-colors"
//                 >
//                   <Phone className="w-4 h-4" />
//                   Order by Phone
//                 </a>
//                 <a
//                   href="/store-locator"
//                   className="flex items-center gap-2 text-sm underline hover:text-gray-900 transition-colors"
//                 >
//                   <MapPin className="w-4 h-4" />
//                   Find in store and book an appointment
//                 </a>
//               </div>
//             </div>

//             {/* Gucci Services Section */}
//             <Accordion type="single" collapsible className="w-full">
//               <AccordionItem value="services" className="border-0">
//                 <AccordionTrigger className="text-sm font-medium text-gray-900 py-2 hover:no-underline">
//                   <div className="flex items-center gap-2">
//                     <Plus className="w-4 h-4" />
//                     Services
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="text-xs text-gray-600 space-y-1 pt-2">
//                   <p>• Complimentary Shipping</p>
//                   <p>• Complimentary Exchanges & Returns</p>
//                   <p>• Secure Payments</p>
//                   <p>• Signature Packaging</p>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>

//             {/* Rating Display */}
//             {product.ratingsAverage !== undefined && (
//               <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => {
//                     const rating = product.ratingsAverage || 0;
//                     const isFilled = i < Math.floor(rating);
//                     const isPartial = !isFilled && i < Math.ceil(rating) && rating % 1 !== 0;
//                     return (
//                       <Star
//                         key={i}
//                         className={cn(
//                           "w-4 h-4",
//                           isFilled
//                             ? "fill-yellow-500 text-yellow-500"
//                             : isPartial
//                               ? "fill-none text-yellow-500 stroke-yellow-500 stroke-1"
//                               : "fill-none text-gray-300 stroke-gray-300 stroke-1",
//                         )}
//                       />
//                     );
//                   })}
//                 </div>
//                 <span className="text-xs text-gray-600">({product.reviewCount || 0} reviews)</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, ShoppingBag, Truck, Phone, MapPin, Plus } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import AddToBagButton from "../bag/add-to-bag-button";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  // Get unique sizes and colors from variants
  const availableSizes = Array.from(
    new Set(product.variants?.map((v) => v.size).filter(Boolean) || []),
  );
  const availableColors = Array.from(
    new Set(
      product.variants?.map((v) => v.color?.toLowerCase()).filter((c): c is string => !!c) || [],
    ),
  );

  // State for selected variants
  const [selectedSize, setSelectedSize] = useState<string | null>(availableSizes[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(availableColors[0] || null);

  // Handler for color change that updates size if needed
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor);

    // Get available sizes for the new color
    const sizesForNewColor = Array.from(
      new Set(
        product.variants
          ?.filter((v) => v.color?.toLowerCase() === newColor.toLowerCase())
          .map((v) => v.size)
          .filter(Boolean) || [],
      ),
    );

    // If current size doesn't exist for new color, select first available size
    if (selectedSize && !sizesForNewColor.includes(selectedSize)) {
      setSelectedSize(sizesForNewColor[0] || null);
    }
  };

  // Find the selected variant based on size and color
  const selectedVariant = useMemo(() => {
    return product.variants?.find(
      (v) => v.size === selectedSize && v.color?.toLowerCase() === selectedColor?.toLowerCase(),
    );
  }, [product.variants, selectedSize, selectedColor]);

  // Get available sizes for selected color
  const availableSizesForColor = useMemo(() => {
    if (!selectedColor) return availableSizes;
    return Array.from(
      new Set(
        product.variants
          ?.filter((v) => v.color?.toLowerCase() === selectedColor.toLowerCase())
          .map((v) => v.size)
          .filter(Boolean) || [],
      ),
    );
  }, [selectedColor, product.variants, availableSizes]);

  // Display price from selected variant or fallback to first variant
  const displayPrice = selectedVariant
    ? selectedVariant.priceDiscount || selectedVariant.price
    : product.variants?.[0]?.priceDiscount || product.variants?.[0]?.price || 0;

  const originalPrice = selectedVariant?.priceDiscount ? selectedVariant.price : null;

  // Get all unique color variants with their first image for thumbnails
  const colorVariants = useMemo(() => {
    const variantsByColor = new Map<string, ProductVariant>();
    product.variants?.forEach((v) => {
      if (v.color) {
        const colorKey = v.color.toLowerCase();
        if (!variantsByColor.has(colorKey)) {
          variantsByColor.set(colorKey, v);
        }
      }
    });
    return Array.from(variantsByColor.values());
  }, [product.variants]);

  // Check if variant is in stock
  const isInStock = selectedVariant && selectedVariant.stock > 0;

  // Style number/SKU for display
  const styleNumber = selectedVariant?.sku || product.variants?.[0]?.sku || "";

  return (
    <div className="w-full">
      {/* Full-width Product Image at Top */}
      <div className="relative w-full h-[80vh] min-h-[60vh] overflow-hidden">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
        {/* Discount Badge */}
        {originalPrice && selectedVariant?.priceDiscount && (
          <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded">
            -{Math.round(((originalPrice - selectedVariant.priceDiscount) / originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info Section Below Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 lg:gap-16">
          {/* Left Column - Product Information (60-70%) */}
          <div className="space-y-6">
            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                ${displayPrice.toFixed(0)}
              </span>
              {originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${originalPrice.toFixed(0)}
                </span>
              )}
            </div>

            {/* Variation Selector */}
            {colorVariants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-900">Variation</label>
                  {selectedColor && (
                    <span className="text-sm text-gray-600 capitalize">{selectedColor}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorVariants.map((variant, i) => {
                    const colorName = variant.color?.toLowerCase() || "";
                    const isSelected = colorName === selectedColor?.toLowerCase();
                    const variantImage = variant.images[i];

                    return (
                      <button
                        key={variant._id}
                        type="button"
                        onClick={() => handleColorChange(colorName)}
                        className={cn(
                          "relative w-16 h-16 border-2 rounded transition-all overflow-hidden",
                          isSelected
                            ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                            : "border-gray-300 hover:border-gray-600",
                        )}
                        title={variant.color || "Color variation"}
                        aria-label={`Select ${variant.color || "color"} variation`}
                        aria-pressed={isSelected}
                      >
                        {variantImage ? (
                          <Image
                            src={variantImage}
                            alt={variant.color || "Product variant"}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <span
                            style={{ backgroundColor: variant.color }}
                            className="w-24 h-24 rounded-none border-2 transition-all block"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Size</label>
                <div className="flex flex-wrap gap-2">
                  {availableSizesForColor.map((size) => {
                    // Find the specific variant for this size and selected color
                    const sizeVariant = product.variants?.find(
                      (v) =>
                        v.size === size && v.color?.toLowerCase() === selectedColor?.toLowerCase(),
                    );
                    const isAvailable = sizeVariant && sizeVariant.stock > 0;
                    const isSelected = size === selectedSize;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        disabled={!isAvailable}
                        aria-pressed={isSelected}
                        className={cn(
                          "px-4 py-2 text-sm font-medium border-2 rounded transition-all min-w-[60px]",
                          isSelected
                            ? "border-gray-900 bg-gray-900 text-white"
                            : isAvailable
                              ? "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
                              : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed",
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Description Section */}
            <div className="pt-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                PRODUCT DESCRIPTION
              </h2>
              {styleNumber && (
                <p className="text-sm text-gray-600">Style {styleNumber.split("-").join(" ")}</p>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Accordion Sections */}
            <Accordion type="multiple" className="w-full border-t border-gray-200">
              <AccordionItem value="product-details" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pb-4">
                  <div className="space-y-2">
                    {selectedVariant && (
                      <>
                        <p>
                          <span className="font-medium">SKU:</span> {selectedVariant.sku}
                        </p>
                        <p>
                          <span className="font-medium">Stock:</span> {selectedVariant.stock}{" "}
                          available
                        </p>
                        <p>
                          <span className="font-medium">Sold:</span> {selectedVariant.soldCount}{" "}
                          units
                        </p>
                      </>
                    )}
                    {product.ratingsAverage !== undefined && (
                      <p>
                        <span className="font-medium">Rating:</span>{" "}
                        {product.ratingsAverage.toFixed(1)} / 5.0 ({product.reviewCount || 0}{" "}
                        reviews)
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="materials-care" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
                  Materials & Care
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pb-4">
                  <p>
                    Please refer to the product care label for specific care instructions. For best
                    results, follow the recommended care guidelines to maintain the quality and
                    appearance of your item.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="commitment" className="border-b border-gray-200">
                <AccordionTrigger className="text-sm font-medium text-gray-900 py-4">
                  Our Commitment
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pb-4">
                  <p>
                    We are committed to providing high-quality products and exceptional customer
                    service. Your satisfaction is our priority, and we stand behind the quality of
                    every item we offer.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right Column - Purchase Actions (30-40%) */}
          <div className="space-y-6">
            {/* Add to Bag Button */}
            {selectedVariant && isInStock ? (
              <AddToBagButton
                productId={product._id}
                variantSku={selectedVariant.sku}
                disabled={!isInStock || !selectedVariant}
                size="lg"
                variant="default"
                className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag
              </AddToBagButton>
            ) : (
              <Button
                disabled={true}
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-900 rounded-none h-12 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                {!selectedSize || !selectedColor
                  ? "Select Size & Color"
                  : !isInStock
                    ? "Out of Stock"
                    : "Add to Bag"}
              </Button>
            )}

            {/* Stock Status */}
            {selectedVariant && (
              <div className="text-sm">
                {isInStock ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({selectedVariant.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            )}

            {/* Delivery Information */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 mt-0.5 text-gray-900" aria-hidden="true" />
                <div>
                  <p className="font-medium text-gray-900">Estimated delivery</p>
                  <p>Complimentary Express delivery or Collect in Store</p>
                  <p className="text-xs mt-1">Wed, Jan 14 - Thu, Jan 15 (Estimated)</p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-2 pt-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-sm underline hover:text-gray-900 transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Order by Phone
                </a>
                <a
                  href="/store-locator"
                  className="flex items-center gap-2 text-sm underline hover:text-gray-900 transition-colors"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Find in store and book an appointment
                </a>
              </div>
            </div>

            {/* Gucci Services Section */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="services" className="border-0">
                <AccordionTrigger className="text-sm font-medium text-gray-900 py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Services
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-gray-600 space-y-1 pt-2">
                  <p>• Complimentary Shipping</p>
                  <p>• Complimentary Exchanges & Returns</p>
                  <p>• Secure Payments</p>
                  <p>• Signature Packaging</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Rating Display */}
            {product.ratingsAverage !== undefined && (
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const rating = product.ratingsAverage || 0;
                    const isFilled = i < Math.floor(rating);
                    const isPartial = !isFilled && i < Math.ceil(rating) && rating % 1 !== 0;
                    return (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={cn(
                          "w-4 h-4",
                          isFilled
                            ? "fill-yellow-500 text-yellow-500"
                            : isPartial
                              ? "fill-none text-yellow-500 stroke-yellow-500 stroke-1"
                              : "fill-none text-gray-300 stroke-gray-300 stroke-1",
                        )}
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-gray-600">({product.reviewCount || 0} reviews)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
