"use client";

import { useState } from "react";

export default function ExportExcelPage() {
  const [industria, setIndustria] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  async function exportarExcel() {
    const workspace_id = localStorage.getItem("workspace_id");

    const res = await fetch("/api/export/xlsx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workspace_id,
        industria,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "export.xlsx";
    a.click();
  }

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Exportar Excel (.xlsx)</h1>

      <div className="max-w-lg space-y-4">

        <select
          value={industria}
          onChange={(e) => setIndustria(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Todas las industrias</option>
          <option value="rrhh">Recursos Humanos</option>
          <option value="finanzas">Finanzas</option>
          <option value="marketing">Marketing</option>
          <option value="legal">Legal</option>
          <option value="ventas">Ventas</option>
          <option value="operaciones">Operaciones</option>
          <option value="realestate">Real Estate</option>
          <option value="ecommerce">E-commerce</option>
        </select>

        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          onClick={exportarExcel}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover-soft w-full"
        >
          Descargar Excel
        </button>
      </div>
    </div>
  );
}
