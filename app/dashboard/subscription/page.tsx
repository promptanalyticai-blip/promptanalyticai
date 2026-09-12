// app/dashboard/subscription/page.tsx
"use client";

import { Header } from "../components/Header";
import { SubscriptionCard } from "./components/SubscriptionCard";
import { SubscriptionDetails } from "./components/SubscriptionDetails";

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Subscription"
        subtitle="Manage your plan, usage limits and billing"
      />

      <SubscriptionCard />

      <SubscriptionDetails />
    </div>
  );
}
