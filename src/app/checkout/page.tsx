import { getUserCart } from '@/lib/actions/cart.actions';
import CheckoutItems from './checkout-items';

export default async function CheckoutPage() {
  const cart = await getUserCart();

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-gray-50 p-6">
        <div className="border-b border-gray-300 pb-4 mb-12">
          <h1 className="text-2xl text-slate-900 font-semibold">Checkout</h1>
        </div>
        <div className="space-y-12 ">
          <div className="relative">
            <div className="md:overflow-auto">
              <CheckoutItems />
              <hr className="border-gray-300 my-6" />
              <div className="bg-gray-100 p-6 rounded-md">
                <ul className="text-slate-500 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal
                    <span className="ml-auto font-semibold text-slate-900">
                      $102.00
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping
                    <span className="ml-auto font-semibold text-slate-900">
                      $6.00
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Discount
                    <span className="ml-auto font-semibold text-slate-900">
                      $0.00
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax
                    <span className="ml-auto font-semibold text-slate-900">
                      $5.00
                    </span>
                  </li>
                  <hr className="border-slate-300" />
                  <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                    Total <span className="ml-auto">$113.00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full h-max rounded-md">
            <form>
              <div>
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Delivery Details
                </h2>
                <div className="grid md:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Phone No."
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Address Line
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Address Line"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter City"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter State"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Zip Code"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                </div>
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
