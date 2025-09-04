export type shippingAddressType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type userType = {
  id: string;
  name: string;
  email: string;
  shippingAddress?: shippingAddressType;
};
