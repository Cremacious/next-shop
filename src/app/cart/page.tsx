import { getUserCart } from '@/lib/actions/cart.actions';
import CartDisplay from './cart-display';

export default async function CartPage() {
  const cartItems = await getUserCart();
  return <CartDisplay cartItems={cartItems} />;
}
