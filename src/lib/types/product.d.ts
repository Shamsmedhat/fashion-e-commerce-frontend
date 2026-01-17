declare type ProductVariant = {
  _id: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  priceDiscount?: number;
  soldCount: number;
  stock: number;
  images: string[];
};

declare type Product = {
  _id: string;
  name: string;
  description: string;
  categoryId: string;
  coverImage: string;
  images: string[];
  variants: ProductVariant[];
  ratingsAverage?: number;
  reviewCount: number;
  createdAt: string;
};

declare type ProductsResponse = {
  total: number;
  results: number;
  data: {
    products: Product[];
  };
};
