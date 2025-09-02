export type CartType = {
  id: string;
  userId: string;
  items: CartItemType[];
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: Date;
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
