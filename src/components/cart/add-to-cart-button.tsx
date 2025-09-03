'use client';
import { Button } from '../ui/button';
import { ProductType } from '@/lib/types/product.type';
import { useState } from 'react';
import { CartType } from '@/lib/types/cart.type';
import { useCartStore } from '@/stores/useCartStore';

export default function AddToCartButton({
  product,
  size,
  color,
  cartItems,
}: {
  product: ProductType;
  size: string;
  color: string;
  cartItems: CartType[];
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const cart = useCartStore((state) => state.cart);

  const [isAdding, setIsAdding] = useState(false);

  const isInCart = cartItems.some(
    (item) =>
      item.id === product.id && item.color === color && item.size === size
  );

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: color,
        size: size,
        quantity: 1,
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleQuantityChange = async (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    updateItemQuantity(id, color, size, quantity);
  };

  if (!isInCart) {
    return (
      <Button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </Button>
    );
  }

  return (
    <>
      {(() => {
        const cartItem = cart.find(
          (item) =>
            item.id === product.id && item.color === color && item.size === size
        );
        return (
          <>
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() =>
                cartItem &&
                handleQuantityChange(
                  cartItem.id,
                  cartItem.color!,
                  cartItem.size!,
                  (cartItem.quantity ?? 1) - 1
                )
              }
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={cartItem?.quantity ?? 1}
              onChange={(e) => {
                if (cartItem) {
                  handleQuantityChange(
                    cartItem.id,
                    cartItem.color!,
                    cartItem.size!,
                    Number(e.target.value)
                  );
                }
              }}
              className="w-12 text-center border rounded"
            />
            <button
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() =>
                cartItem &&
                handleQuantityChange(
                  cartItem.id,
                  cartItem.color!,
                  cartItem.size!,
                  (cartItem.quantity ?? 1) + 1
                )
              }
              aria-label="Increase quantity"
            >
              +
            </button>
          </>
        );
      })()}
    </>
  );
}
