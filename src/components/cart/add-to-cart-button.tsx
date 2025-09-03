'use client';
import { Button } from '../ui/button';
import { ProductType } from '@/lib/types/product.type';
import { useState } from 'react';
import { Input } from '../ui/input';
import { useCartStore } from '@/stores/useCartStore';

export default function AddToCartButton({
  product,
  size,
  color,
}: {
  product: ProductType;
  size: string;
  color: string;
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cart.find(
    (item) =>
      item.id === product.id && item.color === color && item.size === size
  );
  const quantity = cartItem?.quantity ?? 0;

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
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      removeFromCart(id, color, size);
    } else {
      updateItemQuantity(id, color, size, newQuantity);
    }
  };

  if (!cartItem) {
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
    <div className="flex items-center gap-2">
      <Button
        className=""
        onClick={() =>
          handleQuantityChange(
            cartItem.id,
            cartItem.color!,
            cartItem.size!,
            quantity - 1
          )
        }
      >
        -
      </Button>
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => {
          const val = Math.max(1, Number(e.target.value));
          handleQuantityChange(
            cartItem.id,
            cartItem.color!,
            cartItem.size!,
            val
          );
        }}
        className="text-center"
      />
      <Button
        className=""
        onClick={() =>
          handleQuantityChange(
            cartItem.id,
            cartItem.color!,
            cartItem.size!,
            quantity + 1
          )
        }
      >
        +
      </Button>
    </div>
  );
}
