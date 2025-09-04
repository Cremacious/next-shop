'use client';
import { useState } from 'react';
import { saveShippingAddress } from '@/lib/actions/user.actions';
import { shippingAddressType } from '@/lib/types/user.type';
// import { CheckoutCartType } from '@/lib/types/cart.type';
// import { userType } from '@/lib/types/user.type';

export default function CheckoutForm({
  shippingAddress,
}: {
  shippingAddress: shippingAddressType | undefined;
}) {
  const [address, setAddress] = useState<shippingAddressType>(
    shippingAddress ?? {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    }
  );
  const [payment, setPayment] = useState({
    method: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [savingAddress, setSavingAddress] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Save address to user profile (optional)
  async function handleSaveAddress() {
    setSavingAddress(true);
    await saveShippingAddress({ address });
    setSavingAddress(false);
  }

  // Create order using current form values
  async function handleCompletePurchase() {
    setSubmitting(true);
    // await createOrder({
    //   userId: user.id,
    //   cart,
    //   address,
    //   paymentMethod: payment.method,
    //   itemsPrice: cart.itemsPrice,
    //   // ...other fields
    // });
    setSubmitting(false);
    // Optionally redirect or show confirmation
  }

  return (
    <form className="space-y-8">
      {/* Address fields */}
      <div>
        <input
          value={address.firstName}
          onChange={(e) =>
            setAddress((a) => ({ ...a, firstName: e.target.value }))
          }
          placeholder="First Name"
        />
        {/* ...other address fields... */}
      </div>
      <button
        type="button"
        onClick={handleSaveAddress}
        disabled={savingAddress}
      >
        {savingAddress ? 'Saving...' : 'Save Address'}
      </button>

      {/* Payment fields */}
      <div>
        <input
          value={payment.cardName}
          onChange={(e) =>
            setPayment((p) => ({ ...p, cardName: e.target.value }))
          }
          placeholder="Cardholder's Name"
        />
        {/* ...other payment fields... */}
      </div>

      {/* Order summary */}
      <div>
        {/* <span>Subtotal: ${cart.itemsPrice}</span> */}
        {/* ...tax, total, etc... */}
      </div>

      <button
        type="button"
        onClick={handleCompletePurchase}
        disabled={submitting}
      >
        {submitting ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  );
}
