import { JSON_HEADER } from "../constants/api.constant";

export type ProductVariant = {
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

export type Product = {
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

export type ProductsResponse = {
  total: number;
  results: number;
  data: {
    products: Product[];
  };
};

export async function getProductService() {
  const response = await fetch(`${process.env.API_URL}/products`, {
    headers: {
      ...JSON_HEADER,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
