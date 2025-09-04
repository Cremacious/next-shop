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

export type UserType = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image: string | null;
  shippingAddress: shippingAddressType | null; // or JsonValue if you want to be more flexible
  createdAt: Date;
  updatedAt: Date;
};
