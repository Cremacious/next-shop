'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './stripe-checkout';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  amount: number;
  customerEmail: string;
};

export default function StripeProvider(props: Props) {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm {...props} />
    </Elements>
  );
}
