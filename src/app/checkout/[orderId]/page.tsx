// import { getCheckoutCart } from '@/lib/actions/cart.actions';
import { getAuthenticatedUser } from '@/lib/server-utils';
import { redirect } from 'next/navigation';
import { UserType } from '@/lib/types/user.type';
import CheckoutForm from './checkout-form';
import { getOrderById } from '@/lib/actions/order.actions';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const existingOrder = await getOrderById(orderId);

  if (!existingOrder) {
    if (typeof window === 'undefined') {
      return redirect(`/cart`);
    }
  }
  const { user } = await getAuthenticatedUser();

  if (!user) {
    if (typeof window === 'undefined') {
      return redirect('/sign-in');
    }
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
    <div className="max-w-7xl mx-auto bg-gray-50 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-gray-50 p-6">
        <div className="space-y-12 ">
          <div className="w-full h-max rounded-md">
            <CheckoutForm orderId={orderId} user={checkoutUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
