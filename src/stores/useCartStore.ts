import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find((i) => i.id === item.id);
          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }
          console.log(get().cart);
          return {
            cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getTotal: () =>
        get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    { name: 'cart-storage' }
  )
);
// const myCart = useCartStore((state) => state.cart);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);
//   const updateQuantity = useCartStore((state) => state.updateQuantity);
//   const getTotal = useCartStore((state) => state.getTotal);
  
  
  
//          <div>
//               {myCart.map((item) => (
//                 <div key={item.id}>
//                   <span>{item.name}</span>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min={1}
//                     onChange={(e) =>
//                       updateQuantity(item.id, Number(e.target.value))
//                     }
//                   />
//                   <button onClick={() => removeFromCart(item.id)}>
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <div>Total: ${getTotal().toFixed(2)}</div>
//             </div>
            