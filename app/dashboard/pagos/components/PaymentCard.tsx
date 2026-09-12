// app/dashboard/pagos/components/PaymentCard.tsx
"use client";

export function PaymentCard() {
  const plan = "Pro";
  const price = "$19.99 / mes";
  const nextBilling = "30 Sep 2026";

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-xl font-semibold text-slate-100">Estado de Facturación</h3>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-slate-300 text-sm">
          <span className="font-semibold text-slate-100">Plan actual:</span> {plan}
        </p>

        <p className="text-slate-300 text-sm">
          <span className="font-semibold text-slate-100">Precio:</span> {price}
        </p>

        <p className="text-slate-300 text-sm">
          <span className="font-semibold text-slate-100">Próxima facturación:</span> {nextBilling}
        </p>
      </div>

      <button className="mt-5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium">
        Actualizar plan
      </button>
    </div>
  );
}
