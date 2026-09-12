// app/dashboard/subscription/components/SubscriptionDetails.tsx
"use client";

export function SubscriptionDetails() {
  const features = [
    "Unlimited prompt executions",
    "Priority processing",
    "Advanced analytics",
    "Access to automation workflows",
    "Early access to new features",
  ];

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-3">
        Plan Features
      </h3>

      <ul className="flex flex-col gap-2">
        {features.map((f, index) => (
          <li key={index} className="text-slate-300 text-sm">
            • {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
