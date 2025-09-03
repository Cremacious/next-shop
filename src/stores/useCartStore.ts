import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItemType } from '@/lib/types/cart.type';
import {
  addItemToCartServer,
  removeItemFromCartServer,
  updateItemQuantityServer,
} from '@/lib/actions/cart.actions';

interface CartState {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateItemQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: async (item) => {
        const exists = get().cart.find(
          (i) =>
            i.id === item.id && i.color === item.color && i.size === item.size
        );
        if (exists) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id && i.color === item.color && i.size === item.size
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: item.quantity || 1 }],
          });
        }
        await addItemToCartServer(get().cart);
      },
      updateItemQuantity: async (id, color, size, quantity) => {
        set({
          cart: get().cart.map((i) =>
            i.id === id && i.color === color && i.size === size
              ? { ...i, quantity }
              : i
          ),
        });
        await updateItemQuantityServer(get().cart);
      },
      removeFromCart: async (id, color, size) => {
        set({
          cart: get().cart.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
          ),
        });
        await removeItemFromCartServer(get().cart);
      },
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
);
