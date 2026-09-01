"use client";

import ReactECharts from "echarts-for-react";

export default function LineChart({ analyticsByDay, usersByDay }) {
  const days = analyticsByDay.map((d) => d.day);

  const analysisCounts = analyticsByDay.map((d) => d.count);
  const userCounts = usersByDay.map((d) => d.count);

  const option = {
    xAxis: {
      type: "category",
      data: days,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Análisis por día",
        type: "line",
        data: analysisCounts,
      },
      {
        name: "Usuarios por día",
        type: "line",
        data: userCounts,
      },
    ],
  };

  return <ReactECharts option={option} />;
}
<ClientWrapper>
  <LineChart analyticsByDay={analyticsByDay} usersByDay={usersByDay} />
</ClientWrapper>
