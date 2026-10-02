declare type CreateCardCheckoutSessionRequest = {
  successUrl: string;
  cancelUrl: string;
};

declare type CreateCardCheckoutSessionData = {
  checkoutUrl: string;
  sessionId: string;
  orderId: string;
};

declare type CreateCardCheckoutSessionResponse = {
  status: string;
  data: CreateCardCheckoutSessionData;
};

declare type CashOrder = {
  _id: string;
  userId: string;
  items: Array<{
    productId: string;
    variantSku: string;
    productName: string;
    priceAtPurchase: number;
    quantity: number;
  }>;
  addressSnapshot: {
    label: string;
    city: string;
    street: string;
  };
  totalAmount: number;
  paymentMethod: "cash" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
};

declare type CreateCashOrderResponse = {
  status: string;
  message: string;
  data: {
    order: CashOrder;
  };
};
