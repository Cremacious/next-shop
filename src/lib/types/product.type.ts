export type ProductType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  brand: string;
  description: string;
  stock: number;
  colors: string[];
  color?: string;
  sizes: string[];
  size?: string;
  price: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  createdAt: Date;
};
