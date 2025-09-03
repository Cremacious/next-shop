'use client';

import CartItemCard from '@/components/cart/cart-item-card';
import { CartItemType } from '@/lib/types/cart.type';
import { useCartStore } from '@/stores/useCartStore';

export default function CheckoutItems() {
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  const handleQuantityChange = async (
    id: string,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      return;
    } else {
      updateItemQuantity(id, color, size, newQuantity);
    }
  };

  const handleRemove = (id: string, color: string, size: string) => {
    removeFromCart(id, color, size);
  };

  return (
    <div className="space-y-4">
      {/* Checkout Item */}
      {cart.map((item: CartItemType) => (
        <CartItemCard
          key={item.id}
          item={item}
          handleQuantityChange={handleQuantityChange}
          handleRemove={handleRemove}
        />
      ))}
      <hr className="border-gray-300" />
    </div>
  );
}
