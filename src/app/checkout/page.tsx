import { getCheckoutCart } from '@/lib/actions/cart.actions';
import { getAuthenticatedUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { UserType } from '@/lib/types/user.type';
import CheckoutForm from './checkout-form';

export default async function CheckoutPage() {
  const cart = await getCheckoutCart();
  const { user } = await getAuthenticatedUser();

  if (!user) {
    if (typeof window === 'undefined') {
      return redirect('/sign-in');
    }
  }

  if (
    cart === null ||
    cart === undefined ||
    !Array.isArray(cart.items) ||
    cart.items.length === 0
  ) {
    if (typeof window === 'undefined') {
      return redirect('/cart');
    }
    return null;
  }

  const shippingAddress =
    typeof user?.shippingAddress === 'string'
      ? JSON.parse(user.shippingAddress)
      : user?.shippingAddress ?? null;

  const checkoutUser: UserType = {
    ...(user as UserType),
    shippingAddress: shippingAddress,
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-50 p-6">
        <div className="space-y-12 ">
          <div className="w-full h-max rounded-md">
            <CheckoutForm cart={cart} user={checkoutUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
