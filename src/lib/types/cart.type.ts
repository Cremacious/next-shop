export type CartType = {
  id: string;
  userId: string;
  items: CartItemType[];
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: Date;
  color?: string;
  size?: string;
  quantity?: number;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image?: string;
};

export type CheckoutCartType = {
  id: string;
  userId: string;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: Date;
};
