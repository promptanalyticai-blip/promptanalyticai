// app/dashboard/subscription/components/SubscriptionCard.tsx
"use client";

type SubscriptionCardProps = {
  plan?: string;
  price?: string;
  renewal?: string;
};

export function SubscriptionCard({
  plan = "Pro",
  price = "$19.99 / month",
  renewal = "Renews on Sep 30, 2026",
}: SubscriptionCardProps) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-xl font-semibold text-slate-100">Current Plan</h3>

      <p className="text-indigo-400 text-3xl font-bold mt-2">{plan}</p>

      <p className="text-slate-300 text-sm mt-1">{price}</p>

      <p className="text-slate-500 text-xs mt-2">{renewal}</p>

      <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium">
        Upgrade Plan
      </button>
    </div>
  );
}
