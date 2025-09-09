'use client';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment was processed successfully.</p>
      <p>Payment Intent ID: {paymentIntentId}</p>

      {/* Add more details as needed */}
    </div>
  );
}
