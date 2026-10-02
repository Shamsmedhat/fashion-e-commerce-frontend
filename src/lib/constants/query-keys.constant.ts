export const QUERY_KEYS = {
  products: {
    all: ["products"],
    newArrivals: ["products", "new-arrivals"],
    bestSelling: ["products", "best-selling"],
    byId: (id: string) => ["products", id],
  },
  categories: {
    all: ["categories"],
    home: ["categories", "home"],
    main: ["categories", "main"],
  },
  bag: ["bag"],
} as const;
