import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { customer_id } = await req.json();

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer_id,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/subscription`,
  });

  return NextResponse.json({ url: portal.url });
}
