'use client';
import { useCartStore } from '@/stores/useCartStore';
import { ShoppingCartIcon } from 'lucide-react';

export default function CartIcon() {
  const cartQuantity = useCartStore((state) => state.cartQuantity);

  return (
    <div className="relative">
      <ShoppingCartIcon className="h-6 w-6" />
      {cartQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
          {cartQuantity}
        </span>
      )}
    </div>
  );
}
