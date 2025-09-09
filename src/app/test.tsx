'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '@/app/checkout/[orderId]/stripe-checkout';
import { convertToSubcurrency } from '@/lib/utils';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function Test() {
  const amount = 49.99;
  return (
    <div>
      {' '}
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'usd',
        }}
      >
        <StripeCheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
