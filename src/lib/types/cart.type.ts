export type CartType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  colors: string[];
  sizes: string[];
  price: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
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
