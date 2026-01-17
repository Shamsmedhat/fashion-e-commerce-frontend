declare type BagItem = {
  _id: string;
  productId: string;
  variantSku: string;
  productName: string;
  priceAtPurchase: number;
  quantity: number;
  addedAt: string;
  product?: Product | null;
  variant?: ProductVariant | null;
  isAvailable?: boolean;
  hasPriceChanged?: boolean;
  currentPrice?: number;
  error?: string;
};

declare type Bag = DatabaseProperies & {
  userId: string;
  items: BagItem[];
  updatedAt: string;
};

declare type BagItemsResponse = {
  status: string;
  data: {
    items: BagItem[];
    totalItems: number;
    totalAmount: string;
    bagId: string;
    updatedAt: string;
  };
};

declare type BagResponse = {
  status: string;
  data: {
    bag: Bag;
  };
};

declare type AddToBagRequest = {
  productId: string;
  variantSku: string;
  quantity?: number;
};

declare type UpdateBagItemRequest = {
  quantity?: number;
  variantSku?: string;
};
