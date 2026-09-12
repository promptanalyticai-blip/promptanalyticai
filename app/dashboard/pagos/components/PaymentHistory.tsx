// app/dashboard/pagos/components/PaymentHistory.tsx
"use client";

export function PaymentHistory() {
  const history = [
    {
      id: "TX-001",
      date: "30 Ago 2026",
      amount: "$19.99",
      status: "Completado",
    },
    {
      id: "TX-002",
      date: "30 Jul 2026",
      amount: "$19.99",
      status: "Completado",
    },
    {
      id: "TX-003",
      date: "30 Jun 2026",
      amount: "$19.99",
      status: "Completado",
    },
  ];

  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Historial de Pagos
      </h3>

      <div className="flex flex-col gap-3">
        {history.map((tx) => (
          <div
            key={tx.id}
            className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="text-slate-100 font-medium">{tx.id}</span>
              <span className="text-slate-400 text-sm">{tx.date}</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-slate-100 font-medium">{tx.amount}</span>
              <span className="text-green-400 text-sm">{tx.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
