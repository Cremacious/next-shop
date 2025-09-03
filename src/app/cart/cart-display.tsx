'use client';
import { useCartStore } from '@/stores/useCartStore';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CartItemCard from '@/components/cart/cart-item-card';

export default function CartDisplay({}) {
  const cart = useCartStore((state) => state.cart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const router = useRouter();

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="text-blue-600 font-semibold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 divide-y divide-gray-200">
            {cart.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          {/* Cart Summary */}
          <div className="w-full md:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Order Summary
            </h2>
            <ul className="mb-4 divide-y divide-gray-100">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-2 text-gray-700 text-sm"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-2"
            >
              Proceed to Checkout
            </button>
            <Link
              href="/products"
              className="block text-center text-blue-600 hover:underline mt-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
