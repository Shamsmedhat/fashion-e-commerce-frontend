declare type Category = {
  _id: string;
  name: string;
  slug: string;
  path: string;
  parentId?: string | Category;
  createdAt: string;
};

declare type CategoriesResponse = {
  total: number;
  results: number;
  data: {
    categories: Category[];
  };
};
