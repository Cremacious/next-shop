import { updateOrderPayment } from '@/lib/actions/order.actions';
import { headers } from 'next/headers';
import { useCartStore } from '@/stores/useCartStore';

interface PaymentSuccessPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const params = await searchParams;
  const paymentIntentId = params.payment_intent;

  const host = (await headers()).get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/payment-intent?payment_intent=${paymentIntentId}`,
    { cache: 'no-store' }
  );
  const paymentIntent = await res.json();
  const orderId = paymentIntent.metadata?.orderId;

  if (orderId) {
    const response = await updateOrderPayment(orderId, paymentIntent.id);
    if (response.status === 'success') {
      useCartStore.getState().clearCart();
    }
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your order has been updated.</p>
      {paymentIntentId}
    </div>
  );
}
