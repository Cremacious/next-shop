import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

function PayPal() {
  return (
    <div className="mt-8 w-full">
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
      >
        <PayPalButtons
        // createOrder={handleCreatePayPalOrder}
        // onApprove={handleApprovePayPalOrder}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPal;
