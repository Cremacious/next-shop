import { updateOrderPayment } from '@/lib/actions/order.actions';
import { headers } from 'next/headers';

interface PaymentSuccessPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const paymentIntentId = searchParams.payment_intent;

  // Get the host from headers
  const host = (await headers()).get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Use absolute URL for fetch
  const res = await fetch(
    `${baseUrl}/api/payment-intent?payment_intent=${paymentIntentId}`,
    { cache: 'no-store' }
  );
  const paymentIntent = await res.json();
  const orderId = paymentIntent.metadata?.orderId;

  if (orderId) {
    await updateOrderPayment(orderId, paymentIntent.id);
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order has been updated.</p>
      {paymentIntentId}
    </div>
  );
}
