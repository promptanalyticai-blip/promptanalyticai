import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { user_id } = await req.json();

  const { data: user } = await supabase.auth.admin.getUserById(user_id);

  const customer = await stripe.customers.create({
    email: user.user.email,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/subscription?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/subscription?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
