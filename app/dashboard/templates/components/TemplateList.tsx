// app/dashboard/templates/components/TemplateList.tsx
"use client";

import { useState } from "react";
import { TemplateItem } from "./TemplateItem";

export function TemplateList() {
  const [templates, setTemplates] = useState([
    {
      name: "Resumen Ejecutivo",
      description: "Plantilla para generar resúmenes profesionales.",
    },
    {
      name: "Análisis Comparativo",
      description: "Comparación entre documentos o métricas.",
    },
    {
      name: "Reporte Mensual",
      description: "Estructura para informes periódicos.",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  function createTemplate() {
    if (!newName.trim() || !newDesc.trim()) return;

    setTemplates([{ name: newName, description: newDesc }, ...templates]);
    setNewName("");
    setNewDesc("");
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Crear plantilla */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Crear nueva plantilla
        </h3>

        <div className="flex flex-col gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de la plantilla"
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Descripción"
            className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-2"
          />

          <button
            onClick={createTemplate}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Crear plantilla
          </button>
        </div>
      </div>

      {/* Lista de plantillas */}
      <div className="flex flex-col gap-4">
        {templates.map((t, index) => (
          <TemplateItem key={index} name={t.name} description={t.description} />
        ))}
      </div>
    </div>
  );
}
