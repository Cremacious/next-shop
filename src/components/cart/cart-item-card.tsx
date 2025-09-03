'use client';
import { CartItemType } from '@/lib/types/cart.type';
import Image from 'next/image';

export default function CartItemCard({ item, handleQuantityChange, handleRemove }: { item: CartItemType, handleQuantityChange: (id: string, color: string, size: string, quantity: number) => void, handleRemove: (id: string, color: string, size: string) => void }) {
    return (  <div key={item.id} className="flex items-center py-6 gap-6">
    <Image
      src={item.image ?? '/placeholder.png'}
      alt={item.name}
      width={100}
      height={100}
      className="rounded-md object-cover border"
    />
    <div className="flex-1 w-full">
      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
      <div className="flex flex-row gap-2">
        <p className="text-gray-500 text-sm">Color: {item.color}</p>
        <p className="text-gray-500 text-sm">Size: {item.size}</p>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-gray-600 font-medium">
          ${item.price.toFixed(2)}
        </span>
        {/* <div className="flex items-center gap-2">
          {item.quantity > 1 && (
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
          )}
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
        </div> */}
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button
        className="text-red-500 hover:underline text-sm"
        onClick={() => handleRemove(item.id, item.color, item.size)}
      >
        Remove
      </button>
      <span className="text-gray-700 font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  </div>
  );
}
