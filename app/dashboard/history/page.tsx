"use client";

import { Header } from "../components/Header";
import { History } from "../components/History";

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Historial"
        subtitle="Audit log completo del workspace"
      />

      <History />
    </div>
  );
}
