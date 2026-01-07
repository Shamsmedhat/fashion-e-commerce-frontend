import { JSON_HEADER } from "../constants/api.constant";
import { APIResponse } from "../types/api";

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

export async function getProductService(): Promise<any> {
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

export const productService = {
  async getAllProducts(params?: {
    limit?: number;
    sort?: string;
    page?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.page) queryParams.append("page", params.page.toString());

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/v1/products${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },

  async getBestSelling(): Promise<any> {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/v1/products/best-selling`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch best selling products: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  },

  async getTopRating(): Promise<any> {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/v1/products/top-rating`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch top rating products: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  },

  async getProduct(id: string): Promise<APIResponse<{ product: Product }>> {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/v1/products/${id}`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    const data: APIResponse<{ product: Product }> = await response.json();
    return data;
  },
};
