"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

export default function DashboardPage() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);

  const [metrics, setMetrics] = useState({
    analisis: 12,
    pdfs: 5,
    json: 7,
    automations: 9
  });

  const [logs, setLogs] = useState([
    "Se analizó un texto.",
    "Se analizó un PDF.",
    "Se generó JSON estructurado.",
    "Se exportó un PDF.",
    "Se ejecutó una automation."
  ]);

  // ---------------------------
  // GRÁFICO DEL DASHBOARD
  // ---------------------------
  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: { text: "Actividad reciente" },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["Análisis", "PDFs", "JSON", "Automations"]
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [
            metrics.analisis,
            metrics.pdfs,
            metrics.json,
            metrics.automations
          ],
          type: "bar",
          color: "#10B981"
        }
      ]
    };

    chartInstance.current.setOption(option);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  // ---------------------------
  // UI COMPLETA DEL DASHBOARD
  // ---------------------------
  return (
    <div className="fade-in p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Análisis realizados</h3>
          <p className="text-3xl font-bold mt-2">{metrics.analisis}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">PDFs procesados</h3>
          <p className="text-3xl font-bold mt-2">{metrics.pdfs}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">JSON generados</h3>
          <p className="text-3xl font-bold mt-2">{metrics.json}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Automations ejecutadas</h3>
          <p className="text-3xl font-bold mt-2">{metrics.automations}</p>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Actividad reciente</h2>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "400px" }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow"
        />
      </div>

      {/* LOGS */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Historial de acciones</h2>

        {logs.map((log, i) => (
          <div key={i} className="text-gray-700 dark:text-gray-300 mb-2">
            • {log}
          </div>
        ))}
      </div>
    </div>
  );
}
