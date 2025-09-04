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
          <h1 className="text-2xl text-slate-900 font-semibold">Checkout</h1>
        </div>
        <div className="space-y-12 ">
          <div className="relative">
            <div className="md:overflow-auto">
              {/* <CheckoutItems /> */}
              <hr className="border-gray-300 my-6" />
              <PriceSummary cart={cart} />
            </div>
          </div>
          <div className="w-full h-max rounded-md">
            <CheckoutForm cart={cart} user={checkoutUser} />
            {/* <AddressForm address={user?.shippingAddress as shippingAddressType ?? { street: '', city: '', state: '', zip: '' }} />
            <form>
              <div className="mt-10">
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Payment
                </h2>
                <div className="flex flex-wrap gap-y-6 gap-x-12 mt-4 mb-8">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="pay"
                      className="w-5 h-5 cursor-pointer"
                      id="card"
                      defaultChecked
                    />
                    <label
                      htmlFor="card"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        className="w-12"
                        alt="card1"
                      />
                      <img
                        src="https://readymadeui.com/images/american-express.webp"
                        className="w-12"
                        alt="card2"
                      />
                      <img
                        src="https://readymadeui.com/images/master.webp"
                        className="w-12"
                        alt="card3"
                      />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="pay"
                      className="w-5 h-5 cursor-pointer"
                      id="paypal"
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/paypal.webp"
                        className="w-20"
                        alt="paypalCard"
                      />
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Cardholder&apos;s Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Cardholder's Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="Enter EXP."
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="Enter CVV"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-200 hover:bg-gray-300 border border-gray-300 text-slate-900 max-lg:order-1 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
