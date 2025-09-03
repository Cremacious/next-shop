'use client';
import { useCartStore } from '@/stores/useCartStore';
import Link from 'next/link';
import Image from 'next/image';

import { CartItemType } from '@/lib/types/cart.type';

export default function CartDisplay({
  cartItems,
}: {
  cartItems: CartItemType[];
}) {
  const cart = useCartStore((state) => state.cart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const handleQuantityChange = async (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    updateItemQuantity(id, color, size, quantity);
  };

  // const handleRemove = (id: string | number) => {
  //   setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  // };

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
              <div key={item.id} className="flex items-center py-6 gap-6">
                <Image
                  src={item.image ?? '/placeholder.png'}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover border"
                />
                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <div className="flex flex-row gap-2">
                    <p className="text-gray-500 text-sm">Color: {item.color}</p>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-gray-600 font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            item.color,
                            item.size,
                            Number(e.target.value)
                          )
                        }
                        className="w-12 text-center border rounded"
                      />
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    className="text-red-500 hover:underline text-sm"
                    // onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <span className="text-gray-700 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
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
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition mb-2">
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
