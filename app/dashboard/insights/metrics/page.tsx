"use client";

import { useEffect, useState } from "react";
import * as echarts from "echarts";

export default function InsightsPage() {
  const [workspaceId, setWorkspaceId] = useState<string>("");
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const ws = localStorage.getItem("currentWorkspace");
    if (!ws) return;

    setWorkspaceId(ws);
    loadMetrics(ws);
  }, []);

  async function loadMetrics(ws: string) {
    const res = await fetch(`/api/insights/metrics?workspaceId=${ws}`);
    const json = await res.json();
    setMetrics(json);

    setTimeout(() => {
      renderCharts(json);
    }, 200);
  }

  function renderCharts(data: any) {
    // ⭐ Chart 1 — Actividad por día
    const chart1 = echarts.init(document.getElementById("chart1")!);
    chart1.setOption({
      title: { text: "Actividad por día", textStyle: { color: "#fff" } },
      xAxis: { type: "category", data: Object.keys(data.byDay), axisLabel: { color: "#ccc" } },
      yAxis: { type: "value", axisLabel: { color: "#ccc" } },
      series: [{ data: Object.values(data.byDay), type: "line", smooth: true }],
    });

    // ⭐ Chart 2 — Acciones
    const chart2 = echarts.init(document.getElementById("chart2")!);
    chart2.setOption({
      title: { text: "Acciones del workspace", textStyle: { color: "#fff" } },
      tooltip: {},
      series: [
        {
          type: "pie",
          radius: "60%",
          data: Object.entries(data.byAction).map(([name, value]) => ({
            name,
            value,
          })),
        },
      ],
    });

    // ⭐ Chart 3 — Reacciones
    const chart3 = echarts.init(document.getElementById("chart3")!);
    chart3.setOption({
      title: { text: "Reacciones", textStyle: { color: "#fff" } },
      xAxis: { type: "category", data: Object.keys(data.reactions), axisLabel: { color: "#ccc" } },
      yAxis: { type: "value", axisLabel: { color: "#ccc" } },
      series: [{ data: Object.values(data.reactions), type: "bar" }],
    });

    // ⭐ Chart 4 — Tags más usados
    const chart4 = echarts.init(document.getElementById("chart4")!);
    chart4.setOption({
      title: { text: "Tags más usados", textStyle: { color: "#fff" } },
      xAxis: { type: "category", data: Object.keys(data.tags), axisLabel: { color: "#ccc" } },
      yAxis: { type: "value", axisLabel: { color: "#ccc" } },
      series: [{ data: Object.values(data.tags), type: "bar" }],
    });
  }

  if (!metrics) {
    return <div className="text-slate-400 p-6">Cargando gráficos...</div>;
  }

  return (
    <div className="flex flex-col gap-10 p-6">
      <h1 className="text-3xl font-bold text-white">Workspace Insights Visuals</h1>

      <div id="chart1" className="w-full h-80 bg-slate-900 rounded-xl"></div>
      <div id="chart2" className="w-full h-80 bg-slate-900 rounded-xl"></div>
      <div id="chart3" className="w-full h-80 bg-slate-900 rounded-xl"></div>
      <div id="chart4" className="w-full h-80 bg-slate-900 rounded-xl"></div>
    </div>
  );
}
