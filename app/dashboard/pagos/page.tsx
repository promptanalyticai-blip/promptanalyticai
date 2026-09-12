// app/dashboard/pagos/page.tsx
"use client";

import { Header } from "../components/Header";
import { PaymentCard } from "./components/PaymentCard";
import { PaymentHistory } from "./components/PaymentHistory";

export default function PagosPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Pagos"
        subtitle="Gestiona tu facturación, historial y estado de suscripción"
      />

      <PaymentCard />
      <PaymentHistory />
    </div>
  );
}
