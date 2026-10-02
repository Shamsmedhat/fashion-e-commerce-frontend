declare type Address = {
  _id: string;
  label: string;
  city: string;
  street: string;
  isDefault: boolean;
};

declare type MeResponse = {
  status: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      addresses: Address[];
    };
  };
};

declare type AddAddressRequest = {
  label?: string;
  city: string;
  street: string;
};
