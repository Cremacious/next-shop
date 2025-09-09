// Example: src/app/checkout/StripeCheckoutForm.tsx
'use client';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';


type Props = {
  amount: number;
  customerEmail: string;
};

export default function StripeCheckoutForm({ amount, customerEmail }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, customerEmail }),
      headers: { 'Content-Type': 'application/json' },
    });
    const { clientSecret } = await res.json();

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: { email: customerEmail },
      },
    });

    if (result.error) {
    } else if (result.paymentIntent.status === 'succeeded') {
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}
