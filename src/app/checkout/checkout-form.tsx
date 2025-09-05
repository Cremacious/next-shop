'use client';

import { UserType } from '@/lib/types/user.type';
import { CartType } from '@/lib/types/cart.type';
import { useState } from 'react';
import AddressForm from './address-form';
import PayPal from './paypal';
import PriceSummary from './price-summary';

export default function CheckoutForm({
  user,
  cart,
}: {
  user: UserType;
  cart: CartType;
}) {
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  // const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* steps */}
      <div>
        <h2 className="sr-only">Steps</h2>

        <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
          <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
            {showAddressForm ? (
              <li className="flex items-center gap-2  p-2">
                <span className="size-6 rounded-full bg-blue-600 text-center text-[10px]/6 font-bold text-white">
                  {' '}
                  1{' '}
                </span>
                <span className="hidden sm:block"> Address </span>
              </li>
            ) : (
              <li className="flex items-center gap-2 p-2">
                <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
                  {' '}
                  1{' '}
                </span>
                <span className="hidden sm:block"> Address </span>
              </li>
            )}
            {showPaymentForm ? (
              <li className="flex items-center gap-2 p-2">
                <span className="bg-blue-600 text-white size-6 rounded-full text-center text-[10px]/6 font-bold ">
                  2
                </span>

                <span className="hidden sm:block"> Payment </span>
              </li>
            ) : (
              <li className="flex items-center gap-2 p-2">
                <span className="size-6 rounded-full text-center text-[10px]/6 font-bold ">
                  2
                </span>

                <span className="hidden sm:block"> Payment </span>
              </li>
            )}

            <li className="flex items-center gap-2  p-2">
              <span className="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
                {' '}
                3{' '}
              </span>

              <span className="hidden sm:block"> Order Confirmation </span>
            </li>
          </ol>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-lg font-bold mt-4 mb-8">Checkout</div>
        {showAddressForm && (
          <AddressForm
            setShowPaymentForm={setShowPaymentForm}
            setShowAddressForm={setShowAddressForm}
            user={user}
          />
        )}
        {showPaymentForm && (
          <div className="w-full mx-auto max-w-3xl">
            <PriceSummary cart={cart} />
            <PayPal />
          </div>
        )}
      </div>
    </div>
  );
}
