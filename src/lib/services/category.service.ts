import { JSON_HEADER } from "../constants/api.constant";
import { APIResponse } from "../types/api";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  parentId?: string | Category;
  createdAt: string;
};

export type CategoriesResponse = {
  total: number;
  results: number;
  data: {
    categories: Category[];
  };
};

export const categoryService = {
  async getAllCategories(): Promise<any> {
    const response = await fetch(
      `${process.env.API_URL || "http://localhost:3000"}/api/v1/categories`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },

  async getMainCategories(): Promise<any> {
    const response = await fetch(
      `${
        process.env.API_URL || "http://localhost:3000"
      }/api/v1/categories/main`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch main categories: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  },

  async getCategory(id: string): Promise<APIResponse<{ category: Category }>> {
    const response = await fetch(
      `${
        process.env.API_URL || "http://localhost:3000"
      }/api/v1/categories/${id}`,
      {
        headers: {
          ...JSON_HEADER,
        },
      }
    );

    const data: APIResponse<{ category: Category }> = await response.json();
    return data;
  },
};
