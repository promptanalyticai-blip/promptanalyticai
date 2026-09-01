"use client";

import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { cargarHistorialDB } from "@/lib/historialSupabase";

export default function EstadisticasPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await cargarHistorialDB();
      setData(data || []);
    }
    load();
  }, []);

  const porIndustria = data.reduce((acc: any, item: any) => {
    acc[item.industria || "Sin industria"] = (acc[item.industria || "Sin industria"] || 0) + 1;
    return acc;
  }, {});

  const fechas = data.map((i) => new Date(i.fecha).toLocaleDateString());
  const conteoPorDia = fechas.reduce((acc: any, f: string) => {
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Análisis por industria</h2>
          <ReactECharts
            option={{
              tooltip: {},
              xAxis: { type: "category", data: Object.keys(porIndustria) },
              yAxis: { type: "value" },
              series: [{ type: "bar", data: Object.values(porIndustria), itemStyle: { color: "#6366f1" } }],
            }}
          />
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Análisis por día</h2>
          <ReactECharts
            option={{
              tooltip: {},
              xAxis: { type: "category", data: Object.keys(conteoPorDia) },
              yAxis: { type: "value" },
              series: [{ type: "line", data: Object.values(conteoPorDia), itemStyle: { color: "#10b981" } }],
            }}
          />
        </div>
      </div>
    </div>
  );
}
