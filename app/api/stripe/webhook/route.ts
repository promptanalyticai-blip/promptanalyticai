import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated") {

    const sub = event.data.object as any;

    await supabase.from("subscriptions").upsert({
      stripe_customer_id: sub.customer,
      stripe_subscription_id: sub.id,
      status: sub.status,
      plan_id: sub.items.data[0].price.id,
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as any;

    await supabase.from("subscriptions")
      .update({ status: "canceled" })
      .eq("stripe_subscription_id", sub.id);
  }

  return NextResponse.json({ received: true });
}
