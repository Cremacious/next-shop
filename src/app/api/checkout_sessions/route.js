// src/app/api/create-payment-intent/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export async function POST(req) {
  const { amount, customerEmail } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    receipt_email: customerEmail,
    automatic_tax: { enabled: true },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
