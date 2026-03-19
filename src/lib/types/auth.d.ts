export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  bag: {
    items: unknown[];
  };
  wishlist: unknown[];
  addresses: unknown[];
  createdAt: string;
  __v: number;
};

export type LoginResponse = {
  status: number;
  token: string;
  data: {
    user: AuthUser;
  };
};

export type RegisterResponse = {
  status: number;
  token: string;
  data: {
    user: AuthUser;
  };
};
