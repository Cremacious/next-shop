import { NextRequest, NextResponse } from 'next/server';


// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
  const payment_intent = request.nextUrl.searchParams.get('payment_intent');
  if (!payment_intent) {
    return NextResponse.json(
      { error: 'Missing payment_intent' },
      { status: 400 }
    );
  }
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch payment intent' },
      { status: 500 }
    );
  }
}
