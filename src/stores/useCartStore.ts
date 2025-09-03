import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  cartQuantity: number;
  setCartQuantity: (quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartQuantity: 0,
      setCartQuantity: (quantity) => set({ cartQuantity: quantity }),
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
