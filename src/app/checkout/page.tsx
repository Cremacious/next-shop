import { getCheckoutCart } from '@/lib/actions/cart.actions';
// import CheckoutItems from './checkout-items';
import { getAuthenticatedUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import PriceSummary from './price-summary';
// import AddressForm from './address-form';
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
    <div className="max-w-7xl mx-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-gray-50 p-6">
        <div className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-2xl text-slate-900 font-semibold">
            Checkout
          </h1>
        </div>
        <div className="space-y-12 ">
          {/* <div className="relative">
            <div className="md:overflow-auto">
              <hr className="border-gray-300 my-6" />
              <PriceSummary cart={cart} />
            </div>
          </div> */}
          <div className="w-full h-max rounded-md">
            <CheckoutForm cart={cart} user={checkoutUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
